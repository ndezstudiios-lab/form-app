/* ======================================================================= */
/*  CONFIG                                                                 */
/* ======================================================================= */

const AGENCY_EMAIL = "ndezstudiios@gmail.com";

/* Web3Forms access key (from your dashboard) */
const WEB3FORMS_ACCESS_KEY = "9435873c-63af-4fc0-8d45-be0c3232443e";

const DRAFT_KEY = "ndez-draft-v1";

/* ======================================================================= */
/*  DATA LAYER                                                             */
/* ======================================================================= */

const SERVICE_CARDS = [
  { id: "brand",     group: "brand",   name: "Brand Development",        desc: "Identity, positioning & strategy",       icon: "✦" },
  { id: "logo",      group: "logo",    name: "Logo Design",              desc: "A mark that represents you",             icon: "◆" },
  { id: "graphic",   group: "graphic", name: "Graphic Design",           desc: "Print & digital visual assets",          icon: "▲" },
  { id: "webdesign", group: "web",     name: "Web Design",               desc: "How your site looks and feels",          icon: "◧" },
  { id: "webdev",    group: "web",     name: "Web Development",          desc: "How your site works, end to end",        icon: "◨" },
  { id: "webfull",   group: "web",     name: "Web Design & Development", desc: "A full website build, start to finish",  icon: "⬡" },
  { id: "social",    group: "social",  name: "Social Media",             desc: "Content, platforms & strategy",          icon: "◎" },
  { id: "other",     group: "other",   name: "Something else",           desc: "Not listed here? Tell us about it",      icon: "✧" },
];

const GROUP_ORDER = ["brand", "logo", "graphic", "web", "social", "other"];
const GROUP_TITLES = {
  brand: "Brand Development", logo: "Logo Design", graphic: "Graphic Design",
  web: "Web Design & Development", social: "Social Media", other: "Your Project",
};
const GROUP_SUBS = {
  brand: "Help us understand who you are and where you're headed.",
  logo: "Let's get a feel for the mark you have in mind.",
  graphic: "Tell us what needs designing.",
  web: "Let's scope the site.",
  social: "Let's set the content direction.",
  other: "Tell us what you have in mind.",
};

const PERSONALITY_OPTIONS = ["Professional","Modern","Premium","Friendly","Bold","Minimal","Creative","Innovative","Trustworthy","Fun","Traditional"];

const QUESTION_BANK = {
  brand: [
    { id: "business_name", section: "Business", question: "What is the name of your business?", type: "text", required: true },
    { id: "business_does", section: "Business", question: "What does your business do?", type: "textarea", required: true },
    { id: "products_services", section: "Business", question: "What products or services do you offer?", type: "textarea", required: true },
    { id: "mission", section: "Business", question: "What is your mission?", type: "textarea", required: false },
    { id: "vision", section: "Business", question: "What is your vision?", type: "textarea", required: false },
    { id: "target_audience", section: "Audience", question: "Who is your target audience?", type: "textarea", required: true },
    { id: "problem_solved", section: "Audience", question: "What problem do you solve for them?", type: "textarea", required: true },
    { id: "customer_type", section: "Audience", question: "What type of customers are you trying to attract?", type: "textarea", required: false },
    { id: "competitors", section: "Positioning", question: "Who are your main competitors?", type: "textarea", required: false },
    { id: "differentiation", section: "Positioning", question: "What makes you different from them?", type: "textarea", required: true },
    { id: "brand_memory", section: "Positioning", question: "What should customers remember about your brand?", type: "textarea", required: false },
    { id: "personality", section: "Personality", question: "Which characteristics describe your brand?", description: "Select as many as apply.", type: "multi_choice", required: true, options: PERSONALITY_OPTIONS },
    { id: "has_brand", section: "Existing Brand", question: "Do you already have a brand identity?", type: "single_choice", required: true, options: ["Yes", "No", "Partially"] },
    { id: "brand_materials_upload", section: "Existing Brand", question: "Upload your existing brand materials", type: "file", required: false, showIf: { id: "has_brand", in: ["Yes"] } },
    { id: "brand_partial_elements", section: "Existing Brand", question: "Which elements already exist?", type: "textarea", required: false, showIf: { id: "has_brand", in: ["Partially"] } },
  ],
  logo: [
    { id: "business_name", section: "Business", question: "What is the business name?", type: "text", required: true },
    { id: "logo_communicate", section: "Direction", question: "What should the logo communicate about your business?", type: "textarea", required: true },
    { id: "logo_style", section: "Direction", question: "Do you have a preferred logo style?", type: "single_choice", required: false, options: ["Minimal","Modern","Classic","Playful","Luxury","Bold","Hand-drawn","Not sure"] },
    { id: "logo_symbols", section: "Direction", question: "Are there symbols or ideas you want incorporated?", type: "textarea", required: false },
    { id: "logo_avoid", section: "Direction", question: "Are there symbols, colors, or styles you want to avoid?", type: "textarea", required: false },
    { id: "logo_usage", section: "Direction", question: "Where will the logo primarily be used?", type: "multi_choice", required: false, options: ["Website","Print","Social media","Signage","Packaging","Apparel","Other"] },
    { id: "has_guidelines", section: "Existing Materials", question: "Do you have existing brand guidelines?", type: "single_choice", required: true, options: ["Yes","No"] },
    { id: "materials_upload", section: "Existing Materials", question: "Upload existing brand materials, if available", type: "file", required: false },
    { id: "logo_examples", section: "References", question: "Share examples of logos you like", description: "Paste links or describe them — you can attach images below too.", type: "textarea", required: false },
    { id: "logo_examples_upload", section: "References", question: "Attach reference images", type: "file", required: false },
  ],
  graphic: [
    { id: "design_type", section: "Project", question: "What type of design do you need?", type: "multi_choice", required: true, options: ["Poster","Flyer","Brochure","Business card","Advertisement","Presentation","Packaging","Infographic","Social media graphic","Other"] },
    { id: "design_purpose", section: "Project", question: "What is the design for?", type: "textarea", required: true },
    { id: "design_quantity", section: "Project", question: "How many designs do you need?", type: "number", required: true },
    { id: "design_must_include", section: "Project", question: "What information must appear on the design?", type: "textarea", required: false },
    { id: "design_dimensions", section: "Project", question: "What size or dimensions are required?", type: "text", required: false },
    { id: "design_usage_location", section: "Project", question: "Where will the design be used?", type: "text", required: false },
    { id: "has_references", section: "References", question: "Do you have examples of designs you like?", type: "single_choice", required: false, options: ["Yes","No"] },
    { id: "references_like", section: "References", question: "What do you like about those examples?", type: "textarea", required: false, showIf: { id: "has_references", in: ["Yes"] } },
    { id: "references_upload", section: "References", question: "Attach reference files or images", type: "file", required: false, showIf: { id: "has_references", in: ["Yes"] } },
    { id: "avoid_styles", section: "References", question: "Are there styles you want to avoid?", type: "textarea", required: false },
  ],
  web: [
    { id: "website_purpose", section: "Purpose", question: "What is the main purpose of the website?", type: "single_choice", required: true, options: ["Business website","Portfolio","E-commerce","Booking","Lead generation","Blog","Online service","Community","Other"] },
    { id: "visitor_action", section: "Purpose", question: "What should visitors do on the website?", type: "textarea", required: true },
    { id: "target_audience", section: "Purpose", question: "Who is your target audience?", type: "textarea", required: true },
    { id: "pages", section: "Pages", question: "Which pages do you need?", type: "multi_choice", required: true, options: ["Home","About","Services","Portfolio","Contact","Blog","Shop","FAQ","Booking","Other"] },
    { id: "features", section: "Features", question: "Which features do you need?", type: "multi_choice", required: false, options: ["Contact form","Online payments","Booking system","E-commerce","User accounts","Newsletter","Blog","Search","Maps","Social media integration","Animations","Other"] },
    { id: "existing_assets", section: "Existing Assets", question: "Which of these do you already have?", type: "multi_choice", required: false, options: ["Logo","Brand guidelines","Website content","Photos","Videos","Domain","Hosting"] },
    { id: "has_existing_website", section: "Existing Website", question: "Do you already have a website?", type: "single_choice", required: true, options: ["Yes","No"] },
    { id: "current_website_url", section: "Existing Website", question: "What is your current website URL?", type: "url", required: false, showIf: { id: "has_existing_website", in: ["Yes"] } },
    { id: "current_website_like", section: "Existing Website", question: "What do you like about your current website?", type: "textarea", required: false, showIf: { id: "has_existing_website", in: ["Yes"] } },
    { id: "current_website_fix", section: "Existing Website", question: "What problems do you want fixed?", type: "textarea", required: false, showIf: { id: "has_existing_website", in: ["Yes"] } },
    { id: "liked_websites", section: "References", question: "What websites do you like?", type: "textarea", required: false },
    { id: "liked_websites_why", section: "References", question: "What do you like about them?", type: "textarea", required: false },
    { id: "avoid_websites", section: "References", question: "Are there websites whose style you want to avoid?", type: "textarea", required: false },
  ],
  social: [
    { id: "platforms", section: "Platforms", question: "Which platforms are you focused on?", type: "multi_choice", required: true, options: ["Instagram","Facebook","TikTok","LinkedIn","X","YouTube","Other"] },
    { id: "social_goals", section: "Goals", question: "What are your goals?", type: "multi_choice", required: true, options: ["Brand awareness","Grow audience","Generate leads","Increase sales","Build community","Educate audience","Promote products/services","Other"] },
    { id: "content_types", section: "Content", question: "What type of content do you want?", type: "multi_choice", required: false, options: ["Educational","Promotional","Entertaining","Inspirational","Behind the scenes","Product/service showcases","Customer stories","Industry information","Other"] },
    { id: "post_frequency", section: "Content", question: "How frequently do you want to post?", type: "single_choice", required: false, options: ["Daily","3–5 times a week","Weekly","Biweekly","Monthly","Not sure yet"] },
    { id: "has_content_assets", section: "Content", question: "Do you already have photos or videos to use?", type: "single_choice", required: false, options: ["Yes","No","Some"] },
    { id: "content_creator", section: "Content", question: "Who creates the content — you, us, or both?", type: "text", required: false },
    { id: "admired_accounts", section: "References", question: "What accounts or brands do you admire?", type: "textarea", required: false },
  ],
  other: [
    { id: "other_description", section: "Tell us more", question: "What are you looking for?", description: "Describe the project so we can scope it properly.", type: "textarea", required: true },
    { id: "other_upload", section: "Tell us more", question: "Attach any reference files", type: "file", required: false },
  ],
};

const DETAILS_QUESTIONS = [
  { id: "goal", section: "Project Goals", question: "What is the main goal of this project?", type: "textarea", required: true },
  { id: "problem", section: "Project Goals", question: "What problem are you trying to solve?", type: "textarea", required: true },
  { id: "success", section: "Project Goals", question: "What would make this project successful?", type: "textarea", required: true },
  { id: "has_deadline", section: "Timeline", question: "Do you have a deadline?", type: "single_choice", required: true, options: ["Yes","No"] },
  { id: "target_date", section: "Timeline", question: "What is your target completion date?", type: "date", required: false, showIf: { id: "has_deadline", in: ["Yes"] } },
  { id: "deadline_reason", section: "Timeline", question: "Why is this deadline important?", type: "textarea", required: false, showIf: { id: "has_deadline", in: ["Yes"] } },
];

const BUDGET_QUESTIONS = [
  { id: "budget", section: "Budget", question: "What is your estimated budget?", description: "A range is fine — this just helps us scope the right solution.", type: "single_choice", required: true, options: ["Under KSh 10,000","KSh 10,000 – 25,000","KSh 25,000 – 50,000","KSh 50,000 – 100,000","KSh 100,000+","I'm not sure yet"] },
];

const CLIENT_FIELDS = [
  { id: "full_name",     label: "Full name",                          type: "text",     required: true,  placeholder: "Jane Doe" },
  { id: "business_name", label: "Business / organization name",       type: "text",     required: true,  placeholder: "Acme Studio" },
  { id: "email",         label: "Email",                              type: "email",    required: true,  placeholder: "hello@yourcompany.com" },
  { id: "phone",         label: "Phone / WhatsApp",                   type: "text",     required: true,  placeholder: "+254 700 000 000" },
  { id: "website",       label: "Website",                            type: "url",      required: false, placeholder: "https://yourcompany.com" },
  { id: "social",        label: "Social media links",                 type: "text",     required: false, placeholder: "@yourhandle" },
  { id: "location",      label: "Business location",                  type: "text",     required: true,  placeholder: "City, Country" },
  { id: "industry",      label: "Industry",                           type: "text",     required: true,  placeholder: "e.g. Hospitality, Retail, Tech" },
  { id: "description",   label: "Short description of the business",  type: "textarea", required: true,  placeholder: "A sentence or two about what you do." },
];

/* ======================================================================= */
/*  HELPERS                                                                */
/* ======================================================================= */

function genProjectId() {
  const year = new Date().getFullYear();
  const n = Math.floor(10000 + Math.random() * 90000);
  return "NDEZ-" + year + "-" + n;
}

function isEmpty(v) {
  if (v === undefined || v === null) return true;
  if (Array.isArray(v)) return v.length === 0;
  if (typeof v === "string") return v.trim() === "";
  return false;
}

function isVisible(q, answers) {
  if (!q.showIf) return true;
  const val = answers[q.showIf.id];
  if (Array.isArray(val)) return val.some((v) => q.showIf.in.includes(v));
  return q.showIf.in.includes(val);
}

function buildVisibleQuestions(selectedGroups) {
  const used = new Set();
  const map = {};
  selectedGroups.forEach((g) => {
    map[g] = QUESTION_BANK[g].filter((q) => {
      if (used.has(q.id)) return false;
      used.add(q.id);
      return true;
    });
  });
  return map;
}

function formatAnswerValue(v) {
  if (Array.isArray(v)) {
    if (v.length === 0) return "—";
    if (typeof v[0] === "object") return v.map((f) => f.name).join(", ");
    return v.join(", ");
  }
  return v;
}

/* ----------------------------------------------------------------------- */
/*  BRIEF TEXT — one clean, readable block for the email body              */
/* ----------------------------------------------------------------------- */
function buildBriefText({ projectId, clientInfo, selectedServices, answers, steps }) {
  const lines = [];
  const hr = "────────────────────────────────────────────";
  const pad = (s, n) => (s + " ".repeat(n)).slice(0, n);

  lines.push("NEW PROJECT BRIEF");
  lines.push(hr);
  lines.push("");
  lines.push("Project ID:  " + projectId);
  lines.push("");

  lines.push("CLIENT INFORMATION");
  lines.push(hr);
  CLIENT_FIELDS.forEach((f) => {
    lines.push("  " + pad(f.label, 32) + "  " + (clientInfo[f.id] || "—"));
  });
  lines.push("");

  const serviceNames = selectedServices
    .map((id) => (SERVICE_CARDS.find((c) => c.id === id) || {}).name)
    .filter(Boolean);
  lines.push("SERVICES REQUESTED");
  lines.push(hr);
  if (serviceNames.length === 0) lines.push("  —");
  else serviceNames.forEach((n) => lines.push("  • " + n));
  lines.push("");

  steps.filter((s) => s.kind === "questions").forEach((s) => {
    const visible = s.questions.filter((q) => isVisible(q, answers) && !isEmpty(answers[q.id]));
    if (visible.length === 0) return;
    lines.push(s.title.toUpperCase());
    lines.push(hr);
    visible.forEach((q) => {
      lines.push("");
      lines.push("  " + q.question);
      lines.push("  → " + formatAnswerValue(answers[q.id]));
    });
    lines.push("");
  });

  lines.push(hr);
  lines.push("Sent from the Ndezstudiio project intake form");
  return lines.join("\n");
}

function buildMailtoLink({ projectId, clientInfo, selectedServices, answers, steps }) {
  const subject = "New project brief — " + projectId + " — " + (clientInfo.business_name || clientInfo.full_name || "");
  let body = buildBriefText({ projectId, clientInfo, selectedServices, answers, steps });
  if (body.length > 1800) body = body.slice(0, 1800) + "\n\n[Brief truncated — full details saved under this Project ID.]";
  return "mailto:" + AGENCY_EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
}

async function sendBrief({ projectId, clientInfo, selectedServices, answers, steps }) {
  const briefText = buildBriefText({ projectId, clientInfo, selectedServices, answers, steps });

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: "New project brief — " + projectId + " — " + (clientInfo.business_name || clientInfo.full_name || ""),
      from_name: "Ndezstudiio Intake",
      email: clientInfo.email || "",
      // ONE formatted field is what makes the email readable.
      // Web3Forms renders its value as the whole body, preserving line breaks.
      "Project Brief": briefText,
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.success) throw new Error(data.message || "Submission failed");
  return data;
}

const storage = {
  get(key) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : null; }
    catch (e) { return null; }
  },
  set(key, val) {
    try { localStorage.setItem(key, val); } catch (e) {}
  },
  remove(key) {
    try { localStorage.removeItem(key); } catch (e) {}
  },
};

/* ======================================================================= */
/*  APP STATE                                                              */
/* ======================================================================= */

const state = {
  phase: "boot",
  projectId: "",
  stepIndex: 0,
  maxReached: 0,
  clientInfo: {},
  selectedServices: [],
  answers: {},
  errors: {},
  saveState: "idle",
  draftPreview: null,
  mailtoLink: "",
  submitState: "idle",
  submitError: "",
};

let saveTimer = null;

/* ======================================================================= */
/*  DERIVED                                                                */
/* ======================================================================= */

function getSelectedGroups() {
  const set = new Set(
    state.selectedServices
      .map((id) => (SERVICE_CARDS.find((c) => c.id === id) || {}).group)
      .filter(Boolean)
  );
  return GROUP_ORDER.filter((g) => set.has(g));
}

function getSteps() {
  const selectedGroups = getSelectedGroups();
  const visibleByGroup = buildVisibleQuestions(selectedGroups);
  const s = [
    { key: "client", title: "Client Information", kind: "client" },
    { key: "services", title: "Your Project", kind: "services" },
  ];
  selectedGroups.forEach((g) => {
    s.push({
      key: "q_" + g,
      title: GROUP_TITLES[g],
      subtitle: GROUP_SUBS[g],
      kind: "questions",
      questions: visibleByGroup[g],
    });
  });
  s.push({ key: "details", title: "Project Details", subtitle: "Wrapping up the shared details of the project.", kind: "questions", questions: DETAILS_QUESTIONS });
  s.push({ key: "budget", title: "Budget & Timeline", subtitle: "A ballpark is all we need.", kind: "questions", questions: BUDGET_QUESTIONS });
  s.push({ key: "review", title: "Review", kind: "review" });
  return s;
}

/* ======================================================================= */
/*  ACTIONS                                                                */
/* ======================================================================= */

function validateStep() {
  const steps = getSteps();
  const current = steps[Math.min(state.stepIndex, steps.length - 1)];
  const errs = {};

  if (current.kind === "client") {
    CLIENT_FIELDS.forEach((f) => {
      if (f.required && isEmpty(state.clientInfo[f.id])) errs[f.id] = "This field is required.";
    });
  } else if (current.kind === "services") {
    if (state.selectedServices.length === 0) errs._services = "Select at least one service to continue.";
  } else if (current.kind === "questions") {
    current.questions.forEach((q) => {
      if (q.required && isVisible(q, state.answers) && isEmpty(state.answers[q.id])) {
        errs[q.id] = "This field is required.";
      }
    });
  }

  state.errors = errs;
  return Object.keys(errs).length === 0;
}

function goNext() {
  if (!validateStep()) { render(); return; }
  const steps = getSteps();
  const next = Math.min(state.stepIndex + 1, steps.length - 1);
  state.stepIndex = next;
  state.maxReached = Math.max(state.maxReached, next);
  state.errors = {};
  scheduleSave();
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function goBack() {
  state.errors = {};
  state.stepIndex = Math.max(0, state.stepIndex - 1);
  scheduleSave();
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function jumpTo(i) {
  if (i <= state.maxReached) {
    state.errors = {};
    state.stepIndex = i;
    scheduleSave();
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function toggleService(id) {
  const idx = state.selectedServices.indexOf(id);
  if (idx >= 0) state.selectedServices.splice(idx, 1);
  else state.selectedServices.push(id);
  const steps = getSteps();
  if (state.stepIndex > steps.length - 1) state.stepIndex = steps.length - 1;
  scheduleSave();
  render();
}

function setAnswer(id, val) {
  state.answers[id] = val;
  scheduleSave();
  render();
}

function setClient(id, val) {
  state.clientInfo[id] = val;
  scheduleSave();
}

async function submit() {
  if (!validateStep()) { render(); return; }

  state.submitState = "sending";
  state.submitError = "";
  state.phase = "confirm";
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });

  const steps = getSteps();
  const fallback = buildMailtoLink({
    projectId: state.projectId,
    clientInfo: state.clientInfo,
    selectedServices: state.selectedServices,
    answers: state.answers,
    steps,
  });
  state.mailtoLink = fallback;

  const record = {
    projectId: state.projectId,
    clientInfo: state.clientInfo,
    selectedServices: state.selectedServices,
    answers: state.answers,
    submittedAt: new Date().toISOString(),
  };

  try {
    await sendBrief({
      projectId: state.projectId,
      clientInfo: state.clientInfo,
      selectedServices: state.selectedServices,
      answers: state.answers,
      steps,
    });
    storage.set("submission:" + state.projectId, JSON.stringify(record));
    storage.remove(DRAFT_KEY);
    state.submitState = "sent";
    render();
  } catch (err) {
    state.submitState = "error";
    state.submitError = err.message || "Could not send automatically.";
    render();
  }
}

function startNew() {
  state.projectId = genProjectId();
  state.clientInfo = {};
  state.selectedServices = [];
  state.answers = {};
  state.stepIndex = 0;
  state.maxReached = 0;
  state.errors = {};
  state.submitState = "idle";
  state.submitError = "";
  state.mailtoLink = "";
  state.phase = "wizard";
  storage.remove(DRAFT_KEY);
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function resumeDraft() {
  const d = state.draftPreview;
  if (!d) return;
  state.projectId = d.projectId;
  state.clientInfo = d.clientInfo || {};
  state.selectedServices = d.selectedServices || [];
  state.answers = d.answers || {};
  state.stepIndex = d.stepIndex || 0;
  state.maxReached = d.stepIndex || 0;
  state.phase = "wizard";
  render();
}

function discardDraft() {
  storage.remove(DRAFT_KEY);
  state.projectId = genProjectId();
  state.clientInfo = {};
  state.selectedServices = [];
  state.answers = {};
  state.stepIndex = 0;
  state.maxReached = 0;
  state.phase = "wizard";
  render();
}

function scheduleSave() {
  if (state.phase !== "wizard") return;
  state.saveState = "saving";
  updateHeaderSave();
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    storage.set(DRAFT_KEY, JSON.stringify({
      projectId: state.projectId,
      clientInfo: state.clientInfo,
      selectedServices: state.selectedServices,
      answers: state.answers,
      stepIndex: state.stepIndex,
    }));
    state.saveState = "saved";
    updateHeaderSave();
  }, 600);
}

/* ======================================================================= */
/*  RENDER                                                                 */
/* ======================================================================= */

const appEl = document.getElementById("app");
const headerRightEl = document.getElementById("headerRight");

function esc(s) {
  if (s === undefined || s === null) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function updateHeaderSave() {
  if (state.phase !== "wizard") {
    headerRightEl.innerHTML = state.projectId
      ? '<span class="pid">' + esc(state.projectId) + '</span>'
      : "";
    return;
  }
  const saveIcon = state.saveState === "saving"
    ? '<span class="save-indicator"><svg class="spin" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Saving…</span>'
    : state.saveState === "saved"
      ? '<span class="save-indicator"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> Saved</span>'
      : '';
  headerRightEl.innerHTML = saveIcon + '<span class="pid">' + esc(state.projectId) + '</span>';
}

function render() {
  const steps = getSteps();
  if (state.stepIndex > steps.length - 1) state.stepIndex = steps.length - 1;
  const current = steps[state.stepIndex];
  const progressPct = Math.round(((state.stepIndex + 1) / steps.length) * 100);

  updateHeaderSave();

  if (state.phase === "boot") {
    appEl.innerHTML = '<div class="center-pad"><svg class="spin" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg></div>';
    return;
  }

  if (state.phase === "resume" && state.draftPreview) {
    appEl.innerHTML =
      '<div class="shell"><div class="info-card">' +
        sparkleIcon() +
        '<h2>Continue where you left off?</h2>' +
        '<p>We found a saved brief in progress.</p>' +
        '<div class="info-meta"><span>Project ID</span><strong>' + esc(state.draftPreview.projectId) + '</strong></div>' +
        '<div class="info-actions">' +
          '<button class="btn-primary" id="resumeBtn">Resume brief</button>' +
          '<button class="btn-ghost" id="discardBtn">Start over</button>' +
        '</div>' +
      '</div></div>';
    document.getElementById("resumeBtn").onclick = resumeDraft;
    document.getElementById("discardBtn").onclick = discardDraft;
    return;
  }

  if (state.phase === "wizard" && current) {
    appEl.innerHTML =
      '<div class="shell">' +
        renderRail(steps, state.stepIndex, state.maxReached, progressPct) +
        '<div class="main">' +
          renderMobileProgress(steps, state.stepIndex, progressPct) +
          '<div class="card" id="card">' +
            renderStepContent(current, steps) +
            renderNav(current) +
          '</div>' +
        '</div>' +
      '</div>';
    bindWizardEvents(current, steps);
    return;
  }

  if (state.phase === "confirm") {
    let icon, title, body, actions;
    if (state.submitState === "sent") {
      icon = '<div class="confirm-icon">' + checkCircleIcon(28) + '</div>';
      title = "Your project brief has been submitted.";
      body = 'It landed in our inbox at <strong style="color:var(--text)">' + esc(AGENCY_EMAIL) + '</strong>. We\'ll review it and get back to you shortly.';
      actions = '<button class="btn-primary" id="newBtn">' + rotateIcon() + ' Start a new brief</button>';
    } else if (state.submitState === "sending") {
      icon = '<svg class="spin" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>';
      title = "Sending your brief…";
      body = "One moment while we deliver it.";
      actions = "";
    } else {
      icon = '<div class="confirm-icon error">' + xIcon(28) + '</div>';
      title = "We couldn't send it automatically.";
      body = esc(state.submitError) + ' You can send it manually instead — your email app will open pre-filled.';
      actions =
        '<button class="btn-ghost" id="mailtoBtn">Open email app</button>' +
        '<button class="btn-primary" id="newBtn">' + rotateIcon() + ' Start a new brief</button>';
    }
    appEl.innerHTML =
      '<div class="shell"><div class="info-card">' +
        icon +
        '<h2>' + title + '</h2>' +
        '<p>' + body + '</p>' +
        '<div class="info-meta"><span>Project ID</span><strong>' + esc(state.projectId) + '</strong></div>' +
        '<div class="info-actions">' + actions + '</div>' +
      '</div></div>';

    const newBtn = document.getElementById("newBtn");
    if (newBtn) newBtn.onclick = startNew;
    const mailtoBtn = document.getElementById("mailtoBtn");
    if (mailtoBtn) mailtoBtn.onclick = () => { window.location.href = state.mailtoLink; };
    return;
  }
}

function renderRail(steps, stepIndex, maxReached, progressPct) {
  const items = steps.map((s, i) => {
    const cls = i === stepIndex ? "rail-active" : i < stepIndex ? "rail-done" : i <= maxReached ? "rail-visited" : "rail-upcoming";
    const num = i < stepIndex ? checkIcon(11, 3) : (i + 1);
    const disabled = i > maxReached ? " disabled" : "";
    return '<li><button class="rail-item ' + cls + '" data-jump="' + i + '"' + disabled + '><span class="rail-num">' + num + '</span>' + esc(s.title) + '</button></li>';
  }).join("");

  return '<div class="rail">' +
    '<div class="rail-progress">' +
      '<div class="rail-progress-track"><div class="rail-progress-fill" style="width:' + progressPct + '%"></div></div>' +
      '<span>' + progressPct + '% complete</span>' +
    '</div>' +
    '<ol class="rail-list">' + items + '</ol>' +
  '</div>';
}

function renderMobileProgress(steps, stepIndex, progressPct) {
  return '<div class="mobile-progress">' +
    '<div class="mobile-progress-top"><span>' + esc(steps[stepIndex].title) + '</span><span>' + progressPct + '%</span></div>' +
    '<div class="rail-progress-track"><div class="rail-progress-fill" style="width:' + progressPct + '%"></div></div>' +
  '</div>';
}

function renderNav(current) {
  const backDisabled = state.stepIndex === 0 ? " disabled" : "";
  const right = current.kind === "review"
    ? '<button class="btn-primary" id="submitBtn">' + (state.submitState === "sending" ? '<svg class="spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Sending…' : 'Submit brief ' + checkIcon(16)) + '</button>'
    : '<button class="btn-primary" id="nextBtn">Continue ' + arrowRightIcon(16) + '</button>';
  return '<div class="nav">' +
    '<button class="btn-ghost" id="backBtn"' + backDisabled + '>' + arrowLeftIcon(16) + ' Back</button>' +
    right +
  '</div>';
}

function renderStepContent(current, steps) {
  if (current.kind === "client") return renderClientStep();
  if (current.kind === "services") return renderServicesStep();
  if (current.kind === "questions") return renderQuestionsStep(current);
  if (current.kind === "review") return renderReviewStep(steps);
  return "";
}

function renderClientStep() {
  const fields = CLIENT_FIELDS.map((f) => {
    const err = state.errors[f.id] ? '<p class="field-error">' + esc(state.errors[f.id]) + '</p>' : '';
    const cls = "input" + (state.errors[f.id] ? " input-err" : "");
    const val = esc(state.clientInfo[f.id] || "");
    const label = '<label class="field-label">' + esc(f.label) + (f.required ? '<span class="req">*</span>' : '') + '</label>';
    const input = f.type === "textarea"
      ? '<textarea class="' + cls + '" rows="3" data-client="' + f.id + '" placeholder="' + esc(f.placeholder || '') + '">' + val + '</textarea>'
      : '<input class="' + cls + '" type="' + f.type + '" data-client="' + f.id + '" placeholder="' + esc(f.placeholder || '') + '" value="' + val + '" />';
    return '<div class="field">' + label + input + err + '</div>';
  }).join("");

  return '<div>' +
    '<h1 class="step-title">Let\'s start with the basics</h1>' +
    '<p class="step-subtitle">A little about you and your business.</p>' +
    '<div class="field-stack">' + fields + '</div>' +
  '</div>';
}

function renderServicesStep() {
  const cards = SERVICE_CARDS.map((c) => {
    const active = state.selectedServices.includes(c.id);
    return '<button type="button" class="service-card' + (active ? ' service-card-active' : '') + '" data-service="' + c.id + '">' +
      '<span class="service-icon">' + esc(c.icon) + '</span>' +
      '<span class="service-name">' + esc(c.name) + '</span>' +
      '<span class="service-desc">' + esc(c.desc) + '</span>' +
      '<span class="service-check' + (active ? ' service-check-active' : '') + '">' + (active ? checkIcon(12, 3) : '') + '</span>' +
    '</button>';
  }).join("");
  const err = state.errors._services ? '<p class="field-error" style="margin-top:14px">' + esc(state.errors._services) + '</p>' : '';
  return '<div>' +
    '<h1 class="step-title">What are you looking for?</h1>' +
    '<p class="step-subtitle">Select everything that applies — we\'ll only ask what\'s relevant.</p>' +
    '<div class="service-grid">' + cards + '</div>' +
    err +
  '</div>';
}

function renderQuestionsStep(current) {
  const visible = current.questions.filter((q) => isVisible(q, state.answers));
  let lastSection = null;
  const blocks = visible.map((q) => {
    const showHeader = q.section && q.section !== lastSection;
    lastSection = q.section;
    const header = showHeader ? '<div class="section-heading">' + esc(q.section) + '</div>' : '';
    return '<div>' + header + renderQuestionField(q) + '</div>';
  }).join("");

  return '<div>' +
    '<h1 class="step-title">' + esc(current.title) + '</h1>' +
    (current.subtitle ? '<p class="step-subtitle">' + esc(current.subtitle) + '</p>' : '') +
    '<div class="field-stack">' + blocks + '</div>' +
  '</div>';
}

function renderQuestionField(q) {
  const err = state.errors[q.id] ? '<p class="field-error">' + esc(state.errors[q.id]) + '</p>' : '';
  const label = '<label class="field-label">' + esc(q.question) + (q.required ? '<span class="req">*</span>' : '') + '</label>';
  const desc = q.description ? '<p class="field-desc">' + esc(q.description) + '</p>' : '';
  const val = state.answers[q.id];
  const errCls = state.errors[q.id] ? " input-err" : "";

  let input = "";
  if (q.type === "textarea") {
    input = '<textarea class="textarea' + errCls + '" rows="3" data-q="' + q.id + '" placeholder="' + esc(q.placeholder || '') + '">' + esc(val || "") + '</textarea>';
  } else if (q.type === "single_choice") {
    input = '<div class="option-grid">' + q.options.map((opt) =>
      '<button type="button" class="option' + (val === opt ? ' option-active' : '') + '" data-q-single="' + q.id + '" data-val="' + esc(opt) + '">' +
        '<span class="radio-dot' + (val === opt ? ' radio-dot-active' : '') + '"></span>' + esc(opt) +
      '</button>'
    ).join("") + '</div>';
  } else if (q.type === "multi_choice") {
    const arr = val || [];
    input = '<div class="chip-row">' + q.options.map((opt) => {
      const active = arr.includes(opt);
      return '<button type="button" class="chip' + (active ? ' chip-active' : '') + '" data-q-multi="' + q.id + '" data-val="' + esc(opt) + '">' +
        (active ? checkIcon(13, 3) : '') + esc(opt) +
      '</button>';
    }).join("") + '</div>';
  } else if (q.type === "file") {
    const files = val || [];
    const chips = files.map((f, i) =>
      '<div class="file-chip">' + fileIcon(13) + '<span>' + esc(f.name) + '</span>' +
        '<button type="button" data-file-remove="' + q.id + '" data-idx="' + i + '" aria-label="Remove file">' + xIcon(12) + '</button>' +
      '</div>'
    ).join("");
    input = '<div class="dropzone" data-q-file="' + q.id + '">' + uploadIcon(18) +
      '<span>Drag files here or click to browse</span>' +
      '<input type="file" multiple style="display:none" data-q-file-input="' + q.id + '" />' +
    '</div>' + (files.length ? '<div class="file-list">' + chips + '</div>' : '');
  } else {
    const type = q.type === "number" ? "number" : q.type === "date" ? "date" : q.type === "url" ? "url" : q.type === "email" ? "email" : "text";
    input = '<input class="input' + errCls + '" type="' + type + '" data-q="' + q.id + '" placeholder="' + esc(q.placeholder || '') + '" value="' + esc(val || "") + '" />';
  }

  return '<div class="field">' + label + desc + input + err + '</div>';
}

function renderReviewStep(steps) {
  const serviceNames = state.selectedServices
    .map((id) => (SERVICE_CARDS.find((c) => c.id === id) || {}).name)
    .filter(Boolean);

  const clientBlock = reviewBlock("Client", 0,
    reviewRow("Name", state.clientInfo.full_name) +
    reviewRow("Business", state.clientInfo.business_name) +
    reviewRow("Email", state.clientInfo.email) +
    reviewRow("Phone", state.clientInfo.phone) +
    reviewRow("Location", state.clientInfo.location) +
    reviewRow("Industry", state.clientInfo.industry)
  );

  const servicesBlock = reviewBlock("Services", 1,
    '<div class="review-badges">' + serviceNames.map((n) => '<span class="review-badge">' + esc(n) + '</span>').join("") + '</div>'
  );

  const questionBlocks = steps
    .map((s, idx) => ({ s, idx }))
    .filter(({ s }) => s.kind === "questions")
    .map(({ s, idx }) => {
      const visible = s.questions.filter((q) => isVisible(q, state.answers) && !isEmpty(state.answers[q.id]));
      if (visible.length === 0) return "";
      const rows = visible.map((q) => reviewRow(q.question, formatAnswerValue(state.answers[q.id]))).join("");
      return reviewBlock(s.title, idx, rows);
    })
    .join("");

  return '<div>' +
    '<h1 class="step-title">Review your brief</h1>' +
    '<p class="step-subtitle">Take a look before you send it over — you can jump back to edit anything.</p>' +
    clientBlock + servicesBlock + questionBlocks +
  '</div>';
}

function reviewBlock(title, editIdx, body) {
  return '<div class="review-block">' +
    '<div class="review-block-head">' +
      '<h3>' + esc(title) + '</h3>' +
      '<button type="button" class="edit-btn" data-jump="' + editIdx + '">' + pencilIcon(12) + ' Edit</button>' +
    '</div>' +
    '<div>' + body + '</div>' +
  '</div>';
}

function reviewRow(label, value) {
  const v = (value && value !== "") ? value : "—";
  return '<div class="review-row">' +
    '<span class="review-row-label">' + esc(label) + '</span>' +
    '<span class="review-row-value">' + esc(v) + '</span>' +
  '</div>';
}

function svg(path, size, stroke) {
  return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (stroke || 2) + '" stroke-linecap="round" stroke-linejoin="round">' + path + '</svg>';
}
function checkIcon(size, stroke) { return svg('<path d="M20 6 9 17l-5-5"/>', size || 16, stroke || 2.5); }
function xIcon(size) { return svg('<path d="M18 6 6 18"/><path d="m6 6 12 12"/>', size || 16); }
function arrowLeftIcon(size) { return svg('<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>', size || 16); }
function arrowRightIcon(size) { return svg('<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>', size || 16); }
function uploadIcon(size) { return svg('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>', size || 16); }
function fileIcon(size) { return svg('<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>', size || 16); }
function pencilIcon(size) { return svg('<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>', size || 14); }
function checkCircleIcon(size) { return svg('<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>', size || 24); }
function rotateIcon() { return svg('<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>', 15); }
function sparkleIcon() { return svg('<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>', 20); }

/* ======================================================================= */
/*  EVENT BINDING                                                          */
/* ======================================================================= */

function bindWizardEvents(current, steps) {
  appEl.querySelectorAll("[data-jump]").forEach((el) => {
    el.addEventListener("click", () => jumpTo(parseInt(el.dataset.jump, 10)));
  });

  const backBtn = document.getElementById("backBtn");
  if (backBtn) backBtn.addEventListener("click", goBack);
  const nextBtn = document.getElementById("nextBtn");
  if (nextBtn) nextBtn.addEventListener("click", goNext);
  const submitBtn = document.getElementById("submitBtn");
  if (submitBtn) submitBtn.addEventListener("click", submit);

  appEl.querySelectorAll("[data-client]").forEach((el) => {
    el.addEventListener("input", (e) => setClient(el.dataset.client, e.target.value));
  });

  appEl.querySelectorAll("[data-service]").forEach((el) => {
    el.addEventListener("click", () => toggleService(el.dataset.service));
  });

  appEl.querySelectorAll("[data-q]").forEach((el) => {
    el.addEventListener("input", (e) => {
      state.answers[el.dataset.q] = e.target.value;
      scheduleSave();
    });
  });

  appEl.querySelectorAll("[data-q-single]").forEach((el) => {
    el.addEventListener("click", () => {
      setAnswer(el.dataset.qSingle, el.dataset.val);
    });
  });

  appEl.querySelectorAll("[data-q-multi]").forEach((el) => {
    el.addEventListener("click", () => {
      const id = el.dataset.qMulti;
      const val = el.dataset.val;
      const arr = state.answers[id] || [];
      const idx = arr.indexOf(val);
      const next = idx >= 0 ? arr.filter((v) => v !== val) : [...arr, val];
      setAnswer(id, next);
    });
  });

  appEl.querySelectorAll("[data-q-file]").forEach((zone) => {
    const id = zone.dataset.qFile;
    const input = appEl.querySelector('[data-q-file-input="' + id + '"]');
    zone.addEventListener("click", () => input && input.click());
    zone.addEventListener("dragover", (e) => e.preventDefault());
    zone.addEventListener("drop", (e) => {
      e.preventDefault();
      if (e.dataTransfer.files.length) handleFileAdd(id, e.dataTransfer.files);
    });
    if (input) {
      input.addEventListener("change", (e) => {
        if (e.target.files.length) handleFileAdd(id, e.target.files);
        e.target.value = "";
      });
    }
  });

  appEl.querySelectorAll("[data-file-remove]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = el.dataset.fileRemove;
      const idx = parseInt(el.dataset.idx, 10);
      const arr = state.answers[id] || [];
      setAnswer(id, arr.filter((_, i) => i !== idx));
    });
  });
}

function handleFileAdd(id, fileList) {
  const existing = state.answers[id] || [];
  const next = [...existing, ...Array.from(fileList).map((f) => ({ name: f.name, size: f.size }))];
  setAnswer(id, next);
}

/* ======================================================================= */
/*  BOOT                                                                   */
/* ======================================================================= */

(function boot() {
  const draft = storage.get(DRAFT_KEY);
  if (draft && draft.value) {
    state.draftPreview = draft.value;
    state.phase = "resume";
  } else if (draft) {
    state.draftPreview = draft;
    state.phase = "resume";
  } else {
    state.projectId = genProjectId();
    state.phase = "wizard";
  }
  render();
})();