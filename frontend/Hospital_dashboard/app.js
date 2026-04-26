let patients = [];
let currentFilter = 'all';

//  LOAD PATIENTS FROM BACKEND
async function loadPatients() {
    try {
        const res = await fetch("/api/patients");
        const data = await res.json();

        console.log("API DATA:", data);

        //  MAP DB → UI FORMAT
        patients = data.map(p => {
            const pss = p.pss || 0;

            let status = 'stable';
            let priority = 'LOW';

            if (pss >= 71) {
                status = 'critical';
                priority = 'HIGH';
            } else if (pss >= 31) {
                status = 'monitoring';
                priority = pss > 60 ? 'HIGH' : 'MEDIUM';
            }

            return {
                name: p.fullName || p.name,
                pss,
                status,
                priority
            };
        });

        renderStats();
        renderTable();

    } catch (err) {
        console.log("Error loading patients:", err);
    }
}

setInterval(loadPatients, 2000);

//  ALERTS (STATIC FOR NOW)
const alerts = [
  { pid: 'ICU-04', msg: 'Respiratory distress alert', time: 'Just now' },
  { pid: 'ICU-07', msg: 'Cardiac rhythm anomaly', time: '4 min ago' },
  { pid: 'ICU-02', msg: 'Cardiac rhythm anomaly', time: '4 min ago' }
];

// COLOR LOGIC
function pssColor(pss) {
  if (pss <= 30) return '#16a34a';
  if (pss <= 70) return '#d97706';
  return '#dc2626';
}

//  STATUS LABEL
function statusLabel(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function renderTable() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const tbody = document.getElementById('tableBody');

  const filtered = patients.filter(p =>
    p.name.toLowerCase().includes(search)
  );

  document.getElementById('tableSubtitle').textContent =
    `Showing ${filtered.length} of ${patients.length} active patients`;

  tbody.innerHTML = filtered.map(p => {
    const col = pssColor(p.pss);

    return `
      <tr>
        <td>${p.name}</td>

        <td>
          <div class="pss-cell">
            <div class="pss-bar-track">
              <div class="pss-bar-fill" style="width:${p.pss}%; background:${col}"></div>
            </div>
            <span class="pss-num" style="color:${col}">${p.pss}</span>
          </div>
        </td>

        <td>
          <span class="status-badge ${p.status}">
            <span class="dot"></span>${statusLabel(p.status)}
          </span>
        </td>

        <td>
          <span class="pri ${p.priority}">${p.priority}</span>
        </td>
      </tr>
    `;
  }).join('');
}

//  RENDER STATS
function renderStats() {
  const crit = patients.filter(p => p.status === 'critical').length;
  const mon  = patients.filter(p => p.status === 'monitoring').length;
  const stab = patients.filter(p => p.status === 'stable').length;

  document.getElementById('sTotal').textContent = patients.length;
  document.getElementById('sCritical').textContent = crit;
  document.getElementById('sMonitoring').textContent = mon;
  document.getElementById('sStable').textContent = stab;
}

// SEARCH
function applyFilters() {
  renderTable();
}

function refreshData(btn) {
  btn.classList.add('spinning');

  setTimeout(() => {
    patients.forEach(p => {
      const delta = Math.floor(Math.random() * 10 - 5);
      p.pss = Math.max(0, Math.min(100, p.pss + delta));
    });

    renderStats();
    renderTable();
    btn.classList.remove('spinning');
  }, 500);
}

//  ALERTS RENDER
function renderAlerts() {
  document.getElementById('alertsList').innerHTML = alerts.map(a => `
    <div class="alert-item">
      <div class="alert-tri">🔺</div>
      <div class="alert-body">
        <div class="alert-pid">${a.pid}</div>
        <div class="alert-msg">${a.msg}</div>
        <div class="alert-time">${a.time}</div>
      </div>
    </div>
  `).join('');
}

renderAlerts();