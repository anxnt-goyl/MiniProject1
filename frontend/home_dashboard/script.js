// ── Year in footer ──
    document.getElementById("year").textContent = new Date().getFullYear();

    // ── Doctor data ──
    const doctors = [
      { name: "Dr. Anjali Sharma",  initials: "AS", spec: "Gynecologist",       desc: "10+ years in women's health. Patient-first care for every stage of life.", hospital: "Sanjeevani Women's Clinic" },
      { name: "Dr. Raj Verma",      initials: "RV", spec: "Cardiologist",        desc: "Heart specialist focused on prevention, diagnosis and cardiovascular care.", hospital: "Apollo Heart Care Center" },
      { name: "Dr. Neha Singh",     initials: "NS", spec: "Neurologist",         desc: "Brain and nerve expert offering guidance for neurological health.", hospital: "Meditrack NeuroHealth" },
      { name: "Dr. Amit Patel",     initials: "AP", spec: "Gastroenterologist",  desc: "Digestive system expert with a practical approach to gut health.", hospital: "GastroPrime Hospitals" },
      { name: "Dr. Karan Mehta",    initials: "KM", spec: "Orthopedic",          desc: "Bone and joint specialist — from injury care to rehabilitation.", hospital: "OrthoCare Multi-Specialty" },
    ];

    function renderDoctors(filter) {
      const grid = document.getElementById("doctorGrid");
      const list = filter === "all" ? doctors : doctors.filter(d => d.spec === filter);
      grid.innerHTML = list.map(d => `
        <div class="doctor-card">
          <div class="doc-head">
            <div class="avatar">${d.initials}</div>
            <div>
              <div class="doc-name">${d.name}</div>
              <div class="doc-spec">${d.spec}</div>
            </div>
          </div>
          <p class="doc-desc">${d.desc}</p>
          <p class="doc-hospital">Hospital: <strong>${d.hospital}</strong></p>
          <a href="#contact"><button class="btn btn-blue btn-full" style="border-radius:8px;padding:8px;">Contact</button></a>
        </div>
      `).join("");
    }

    renderDoctors("all");

    // Filter buttons
    document.getElementById("filterWrap").addEventListener("click", function(e) {
      if (!e.target.classList.contains("filter-btn")) return;
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");
      renderDoctors(e.target.dataset.spec);
    });

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