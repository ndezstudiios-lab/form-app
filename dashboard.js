/* ======================================================================= */
/*  CONFIG                                                                 */
/* ======================================================================= */

const SUPABASE_URL = "https://eortegvmjednbahfaflt.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvcnRlZ3ZtamVkbmJhaGZhZmx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkzNDAzMDksImV4cCI6MjEwNDkxNjMwOX0.ANe4IgXkZHtRT-3HQ26tQ6HlPQT2qO6WhCoGJQM-rbA";

const authClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const REFRESH_INTERVAL = 15000;
const NOTIF_ENABLED_KEY = "ndez-notif-enabled";

/* ======================================================================= */
/*  HELPERS                                                                */
/* ======================================================================= */

function esc(s) {
  if (s === undefined || s === null) return "";
  return String(s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

async function getAccessToken() {
  const { data: { session } } = await authClient.auth.getSession();
  return session ? session.access_token : SUPABASE_ANON_KEY;
}

async function api(path, opts) {
  const token = await getAccessToken();
  return fetch(SUPABASE_URL + "/rest/v1" + path, {
    ...(opts || {}),
    headers: {
      "apikey":        SUPABASE_ANON_KEY,
      "Authorization": "Bearer " + token,
      "Content-Type":  "application/json",
      ...(opts && opts.headers ? opts.headers : {}),
    },
  });
}

async function fetchSubmissions() {
  const res = await api("/submissions?select=*&order=created_at.desc");
  if (!res.ok) throw new Error("Fetch failed (" + res.status + ")");
  return res.json();
}

async function updateStatus(id, status) {
  const res = await api("/submissions?id=eq." + encodeURIComponent(id), {
    method: "PATCH",
    headers: { "Prefer": "return=minimal" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Update failed (" + res.status + ")");
}

async function deleteSubmission(id) {
  const res = await api("/submissions?id=eq." + encodeURIComponent(id), { method: "DELETE" });
  if (!res.ok) throw new Error("Delete failed (" + res.status + ")");
}

/* ======================================================================= */
/*  STATE                                                                  */
/* ======================================================================= */

const state = {
  submissions: [],
  loading: true,
  error: null,
  search: "",
  filter: "all",
  selected: null,
  lastSeenIds: new Set(),
  firstLoad: true,
  authenticated: false,
};

/* ======================================================================= */
/*  HEADER                                                                 */
/* ======================================================================= */

const headerRightEl = document.getElementById("headerRight");

function renderHeader() {
  if (!state.authenticated) {
    headerRightEl.innerHTML = '<a class="dash-back" href="index.html">Intake form →</a>';
    return;
  }
  headerRightEl.innerHTML =
    '<span class="dash-live"><span class="live-dot"></span> Live</span>' +
    '<button class="dash-refresh" id="refreshBtn" title="Refresh">' +
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>' +
    '</button>' +
    '<button class="dash-refresh" id="signOutBtn" title="Sign out">' +
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>' +
    '</button>' +
    '<a class="dash-back" href="index.html">Intake form →</a>';

  const rb = document.getElementById("refreshBtn");
  if (rb) rb.addEventListener("click", async () => {
    rb.classList.add("spinning");
    await load();
    setTimeout(() => rb.classList.remove("spinning"), 400);
  });

  const sb = document.getElementById("signOutBtn");
  if (sb) sb.addEventListener("click", signOut);
}

/* ======================================================================= */
/*  RENDER                                                                 */
/* ======================================================================= */

const appEl = document.getElementById("app");

function render() {
  renderHeader();

  if (!state.authenticated) { renderLogin(); return; }

  if (state.loading) {
    appEl.innerHTML = '<div class="dash-shell"><div class="loading-state"><svg class="spin" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg></div></div>';
    return;
  }

  if (state.error) {
    appEl.innerHTML = '<div class="dash-shell"><div class="empty-state"><strong>Couldn\'t load submissions</strong>' + esc(state.error) + '</div></div>';
    return;
  }

  const now = Date.now();
  const dayMs = 86400000;
  const total = state.submissions.length;
  const week = state.submissions.filter((s) => now - new Date(s.created_at).getTime() < 7 * dayMs).length;
  const month = state.submissions.filter((s) => now - new Date(s.created_at).getTime() < 30 * dayMs).length;
  const unread = state.submissions.filter((s) => s.status === "new").length;

  const filtered = state.submissions.filter((s) => {
    if (state.filter !== "all" && s.status !== state.filter) return false;
    if (!state.search) return true;
    const q = state.search.toLowerCase();
    return (
      (s.full_name || "").toLowerCase().includes(q) ||
      (s.business_name || "").toLowerCase().includes(q) ||
      (s.email || "").toLowerCase().includes(q) ||
      (s.services || "").toLowerCase().includes(q) ||
      (s.project_id || "").toLowerCase().includes(q)
    );
  });

  appEl.innerHTML =
    '<div class="dash-shell">' +
      '<div class="stats-grid">' +
        statCard("Total", total) +
        statCard("Unread", unread, unread > 0 ? "accent" : "") +
        statCard("This week", week) +
        statCard("This month", month) +
      '</div>' +
      '<div class="toolbar">' +
        '<div class="search-wrap">' +
          '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>' +
          '<input class="search-input" id="searchInput" placeholder="Search name, business, service…" value="' + esc(state.search) + '" />' +
        '</div>' +
        '<select class="filter-select" id="filterSelect">' +
          ['all','new','read','contacted','quoted','closed'].map((v) =>
            '<option value="' + v + '"' + (state.filter === v ? " selected" : "") + '>' + (v === "all" ? "All statuses" : v.charAt(0).toUpperCase() + v.slice(1)) + '</option>'
          ).join("") +
        '</select>' +
      '</div>' +
      '<div class="subs-list">' +
        (filtered.length === 0
          ? '<div class="empty-state"><strong>' + (state.submissions.length === 0 ? "No submissions yet" : "No matches") + '</strong>' +
            (state.submissions.length === 0 ? 'Submissions from the intake form will show up here.' : 'Try a different search or filter.') + '</div>'
          : filtered.map(renderRow).join("")) +
      '</div>' +
    '</div>' +
    renderPanel();

  bindEvents();
}

function statCard(label, value, cls) {
  return '<div class="stat-card">' +
    '<div class="stat-label">' + label + '</div>' +
    '<div class="stat-value ' + (cls || "") + '">' + value + '</div>' +
  '</div>';
}

function renderRow(s) {
  const initials = (s.full_name || "?")
    .split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const date = new Date(s.created_at);
  const dateStr = formatDate(date);
  const isNew = s.status === "new";
  return '<div class="sub-row' + (isNew ? " is-new" : "") + '" data-id="' + esc(s.id) + '">' +
    '<div class="sub-badge' + (isNew ? " is-new" : "") + '">' + esc(initials) + '</div>' +
    '<div class="sub-main">' +
      '<div class="sub-name">' + esc(s.full_name || "—") + '</div>' +
      '<div class="sub-sub">' + esc(s.business_name || "—") + ' · ' + esc(s.email || "—") + '</div>' +
    '</div>' +
    '<div class="sub-services">' + esc(s.services || "—") + '</div>' +
    '<div class="sub-date">' + esc(dateStr) + '</div>' +
    '<div class="sub-status status-' + esc(s.status) + '">' + esc(s.status) + '</div>' +
    '<div class="sub-caret"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></div>' +
  '</div>';
}

function formatDate(d) {
  const now = new Date();
  const diff = now - d;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return minutes + "m ago";
  if (hours < 24) return hours + "h ago";
  if (days < 7) return days + "d ago";
  return d.toLocaleDateString("en-KE", { day: "numeric", month: "short" });
}

function renderPanel() {
  if (!state.selected) {
    return '<div class="panel-backdrop" id="panelBackdrop"></div><div class="panel" id="panel"></div>';
  }
  const s = state.submissions.find((x) => x.id === state.selected);
  if (!s) {
    return '<div class="panel-backdrop" id="panelBackdrop"></div><div class="panel" id="panel"></div>';
  }
  const briefText = s.brief && s.brief.briefText ? s.brief.briefText : "—";

  return '<div class="panel-backdrop open" id="panelBackdrop"></div>' +
    '<div class="panel open" id="panel">' +
      '<div class="panel-head">' +
        '<h2 class="panel-title">' + esc(s.full_name || "Submission") + '</h2>' +
        '<button class="panel-close" id="panelClose" aria-label="Close">' +
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>' +
        '</button>' +
      '</div>' +
      '<div class="panel-body">' +
        '<pre class="brief-pre">' + esc(briefText) + '</pre>' +
      '</div>' +
      '<div class="panel-actions">' +
        '<select id="statusSelect">' +
          ['new','read','contacted','quoted','closed'].map((v) =>
            '<option value="' + v + '"' + (s.status === v ? " selected" : "") + '>' + v.charAt(0).toUpperCase() + v.slice(1) + '</option>'
          ).join("") +
        '</select>' +
        '<button class="btn btn-danger" id="deleteBtn">Delete</button>' +
      '</div>' +
    '</div>';
}

/* ======================================================================= */
/*  LOGIN                                                                  */
/* ======================================================================= */

function renderLogin() {
  appEl.innerHTML =
    '<div class="dash-shell">' +
      '<div class="login-card">' +
        '<h1>Ndezstudiio Dashboard</h1>' +
        '<p>Sign in to view submissions.</p>' +
        '<form id="loginForm">' +
          '<label for="loginEmail">Email</label>' +
          '<input class="search-input" type="email" id="loginEmail" required autocomplete="username" />' +
          '<label for="loginPassword">Password</label>' +
          '<input class="search-input" type="password" id="loginPassword" required autocomplete="current-password" />' +
          '<button class="btn btn-primary" type="submit" id="loginBtn">Sign in</button>' +
          '<p class="login-error" id="loginError"></p>' +
        '</form>' +
      '</div>' +
    '</div>';

  document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    const btn = document.getElementById("loginBtn");
    const errEl = document.getElementById("loginError");

    btn.disabled = true;
    btn.textContent = "Signing in…";
    errEl.textContent = "";

    const { error } = await authClient.auth.signInWithPassword({ email, password });

    if (error) {
      errEl.textContent = error.message;
      btn.disabled = false;
      btn.textContent = "Sign in";
      return;
    }

    state.authenticated = true;
    state.loading = true;
    state.error = null;
    render();
    await load();
  });
}

async function signOut() {
  await authClient.auth.signOut();
  state.submissions = [];
  state.selected = null;
  state.loading = false;
  state.authenticated = false;
  state.error = null;
  render();
}

/* ======================================================================= */
/*  EVENTS                                                                 */
/* ======================================================================= */

function bindEvents() {
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.search = e.target.value;
      render();
      const next = document.getElementById("searchInput");
      if (next) { next.focus(); next.setSelectionRange(next.value.length, next.value.length); }
    });
  }

  const filterSelect = document.getElementById("filterSelect");
  if (filterSelect) {
    filterSelect.addEventListener("change", (e) => {
      state.filter = e.target.value;
      render();
    });
  }

  appEl.querySelectorAll(".sub-row").forEach((row) => {
    row.addEventListener("click", () => {
      const id = row.dataset.id;
      const sub = state.submissions.find((s) => s.id === id);
      if (sub && sub.status === "new") {
        updateStatus(id, "read").catch(() => {});
        sub.status = "read";
      }
      state.selected = id;
      render();
    });
  });

  const closeBtn = document.getElementById("panelClose");
  if (closeBtn) closeBtn.addEventListener("click", closePanel);

  const backdrop = document.getElementById("panelBackdrop");
  if (backdrop) backdrop.addEventListener("click", closePanel);

  const statusSelect = document.getElementById("statusSelect");
  if (statusSelect) {
    statusSelect.addEventListener("change", async (e) => {
      const id = state.selected;
      if (!id) return;
      const sub = state.submissions.find((s) => s.id === id);
      if (!sub) return;
      try {
        await updateStatus(id, e.target.value);
        sub.status = e.target.value;
        toast("Status updated", "success");
        render();
      } catch (err) {
        toast("Couldn't update: " + err.message, "error");
      }
    });
  }

  const deleteBtn = document.getElementById("deleteBtn");
  if (deleteBtn) {
    deleteBtn.addEventListener("click", async () => {
      const id = state.selected;
      if (!id) return;
      if (!confirm("Delete this submission permanently?")) return;
      try {
        await deleteSubmission(id);
        state.submissions = state.submissions.filter((s) => s.id !== id);
        closePanel();
        toast("Submission deleted", "success");
        render();
      } catch (err) {
        toast("Couldn't delete: " + err.message, "error");
      }
    });
  }
}

function closePanel() {
  state.selected = null;
  render();
}

/* ======================================================================= */
/*  TOAST                                                                  */
/* ======================================================================= */

let toastTimer = null;
function toast(msg, kind) {
  let el = document.querySelector(".toast");
  if (!el) {
    el = document.createElement("div");
    el.className = "toast";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.className = "toast " + (kind || "") + " show";
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.classList.remove("show"); }, 2600);
}

/* ======================================================================= */
/*  NOTIFICATIONS                                                          */
/* ======================================================================= */

function requestNotificationPermission() {
  if (!("Notification" in window)) return;
  if (Notification.permission === "default") {
    Notification.requestPermission().then((perm) => {
      if (perm === "granted") {
        localStorage.setItem(NOTIF_ENABLED_KEY, "1");
        toast("Notifications enabled", "success");
      }
    });
  }
}

function notifyNewSubmission(sub) {
  if (!("Notification" in window)) return;
  if (Notification.permission !== "granted") return;
  try {
    new Notification("New project brief", {
      body: (sub.full_name || "Someone") + " · " + (sub.business_name || "") + " — " + (sub.services || ""),
      tag: sub.id,
    });
  } catch (e) {}
}

/* ======================================================================= */
/*  DATA LOADING                                                           */
/* ======================================================================= */

async function load() {
  if (!state.authenticated) return;
  try {
    const subs = await fetchSubmissions();

    if (!state.firstLoad) {
      subs.forEach((s) => {
        if (!state.lastSeenIds.has(s.id)) notifyNewSubmission(s);
      });
    }

    state.lastSeenIds = new Set(subs.map((s) => s.id));
    state.submissions = subs;
    state.error = null;
    state.loading = false;
    state.firstLoad = false;
    render();
  } catch (err) {
    state.error = err.message;
    state.loading = false;
    render();
  }
}

/* ======================================================================= */
/*  BOOT                                                                   */
/* ======================================================================= */

document.addEventListener("click", function once() {
  document.removeEventListener("click", once);
  requestNotificationPermission();
}, { once: true });

(async function boot() {
  const { data: { session } } = await authClient.auth.getSession();
  if (session) {
    state.authenticated = true;
    state.loading = true;
    render();
    await load();
  } else {
    state.authenticated = false;
    state.loading = false;
    render();
  }
})();

setInterval(() => {
  if (state.authenticated) load();
}, REFRESH_INTERVAL);

document.addEventListener("visibilitychange", () => {
  if (!document.hidden && state.authenticated) load();
});