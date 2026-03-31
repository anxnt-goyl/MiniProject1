const patients = [
  { id: 'ICU-04',  dept: 'ICU',  pss: 92,  status: 'critical',   priority: 'high',   name: 'Arjun Mehta' },
  { id: 'ICU-07',  dept: 'ICU',  pss: 88,  status: 'critical',   priority: 'high',   name: 'Fatima Noor' },
  { id: 'ER-11',   dept: 'ER',   pss: 74,  status: 'monitoring', priority: 'high',   name: 'Ravi Sharma' },
  { id: 'OPD-21',  dept: 'OPD',  pss: 2.4, status: 'stable',     priority: 'low',    name: 'Priya Singh' },
  { id: 'WARD-12', dept: 'WARD', pss: 61,  status: 'monitoring', priority: 'medium', name: 'Sunita Patel' },
  { id: 'ICU-02',  dept: 'ICU',  pss: 95,  status: 'critical',   priority: 'high',   name: 'Mohammed Ali' },
  { id: 'OPD-09',  dept: 'OPD',  pss: 18,  status: 'stable',     priority: 'low',    name: 'Neha Gupta' },
  { id: 'WARD-05', dept: 'WARD', pss: 45,  status: 'monitoring', priority: 'medium', name: 'Vikram Das' },
  { id: 'ER-03',   dept: 'ER',   pss: 68,  status: 'monitoring', priority: 'medium', name: 'Ananya Roy' },
  { id: 'OPD-33',  dept: 'OPD',  pss: 8,   status: 'stable',     priority: 'low',    name: 'Kabir Khan' },
];

/* ── Alert Data ────────────────────────────────────────────── */
const alertsData = [
  { type: 'crit', room: 'ICU-04',  msg: 'Respiratory distress alert',   time: 'Just now' },
  { type: 'warn', room: 'WARD-12', msg: 'High PSS score detected',       time: '2 min ago' },
  { type: 'crit', room: 'ICU-02',  msg: 'Cardiac rhythm anomaly',        time: '4 min ago' },
  { type: 'warn', room: 'ER-11',   msg: 'BP elevated beyond threshold',  time: '7 min ago' },
  { type: 'info', room: 'OPD-21',  msg: 'Scheduled check-in completed',  time: '11 min ago' },
  { type: 'warn', room: 'WARD-05', msg: 'Medication due reminder',       time: '15 min ago' },
  { type: 'crit', room: 'ICU-07',  msg: 'Oxygen saturation drop',        time: '18 min ago' },
];

/* ── Pool of random incoming alerts ───────────────────────── */
const incomingAlerts = [
  { type: 'crit', room: 'ICU-04', msg: 'Respiratory distress alert', time: 'Just now' },
  { type: 'warn', room: 'ER-03',  msg: 'BP spike detected',           time: 'Just now' },
  { type: 'info', room: 'OPD-09', msg: 'Lab results received',        time: 'Just now' },
  { type: 'crit', room: 'ICU-07', msg: 'SpO2 below 90%',              time: 'Just now' },
  { type: 'warn', room: 'WARD-12', msg: 'Patient unresponsive',       time: 'Just now' },
];

/* ══════════════════════════════════════════════════════════════
   HELPER FUNCTIONS
══════════════════════════════════════════════════════════════ */

/**
 * Returns PSS level string based on numeric score.
 * < 30   → 'low'
 * 30–64  → 'medium'
 * ≥ 65   → 'high'
 */
function pssLevel(pss) {
  const v = parseFloat(pss);
  if (v < 30) return 'low';
  if (v < 65) return 'medium';
  return 'high';
}

/** Clamps PSS to 0–100 for bar width percentage. */
function pssBarWidth(pss) {
  return Math.min(100, Math.round(parseFloat(pss)));
}

/** Converts department name to lowercase CSS class suffix. */
function deptClass(dept) {
  return dept.toLowerCase();
}

/** Returns inline SVG eye icon string. */
function svgEye() {
  return `<svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11
             11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5
             5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3
             3-1.34 3-3-1.34-3-3-3z"/>
  </svg>`;
}

/** Returns inline SVG for alert icon based on type (crit/warn/info). */
function alertIcon(type) {
  const icons = {
    crit: `<svg viewBox="0 0 24 24" fill="currentColor">
             <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
           </svg>`,
    warn: `<svg viewBox="0 0 24 24" fill="currentColor">
             <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48
                      10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
           </svg>`,
    info: `<svg viewBox="0 0 24 24" fill="currentColor">
             <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48
                      10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
           </svg>`,
  };
  return icons[type] || icons.info;
}

/* ══════════════════════════════════════════════════════════════
   RENDER — PATIENT TABLE
══════════════════════════════════════════════════════════════ */
function renderTable(data) {
  const tbody = document.getElementById('table-body');
  tbody.innerHTML = '';

  data.forEach(p => {
    const lvl    = pssLevel(p.pss);
    const width  = pssBarWidth(p.pss);
    const isCrit = p.status === 'critical';

    const row = document.createElement('tr');
    if (isCrit) row.classList.add('critical-row');

    row.innerHTML = `
      <td>
        <div class="pid">${p.id}</div>
        <div style="font-size:.73rem;color:var(--text-3);margin-top:2px">${p.name}</div>
      </td>
      <td>
        <span class="dept-chip ${deptClass(p.dept)}">${p.dept}</span>
      </td>
      <td>
        <div class="pss-wrap">
          <div class="pss-bar-bg">
            <div class="pss-bar-fill pss-fill-${lvl}" style="width:${width}%"></div>
          </div>
          <span class="pss-val ${lvl}">${p.pss}</span>
        </div>
      </td>
      <td>
        <span class="status-badge ${p.status}">
          <span class="dot"></span>
          ${p.status.charAt(0).toUpperCase() + p.status.slice(1)}
        </span>
      </td>
      <td>
        <span class="priority ${p.priority}">${p.priority}</span>
      </td>
      <td>
        <button class="action-btn" title="View patient">${svgEye()}</button>
      </td>
    `;

    tbody.appendChild(row);
  });
}

/* ══════════════════════════════════════════════════════════════
   RENDER — ALERTS PANEL
══════════════════════════════════════════════════════════════ */
function renderAlerts(data) {
  const list = document.getElementById('alerts-list');
  list.innerHTML = '';

  data.forEach((a, i) => {
    const item = document.createElement('div');
    item.className = 'alert-item';
    if (i === 0) item.classList.add('new-alert'); // entrance animation for newest

    item.innerHTML = `
      <div class="alert-icon ${a.type}">${alertIcon(a.type)}</div>
      <div class="alert-body">
        <div class="alert-title">${a.room}</div>
        <div class="alert-msg">${a.msg}</div>
        <div class="alert-time">${a.time}</div>
      </div>
    `;

    list.appendChild(item);
  });
}

/* ══════════════════════════════════════════════════════════════
   FILTER / SEARCH
══════════════════════════════════════════════════════════════ */

/** Active department filter ('ALL' = show all). */
let currentDeptFilter = 'ALL';

/**
 * Filters the patient table by search query and active dept filter.
 * Called on search input events and department button clicks.
 */
function filterTable() {
  const q = document.getElementById('search-input').value.toLowerCase();

  const filtered = patients.filter(p => {
    const matchSearch =
      p.id.toLowerCase().includes(q) ||
      p.dept.toLowerCase().includes(q) ||
      p.name.toLowerCase().includes(q);
    const matchDept = currentDeptFilter === 'ALL' || p.dept === currentDeptFilter;
    return matchSearch && matchDept;
  });

  renderTable(filtered);

  // Update subtitle count
  document.getElementById('table-sub').textContent =
    `Showing ${filtered.length} of ${patients.length} active patients`;
}

/**
 * Sets the active department filter and re-renders.
 * @param {string} dept - 'ALL' | 'ICU' | 'OPD' | 'ER' | 'WARD'
 */
function filterDept(dept) {
  currentDeptFilter = dept;
  filterTable();
}

/* ══════════════════════════════════════════════════════════════
   REFRESH — SIMULATE LIVE DATA UPDATES
══════════════════════════════════════════════════════════════ */

/**
 * Simulates a data refresh:
 *  - Animates the refresh icon
 *  - Fluctuates PSS scores for non-stable patients
 *  - Randomly injects a new alert
 * @param {HTMLElement|null} btn - The button element (null for auto-update)
 */
function refreshData(btn) {
  // Spin the refresh icon
  const icon = document.getElementById('refresh-icon');
  if (icon) {
    icon.classList.add('spin');
    setTimeout(() => icon.classList.remove('spin'), 600);
  }

  // Simulate small PSS fluctuations for active/critical patients
  patients.forEach(p => {
    if (p.status !== 'stable') {
      const delta = parseFloat((Math.random() * 6 - 3).toFixed(1));
      p.pss = Math.round(
        Math.max(1, Math.min(99, parseFloat(p.pss) + delta)) * 10
      ) / 10;
    }
  });

  filterTable();

  // ~60% chance to push a new alert to the panel
  if (Math.random() > 0.4) {
    const pick = incomingAlerts[Math.floor(Math.random() * incomingAlerts.length)];
    alertsData.unshift({ ...pick }); // prepend newest
    if (alertsData.length > 8) alertsData.pop(); // cap list length
    renderAlerts(alertsData);
  }
}

/* ══════════════════════════════════════════════════════════════
   AUTO-UPDATE — EVERY 8 SECONDS
══════════════════════════════════════════════════════════════ */
function autoUpdate() {
  refreshData(null);

  // Simulate slight variation in online patient count
  const base = 36 + Math.floor(Math.random() * 5);
  document.getElementById('online-count').textContent = `${base} patients online`;
}

setInterval(autoUpdate, 8000);

/* ══════════════════════════════════════════════════════════════
   INIT — FIRST RENDER
══════════════════════════════════════════════════════════════ */
renderTable(patients);
renderAlerts(alertsData);