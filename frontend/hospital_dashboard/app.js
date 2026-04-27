let patients = [];
let currentFilter = 'all';

//  LOAD PATIENTS FROM BACKEND
async function loadPatients() {
    try {
        // const res = await fetch("/api/patients");
        const res = await fetch(`/patient/by-hospital?hospital=${hospitalName}`);
        const data = await res.json();

        //console.log("API DATA:", data);

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
                _id:p._id,
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

//setInterval(loadPatients, 5000);

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
        <td>
        <input type="checkbox" onchange="markDone('${p._id}')">
        </td>
      </tr>
    `;
  }).join('');
}

async function markDone(id) {
  try {
    await fetch(`/patient/complete/${id}`, {
      method: "PUT"
    });

    patients = patients.filter(p => p._id !== id);

    renderStats();
    renderTable();

  } catch (err) {
    console.log("Error marking done:", err);
  }
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



