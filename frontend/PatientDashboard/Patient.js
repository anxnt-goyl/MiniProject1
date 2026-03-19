/* MediTrack — Patient Dashboard (simulated real-time API) */

const REFRESH_MS = 5000;
const LS_KEY_NAME = "meditrack_user_name";

const el = {
  overlay: document.getElementById("loadingOverlay"),

  dashboardScreen: document.getElementById("dashboardScreen"),
  loggedInName: document.getElementById("loggedInName"),
  logoutBtn: document.getElementById("logoutBtn"),

  patientName: document.getElementById("patientName"),
  patientId: document.getElementById("patientId"),
  tokenNumber: document.getElementById("tokenNumber"),
  patientStatusPill: document.getElementById("patientStatusPill"),
  requestHelpBtn: document.getElementById("requestHelpBtn"),

  waitingMinutes: document.getElementById("waitingMinutes"),
  estimatedTime: document.getElementById("estimatedTime"),
  waitBar: document.getElementById("waitBar"),
  waitNote: document.getElementById("waitNote"),

  pssScore: document.getElementById("pssScore"),
  pssLabel: document.getElementById("pssLabel"),
  pssFill: document.getElementById("pssFill"),
  pssMessage: document.getElementById("pssMessage"),

  bpValue: document.getElementById("bpValue"),
  tempValue: document.getElementById("tempValue"),
  hrValue: document.getElementById("hrValue"),
  sensorNote: document.getElementById("sensorNote"),

  fileInput: document.getElementById("fileInput"),
  fileChooseBtn: document.getElementById("fileChooseBtn"),
  uploadedFileName: document.getElementById("uploadedFileName"),

  messagesList: document.getElementById("messagesList"),
};

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

function nowHHMM() {
  const d = new Date();
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}

function showOverlay(show) {
  if (show) el.overlay.classList.add("is-visible");
  else el.overlay.classList.remove("is-visible");
  el.overlay.setAttribute("aria-hidden", show ? "false" : "true");
}

function normalizeName(name) {
  return String(name || "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, 40);
}

function getStoredName() {
  return normalizeName(localStorage.getItem(LS_KEY_NAME));
}

function setStoredName(name) {
  localStorage.setItem(LS_KEY_NAME, normalizeName(name));
}

function clearStoredName() {
  localStorage.removeItem(LS_KEY_NAME);
}

function setNavbarName(name) {
  const cleaned = normalizeName(name);
  el.loggedInName.textContent = cleaned || "Guest";
  // Set avatar initials based on name
  const initials =
    cleaned
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase())
      .join("") || "MT";
  const avatar = document.querySelector(".nav-user__avatar");
  if (avatar) avatar.textContent = initials;
}

function pssCategory(score) {
  if (score >= 75) return "Critical";
  if (score >= 45) return "Warning";
  return "Normal";
}

function setPill(pillEl, state) {
  pillEl.classList.remove("pill--ok", "pill--warn", "pill--danger");
  if (state === "Critical") pillEl.classList.add("pill--danger");
  else if (state === "Warning") pillEl.classList.add("pill--warn");
  else pillEl.classList.add("pill--ok");
  pillEl.textContent = state;
}

function setPssVisuals(score) {
  const category = pssCategory(score);
  setPill(el.pssLabel, category);

  el.pssScore.textContent = String(score);
  el.pssFill.style.width = `${clamp(score, 0, 100)}%`;

  if (category === "Critical") {
    el.pssScore.style.color = "rgba(255, 77, 79, 0.98)";
    el.pssFill.style.background =
      "linear-gradient(90deg, rgba(255, 77, 79, 0.95), rgba(243, 201, 72, 0.65))";
    el.pssMessage.textContent = "Critical discomfort detected. Assistance is recommended.";
  } else if (category === "Warning") {
    el.pssScore.style.color = "rgba(243, 201, 72, 0.98)";
    el.pssFill.style.background =
      "linear-gradient(90deg, rgba(243, 201, 72, 0.95), rgba(47, 122, 247, 0.6))";
    el.pssMessage.textContent = "Moderate discomfort detected. Please stay attentive.";
  } else {
    el.pssScore.style.color = "rgba(31, 210, 139, 0.95)";
    el.pssFill.style.background =
      "linear-gradient(90deg, rgba(31, 210, 139, 0.9), rgba(47, 122, 247, 0.55))";
    el.pssMessage.textContent = "Stable condition. Continue to wait for your turn.";
  }

  return category;
}

function formatETAFromMinutes(minutesFromNow) {
  const d = new Date(Date.now() + minutesFromNow * 60_000);
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}

function buildMessages(data) {
  const msgs = [];

  msgs.push("Doctor will attend you soon.");

  if (data.waitingMinutes >= 30) msgs.push("High waiting time detected.");
  if (data.waitingMinutes >= 45) msgs.push("Escalation may be required due to prolonged waiting.");

  if (data.sensors?.tempC >= 38.5) msgs.push("High temperature detected by sensors.");
  if (data.sensors?.hrBpm >= 120) msgs.push("High heart rate detected by sensors.");

  if (data.patientStatus === "Critical") msgs.push("Your status is critical. Staff have been notified.");
  else if (data.pssCategory === "Critical") msgs.push("PSS indicates critical severity. Consider requesting help.");
  else if (data.pssCategory === "Warning") msgs.push("Please inform staff if symptoms worsen.");

  msgs.push(`Last synced at ${nowHHMM()}.`);

  return msgs.slice(0, 5);
}

function renderSensors(data) {
  el.bpValue.textContent = `${data.sensors.bpSys}/${data.sensors.bpDia}`;
  el.tempValue.textContent = data.sensors.tempC.toFixed(1);
  el.hrValue.textContent = String(data.sensors.hrBpm);

  if (data.sensors.tempC >= 38.5 || data.sensors.hrBpm >= 120) {
    el.sensorNote.textContent = "Elevated vitals detected. Staff may monitor you more closely.";
  } else if (data.sensors.tempC >= 37.6 || data.sensors.hrBpm >= 100) {
    el.sensorNote.textContent = "Vitals slightly elevated. Please rest and stay calm.";
  } else {
    el.sensorNote.textContent = "Vitals within normal range based on latest reading.";
  }
}

function renderMessages(msgs) {
  el.messagesList.innerHTML = "";
  for (const msg of msgs) {
    const li = document.createElement("li");
    const text = document.createElement("div");
    const time = document.createElement("div");
    text.className = "msg__text";
    time.className = "msg__time";
    text.textContent = msg;
    time.textContent = nowHHMM();
    li.append(text, time);
    el.messagesList.appendChild(li);
  }
}

function renderWaiting(data) {
  el.waitingMinutes.textContent = String(data.waitingMinutes);
  el.estimatedTime.textContent = formatETAFromMinutes(data.estimatedInMinutes);

  const pct = clamp((data.waitingMinutes / 60) * 100, 0, 100);
  el.waitBar.style.width = `${pct}%`;

  if (data.waitingMinutes >= 45) {
    el.waitNote.textContent = "Queue delay is significant. A staff member may prioritize critical cases.";
  } else if (data.waitingMinutes >= 30) {
    el.waitNote.textContent = "Higher-than-usual wait time. Please remain seated and stay hydrated.";
  } else {
    el.waitNote.textContent = "Queue is moving normally. You’ll be called shortly.";
  }
}

function renderPatient(data) {
  el.patientName.textContent = data.name;
  el.patientId.textContent = data.patientId;
  el.tokenNumber.textContent = data.tokenNumber;

  setPill(el.patientStatusPill, data.patientStatus);

  const isCritical = data.patientStatus === "Critical" || data.pssCategory === "Critical";
  el.requestHelpBtn.hidden = !isCritical;
}

async function simulatePatientApi() {
  // Stable identity, changing vitals/queue
  const identity = {
    name: "Aarav Sharma",
    patientId: "MT-PAT-10429",
    tokenNumber: "T-17",
  };

  // Make changes feel realistic between refreshes
  const baseWait = clamp(Math.round(10 + Math.random() * 55), 1, 75);
  const score = clamp(Math.round(15 + Math.random() * 85), 0, 100);
  const pssCat = pssCategory(score);

  // Patient status loosely correlated with PSS, but not identical
  let patientStatus = "Normal";
  const roll = Math.random();
  if (pssCat === "Critical" && roll > 0.25) patientStatus = "Critical";
  else if (pssCat === "Warning" && roll > 0.92) patientStatus = "Critical";

  const estimatedInMinutes = clamp(Math.round(baseWait * (0.55 + Math.random() * 0.65)), 2, 85);

  // Simulated sensor readings
  const bpSys = clamp(Math.round(105 + Math.random() * 55), 90, 175);
  const bpDia = clamp(Math.round(65 + Math.random() * 30), 55, 115);
  const tempC = clamp(36.2 + Math.random() * 3.2, 35.8, 40.2);
  const hrBpm = clamp(Math.round(62 + Math.random() * 70), 50, 160);

  // Simulated network latency
  await new Promise((r) => setTimeout(r, 500 + Math.random() * 600));

  return {
    ...identity,
    patientStatus,
    waitingMinutes: baseWait,
    estimatedInMinutes,
    pssScore: score,
    pssCategory: pssCat,
    sensors: { bpSys, bpDia, tempC, hrBpm },
  };
}

async function requestHelp(currentData) {
  // Requirement: show alert + simulate API call with fetch()
  alert("Help request sent. A staff member will assist you shortly.");

  el.requestHelpBtn.disabled = true;
  el.requestHelpBtn.style.opacity = "0.7";

  const payload = {
    patientId: currentData.patientId,
    tokenNumber: currentData.tokenNumber,
    pssScore: currentData.pssScore,
    status: currentData.patientStatus,
    requestedAt: new Date().toISOString(),
  };

  try {
    // data: URL keeps this self-contained (no backend required) while still using fetch()
    const url = `data:application/json,${encodeURIComponent(JSON.stringify({ ok: true }))}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    await res.json();

    // Add a visible confirmation message
    renderMessages([
      "Request Help initiated successfully.",
      "A staff member has been notified.",
      ...buildMessages(currentData).slice(0, 3),
    ]);
  } catch {
    renderMessages(["Help request failed to send (simulated). Please notify staff at the counter."]);
  } finally {
    setTimeout(() => {
      el.requestHelpBtn.disabled = false;
      el.requestHelpBtn.style.opacity = "1";
    }, 900);
  }
}

let latest = null;
let timer = null;

function stopAutoRefresh() {
  if (timer) clearInterval(timer);
  timer = null;
}

async function refreshOnce({ showLoader } = { showLoader: false }) {
  if (showLoader) showOverlay(true);
  try {
    const data = await simulatePatientApi();

    const pssCat = setPssVisuals(data.pssScore);
    data.pssCategory = pssCat;

    renderWaiting(data);
    renderPatient(data);
    renderSensors(data);

    renderMessages(buildMessages(data));

    latest = data;
  } finally {
    if (showLoader) showOverlay(false);
  }
}

function startAutoRefresh() {
  stopAutoRefresh();
  timer = setInterval(() => refreshOnce({ showLoader: false }), REFRESH_MS);
}

function wireEvents() {
  el.requestHelpBtn.addEventListener("click", () => {
    if (!latest) return;
    requestHelp(latest);
  });

  el.fileChooseBtn.addEventListener("click", () => {
    el.fileInput?.click();
  });

  el.fileInput?.addEventListener("change", () => {
    const f = el.fileInput.files?.[0];
    el.uploadedFileName.textContent = f ? f.name : "No file selected";
  });

  el.logoutBtn?.addEventListener("click", () => {
    clearStoredName();
    setNavbarName("");
    alert("You have been logged out.");
  });
}

async function init() {
  wireEvents();
  setNavbarName(getStoredName());

  // Single-page dashboard always visible; load data with spinner, then refresh every 5s.
  await refreshOnce({ showLoader: true });
  startAutoRefresh();
}

init();

