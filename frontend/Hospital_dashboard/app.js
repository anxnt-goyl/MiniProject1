/*─────────────────────────────────────────────────────────
   MediTrack — Patient Monitoring Dashboard
   app.js  |  All data, rendering, and interactivity
───────────────────────────────────────────────────────── */

/* ── Patient Data ──────────────────────────────────────── */
const patients = [
  // ICU — Critical
  { id: 'ICU-01', name: 'Arjun Mehta',    dept: 'ICU',  pss: 92, status: 'critical',   priority: 'HIGH'   },
  { id: 'ICU-02', name: 'Fatima Noor',    dept: 'ICU',  pss: 88, status: 'critical',   priority: 'HIGH'   },
  { id: 'ICU-03', name: 'Karan Joshi',    dept: 'ICU',  pss: 95, status: 'critical',   priority: 'HIGH'   },
  { id: 'ICU-04', name: 'Suresh Gupta',   dept: 'ICU',  pss: 90, status: 'critical',   priority: 'HIGH'   },
  { id: 'ICU-05', name: 'Leena Mathur',   dept: 'ICU',  pss: 79, status: 'critical',   priority: 'HIGH'   },
  { id: 'ICU-06', name: 'Deepak Bose',    dept: 'ICU',  pss: 85, status: 'critical',   priority: 'HIGH'   },
  { id: 'ICU-07', name: 'Rekha Pillai',   dept: 'ICU',  pss: 73, status: 'critical',   priority: 'HIGH'   },
  // ICU — Monitoring
  { id: 'ICU-08', name: 'Vivek Anand',    dept: 'ICU',  pss: 65, status: 'monitoring', priority: 'HIGH'   },
  { id: 'ICU-09', name: 'Nisha Iyer',     dept: 'ICU',  pss: 58, status: 'monitoring', priority: 'MEDIUM' },
  // ER — Critical
  { id: 'ER-01',  name: 'Ravi Sharma',    dept: 'ER',   pss: 74, status: 'critical',   priority: 'HIGH'   },
  { id: 'ER-02',  name: 'Pooja Desai',    dept: 'ER',   pss: 80, status: 'critical',   priority: 'HIGH'   },
  // ER — Monitoring
  { id: 'ER-03',  name: 'Meena Verma',    dept: 'ER',   pss: 68, status: 'monitoring', priority: 'MEDIUM' },
  { id: 'ER-04',  name: 'Sanjay Kulkarni',dept: 'ER',   pss: 55, status: 'monitoring', priority: 'MEDIUM' },
  { id: 'ER-05',  name: 'Anjali Tiwari',  dept: 'ER',   pss: 62, status: 'monitoring', priority: 'MEDIUM' },
  { id: 'ER-06',  name: 'Harish Nair',    dept: 'ER',   pss: 47, status: 'monitoring', priority: 'MEDIUM' },
  // ER — Stable
  { id: 'ER-07',  name: 'Bhavna Rao',     dept: 'ER',   pss: 22, status: 'stable',     priority: 'LOW'    },
  { id: 'ER-08',  name: 'Tarun Saxena',   dept: 'ER',   pss: 18, status: 'stable',     priority: 'LOW'    },
  // OPD — Monitoring
  { id: 'OPD-01', name: 'Priya Singh',    dept: 'OPD',  pss: 35, status: 'monitoring', priority: 'MEDIUM' },
  { id: 'OPD-02', name: 'Alok Mishra',    dept: 'OPD',  pss: 40, status: 'monitoring', priority: 'MEDIUM' },
  { id: 'OPD-03', name: 'Kavita Jain',    dept: 'OPD',  pss: 33, status: 'monitoring', priority: 'MEDIUM' },
  // OPD — Stable
  { id: 'OPD-04', name: 'Amit Rao',       dept: 'OPD',  pss: 15, status: 'stable',     priority: 'LOW'    },
  { id: 'OPD-05', name: 'Sheetal Ghosh',  dept: 'OPD',  pss: 10, status: 'stable',     priority: 'LOW'    },
  { id: 'OPD-06', name: 'Ramesh Patil',   dept: 'OPD',  pss: 8,  status: 'stable',     priority: 'LOW'    },
  { id: 'OPD-07', name: 'Divya Kumar',    dept: 'OPD',  pss: 20, status: 'stable',     priority: 'LOW'    },
  { id: 'OPD-08', name: 'Nitin Shah',     dept: 'OPD',  pss: 12, status: 'stable',     priority: 'LOW'    },
  { id: 'OPD-09', name: 'Geeta Pandey',   dept: 'OPD',  pss: 5,  status: 'stable',     priority: 'LOW'    },
  { id: 'OPD-10', name: 'Manoj Bajpai',   dept: 'OPD',  pss: 25, status: 'stable',     priority: 'LOW'    },
  // WARD — Monitoring
  { id: 'WARD-01',name: 'Sunita Patel',   dept: 'WARD', pss: 61, status: 'monitoring', priority: 'MEDIUM' },
  { id: 'WARD-02',name: 'Neha Kapoor',    dept: 'WARD', pss: 44, status: 'monitoring', priority: 'MEDIUM' },
  { id: 'WARD-03',name: 'Rohit Choudhary',dept: 'WARD', pss: 50, status: 'monitoring', priority: 'MEDIUM' },
  { id: 'WARD-04',name: 'Sneha Menon',    dept: 'WARD', pss: 38, status: 'monitoring', priority: 'MEDIUM' },
  { id: 'WARD-05',name: 'Vikram Singh',   dept: 'WARD', pss: 42, status: 'monitoring', priority: 'MEDIUM' },
  { id: 'WARD-06',name: 'Preeti Dubey',   dept: 'WARD', pss: 36, status: 'monitoring', priority: 'MEDIUM' },
  // WARD — Stable
  { id: 'WARD-07',name: 'Arun Shukla',    dept: 'WARD', pss: 27, status: 'stable',     priority: 'LOW'    },
  { id: 'WARD-08',name: 'Ritu Agarwal',   dept: 'WARD', pss: 19, status: 'stable',     priority: 'LOW'    },
  { id: 'WARD-09',name: 'Mohan Lal',      dept: 'WARD', pss: 14, status: 'stable',     priority: 'LOW'    },
  { id: 'WARD-10',name: 'Suman Trivedi',  dept: 'WARD', pss: 28, status: 'stable',     priority: 'LOW'    },
  { id: 'WARD-11',name: 'Pankaj Joshi',   dept: 'WARD', pss: 9,  status: 'stable',     priority: 'LOW'    },
  { id: 'WARD-12',name: 'Kamla Devi',     dept: 'WARD', pss: 23, status: 'stable',     priority: 'LOW'    },
];

/* ── Alert Data ────────────────────────────────────────── */
const alerts = [
  { pid: 'ICU-04', msg: 'Respiratory distress alert', time: 'Just now'  },
  { pid: 'ICU-07', msg: 'Cardiac rhythm anomaly',      time: '4 min ago' },
  { pid: 'ICU-02', msg: 'Cardiac rhythm anomaly',      time: '4 min ago' },
  { pid: 'ICU-11', msg: 'SpO2 critically low',          time: '1 min ago' },
];

let currentFilter = 'all';



/** Returns color hex based on PSS score */
function pssColor(pss) {
  if (pss <= 30) return '#16a34a';   // green  — stable
  if (pss <= 70) return '#d97706';   // yellow — monitoring
  return '#dc2626';                  // red    — critical
}


function rowClass(status) {
  const map = { critical: 'row-critical', monitoring: 'row-monitoring', stable: 'row-stable' };
  return map[status] || '';
}


function statusLabel(s) {
  const map = { critical: 'Critical', monitoring: 'Monitoring', stable: 'Stable' };
  return map[s] || s;
}

/* ── Render: Patient Table ───── */
function renderTable() {
  const search  = document.getElementById('searchInput').value.toLowerCase();
  const tbody   = document.getElementById('tableBody');

  // Apply department filter + search
  const filtered = patients.filter(p => {
    const matchDept   = currentFilter === 'all' || p.dept === currentFilter;
    const matchSearch = p.id.toLowerCase().includes(search)   ||
                        p.name.toLowerCase().includes(search)  ||
                        p.dept.toLowerCase().includes(search);
    return matchDept && matchSearch;
  });

  // Update subtitle
  document.getElementById('tableSubtitle').textContent =
    `Showing ${filtered.length} of ${patients.length} active patients`;

  // Build table rows
  tbody.innerHTML = filtered.map(p => {
    const col = pssColor(p.pss);
    return `
      <tr class="${rowClass(p.status)}">
        <td>
          <div class="pid-link">${p.id}</div>
          <div class="pid-name">${p.name}</div>
        </td>
        <td><span class="dept ${p.dept}">${p.dept}</span></td>
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
        <td><span class="pri ${p.priority}">${p.priority}</span></td>
      </tr>`;
  }).join('');
}

/* ── Render: Live Alerts ───────────────────────────────── */
function renderAlerts() {
  document.getElementById('alertsList').innerHTML = alerts.map(a => `
    <div class="alert-item">
      <div class="alert-tri">🔺</div>
      <div class="alert-body">
        <div class="alert-pid">${a.pid}</div>
        <div class="alert-msg">${a.msg}</div>
        <div class="alert-time">${a.time}</div>
      </div>
    </div>`).join('');
}

/* ── Render: Stats Cards ───────────────────────────────── */
function renderStats() {
  const crit = patients.filter(p => p.status === 'critical').length;
  const mon  = patients.filter(p => p.status === 'monitoring').length;
  const stab = patients.filter(p => p.status === 'stable').length;
  // Total is always the full array length — never hardcoded
  document.getElementById('sTotal').textContent      = patients.length;
  document.getElementById('sCritical').textContent   = crit;
  document.getElementById('sMonitoring').textContent = mon;
  document.getElementById('sStable').textContent     = stab;
}

/* ── Filter Button Handler ─── */
function setFilter(f, btn) {
  currentFilter = f;
  document.querySelectorAll('.f-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderTable();
}

/* ── Search Input Handler ───────── */
function applyFilters() {
  renderTable();
}

/* ── Refresh */
function refreshData(btn) {
  btn.classList.add('spinning');

  setTimeout(() => {
    // Randomly nudge PSS for ~35% of patients
    patients.forEach(p => {
      if (Math.random() < 0.35) {
        const delta = Math.round((Math.random() - 0.5) * 12);
        p.pss = Math.min(100, Math.max(0, p.pss + delta));

        // Re-derive status and priority from new PSS
        if (p.pss >= 71) {
          p.status   = 'critical';
          p.priority = 'HIGH';
        } else if (p.pss >= 31) {
          p.status   = 'monitoring';
          p.priority = p.pss > 60 ? 'HIGH' : 'MEDIUM';
        } else {
          p.status   = 'stable';
          p.priority = 'LOW';
        }
      }
    });

    renderStats();
    renderTable();
    btn.classList.remove('spinning');
  }, 600);
}

setInterval(() => {
  const btn = document.querySelector('.refresh-btn');
  if (btn) refreshData(btn);
}, 8000);


renderStats();   
renderTable();
renderAlerts();