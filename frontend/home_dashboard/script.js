// ── Year in footer ──
    document.getElementById("year").textContent = new Date().getFullYear();

    // ── Doctor data ──
    const doctors = {
      apollo:[
    {
            name: "Dr. Reddy",
            degree: "MBBS, MS",
            desc: "Surgeon",
            rating: "4.8 ⭐",
            status: "green"
        }
     ]
    };
async function loadHospitals() {
  const res = await fetch("/api/avg-density");
  const data = await res.json();

  const select = document.getElementById("hospitalSelect");
  select.innerHTML = `<option disabled selected>Select Your Hospital</option>`;

  data.forEach(h => {
    let level = "Low";

    if (h.totalPatients > 50) level = "High";
    else if (h.totalPatients > 20) level = "Medium";

    const option = document.createElement("option");

    option.value = h._id;
    option.textContent = `${h._id} (${level} crowd)`;
if (level === "High") option.style.color = "red";
if (level === "Medium") option.style.color = "orange";
if (level === "Low") option.style.color = "green";
    select.appendChild(option);
  });
}
loadHospitals();
setInterval(loadHospitals, 5000);
    // ── Team data ──
    const team = [
      { name: "Arpita Patra",    role: "Frontend Developer", initials: "AP" },
      { name: "Nitin Chaudhary", role: "Backend Developer",  initials: "NC" },
      { name: "Rohit Singh",     role: "Database Engineer",  initials: "RS" },
      { name: "Disha Chaudhary", role: "UI/UX Designer",     initials: "DC" },
      { name: "Anant Goyal",     role: "IoT Developer",      initials: "AG" },
    ];

    document.getElementById("teamGrid").innerHTML = team.map(m => `
      <div class="team-card">
        <div class="team-avatar">${m.initials}</div>
        <div class="team-name">${m.name}</div>
        <div class="team-role">${m.role}</div>
      </div>
    `).join("");

    // ── Contact form ──
    document.getElementById("contactForm").addEventListener("submit", function(e) {
      e.preventDefault();
      document.getElementById("form-msg").textContent = "✅ Thank you! A Meditrack representative will reach out shortly.";
      this.reset();
    });

    // ── Smooth scroll for nav links ──
    document.querySelectorAll("a[href^='#']").forEach(link => {
      link.addEventListener("click", function(e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: "smooth" }); }
      });
    });