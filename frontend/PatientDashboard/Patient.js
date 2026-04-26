const realInput       = document.getElementById('real-file-input');
const fileNameDisplay = document.getElementById('file-name-display');
const uploadArea      = document.getElementById('upload-area');
const uploadBtn       = document.getElementById('upload-btn');
const popupOverlay    = document.getElementById('popup-overlay');
const popupClose      = document.getElementById('popup-close');


realInput.addEventListener('change', () => {
  const file = realInput.files[0];
  fileNameDisplay.textContent = file ? file.name : 'No file selected';
  if (file) {
    uploadArea.style.borderColor = 'var(--blue-3)';
    uploadBtn.disabled = false;
    uploadBtn.textContent = 'Upload Document';
  } else {
    uploadBtn.disabled = true;
  }
});

// Drag-and-drop support
uploadArea.addEventListener('dragover', e => {
  e.preventDefault();
  uploadArea.style.borderColor = 'var(--blue-3)';
});
uploadArea.addEventListener('dragleave', () => {
  uploadArea.style.borderColor = '';
});
uploadArea.addEventListener('drop', e => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file) {
    fileNameDisplay.textContent = file.name;
    uploadArea.style.borderColor = 'var(--blue-3)';
    uploadBtn.disabled = false;
  }
});
//waiting time
async function loadWaitingTime() {
  const res = await fetch(`/patient/waiting/${hospitalName}/${pemail}`);
  const data = await res.json();
  // console.log("WAIT DATA:", data);

  document.getElementById("waitingTime").textContent = data.waitingTime;
  document.getElementById("wait-bar").style.width = data.waitingTime + "%";
}
loadWaitingTime();  
setInterval(loadWaitingTime, 5000);
//pss
async function startMonitoring() {
  console.log("Clicked"); 

  const temp = document.getElementById("temp").value;
  const hr = document.getElementById("hr").value;
  const bp = document.getElementById("bp").value;

  if (isNaN(temp) || isNaN(hr) || !bp) {
    alert("Enter valid data");
    return;
}


  const res = await fetch("/calculate-pss", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ temp, hr, bp })
  });

  const data = await res.json();

  document.getElementById("pss").textContent = data.pss;
  // console.log("Patient Name:", patientName);

  await fetch("/api/pss", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ptemail : pemail,
      pss: data.pss,
      status: "Monitoring"
    })
  });
};
uploadBtn.addEventListener('click', () => {
  popupOverlay.classList.add('active');
});


popupClose.addEventListener('click', () => {
  popupOverlay.classList.remove('active');
  uploadBtn.disabled = true;
  uploadBtn.textContent = 'Uploaded ';
});

// Close popup on overlay click
popupOverlay.addEventListener('click', (e) => {
  if (e.target === popupOverlay) {
    popupOverlay.classList.remove('active');
    uploadBtn.disabled = true;
    uploadBtn.textContent = 'Uploaded';
  }
});



// ── COUNTDOWN TIMER ───────────────────────────────
let totalSec = 6 * 60 + 35;
const cdEl    = document.getElementById('countdown');
const barEl   = document.getElementById('wait-bar');
const fullSec = totalSec;

// setInterval(() => {
//   if (totalSec <= 0) return;
//   totalSec--;
//   const m = String(Math.floor(totalSec / 60)).padStart(2, '0');
//   const s = String(totalSec % 60).padStart(2, '0');
//   cdEl.textContent = `${m}:${s}`;
//   const pct = ((fullSec - totalSec) / fullSec) * 100;
//   barEl.style.width = Math.min(pct, 100) + '%';
// }, 1000);
