 const patients = [
    { id:'ICU-04', name:'Arjun Mehta',   dept:'ICU',  pss:92, status:'critical',   priority:'HIGH'   },
    { id:'ICU-07', name:'Fatima Noor',   dept:'ICU',  pss:88, status:'critical',   priority:'HIGH'   },
    { id:'ER-11',  name:'Ravi Sharma',   dept:'ER',   pss:74, status:'monitoring', priority:'HIGH'   },
    { id:'OPD-21', name:'Priya Singh',   dept:'OPD',  pss:2,  status:'stable',     priority:'LOW'    },
    { id:'WARD-12',name:'Sunita Patel',  dept:'WARD', pss:61, status:'monitoring', priority:'MEDIUM' },
    { id:'ICU-02', name:'Karan Joshi',   dept:'ICU',  pss:95, status:'critical',   priority:'HIGH'   },
    { id:'ER-05',  name:'Meena Verma',   dept:'ER',   pss:68, status:'monitoring', priority:'MEDIUM' },
    { id:'OPD-09', name:'Amit Rao',      dept:'OPD',  pss:15, status:'stable',     priority:'LOW'    },
    { id:'WARD-07',name:'Neha Kapoor',   dept:'WARD', pss:44, status:'monitoring', priority:'MEDIUM' },
    { id:'ICU-11', name:'Suresh Gupta',  dept:'ICU',  pss:90, status:'critical',   priority:'HIGH'   },
    
  ];

  const alerts = [
    { pid:'ICU-04', msg:'Respiratory distress alert',  time:'Just now'  },
    { pid:'ICU-07', msg:'Cardiac rhythm anomaly',       time:'4 min ago' },
    { pid:'ICU-02', msg:'Cardiac rhythm anomaly',       time:'4 min ago' },
    { pid:'ICU-11', msg:'SpO2 critically low',          time:'1 min ago' },
  ];

  /* ── Helpers ──────────────────────────────────────────────── */
  function pssColor(pss) {
    if (pss <= 30) return '#16a34a';
    if (pss <= 70) return '#d97706';
    return '#dc2626';
  }

  function rowClass(status) {
    return { critical:'row-critical', monitoring:'row-monitoring', stable:'row-stable' }[status] || '';
  }

  function statusLabel(s) {
    return { critical:'Critical', monitoring:'Monitoring', stable:'Stable' }[s] || s;
  }

  /* ── Render Table ─────────────────────────────────────────── */
  let currentFilter = 'all';

  function renderTable() {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const tbody  = document.getElementById('tableBody');
    const filtered = patients.filter(p => {
      const matchDept = currentFilter === 'all' || p.dept === currentFilter;
      const matchSearch = p.id.toLowerCase().includes(search) ||
                          p.name.toLowerCase().includes(search) ||
                          p.dept.toLowerCase().includes(search);
      return matchDept && matchSearch;
    });

    document.getElementById('tableSubtitle').textContent =
      `Showing ${filtered.length} of ${patients.length} active patients`;

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
                <div class="pss-bar-fill" style="width:${p.pss}%;background:${col}"></div>
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

  /* ── Render Alerts ────────────────────────────────────────── */
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

  /* ── Filter / Search ──────────────────────────────────────── */
  function setFilter(f, btn) {
    currentFilter = f;
    document.querySelectorAll('.f-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderTable();
  }
  function applyFilters() { renderTable(); }

  /* ── Refresh button (simulates live update) ───────────────── */
  function refreshData(btn) {
    btn.classList.add('spinning');
    setTimeout(() => {
      // Random walk PSS for 2 patients
      patients.forEach(p => {
        if (Math.random() < .35) {
          const delta = Math.round((Math.random()-.5)*12);
          p.pss = Math.min(100, Math.max(0, p.pss + delta));
          // re-derive status
          if (p.pss >= 71) { p.status='critical'; p.priority='HIGH'; }
          else if (p.pss >= 31) { p.status='monitoring'; p.priority = p.pss>60?'HIGH':'MEDIUM'; }
          else { p.status='stable'; p.priority='LOW'; }
        }
      });
      // Update stats
      const crit = patients.filter(p=>p.status==='critical').length;
      const mon  = patients.filter(p=>p.status==='monitoring').length;
      const stab = patients.filter(p=>p.status==='stable').length;
      document.getElementById('sCritical').textContent  = crit;
      document.getElementById('sMonitoring').textContent = mon;
      document.getElementById('sStable').textContent    = stab;

      renderTable();
      btn.classList.remove('spinning');
    }, 600);
  }

  /* ── Auto-refresh every 8s ────────────────────────────────── */
  setInterval(() => {
    const btn = document.querySelector('.refresh-btn');
    if (btn) refreshData(btn);
  }, 8000);

  /* ── Init ─────────────────────────────────────────────────── */
  renderTable();
  renderAlerts();