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

function showDoctors() {
    const hospital = document.getElementById("hospitalSelect").value;
    const container = document.getElementById("doctorContainer");

    container.innerHTML = "";

    if (!doctors[hospital]) return;

    doctors[hospital].forEach(doc => {
        container.innerHTML += `
            <div class="card">
                <h3>
                    ${doc.name}
                    <span class="status ${doc.status}"></span>
                </h3>
                <p>${doc.degree}</p>
                <p>${doc.desc}</p>
                <p>${doc.rating}</p>
            </div>
        `;
    });
}

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