// // Smooth scroll for buttons and nav links
// function handleSmoothScroll(event) {
//   const targetSelector = event.currentTarget.getAttribute("data-scroll-target");
//   const href = event.currentTarget.getAttribute("href");
//   const selector = targetSelector || (href && href.startsWith("#") ? href : null);
//   if (!selector) return;

//   const el = document.querySelector(selector);
//   if (!el) return;

//   event.preventDefault();
//   const yOffset = -70;
//   const y =
//     el.getBoundingClientRect().top + window.pageYOffset + yOffset;

//   window.scrollTo({ top: y, behavior: "smooth" });
// }

// document.addEventListener("DOMContentLoaded", () => {
//   const yearSpan = document.getElementById("year");
//   if (yearSpan) {
//     yearSpan.textContent = new Date().getFullYear().toString();
//   }

//   // Hero auto slider (10s) - minimal horizontal carousel
//   const heroSliderTrack = document.getElementById("heroSliderTrack");
//   const heroSlider = document.querySelector(".hero-slider");
//   const prefersReducedMotion =
//     window.matchMedia &&
//     window.matchMedia("(prefers-reduced-motion: reduce)").matches;

//   if (heroSliderTrack && heroSlider && !prefersReducedMotion) {
//     const slideCount = 3;
//     let currentIndex = 0;

//     function renderHeroSlide() {
//       const slideWidth = heroSlider.clientWidth;
//       heroSliderTrack.style.transform = `translate3d(-${
//         currentIndex * slideWidth
//       }px, 0, 0)`;
//     }

//     renderHeroSlide();
//     window.addEventListener("resize", renderHeroSlide, { passive: true });
//     window.setInterval(() => {
//       currentIndex = (currentIndex + 1) % slideCount;
//       renderHeroSlide();
//     }, 10000);
//   }

//   const header = document.querySelector(".main-header");
//   const navLinks = document.querySelectorAll(".nav__link");
//   const sections = Array.from(navLinks)
//     .map((link) => {
//       const id = link.getAttribute("href");
//       return id && id.startsWith("#")
//         ? document.querySelector(id)
//         : null;
//     })
//     .filter(Boolean);

//   // Sticky header shrink effect and active section highlighting
//   function onScroll() {
//     const scrollY = window.scrollY || window.pageYOffset;

//     if (header) {
//       header.style.boxShadow =
//         scrollY > 8
//           ? "0 1px 0 rgba(15, 23, 42, 0.08), 0 10px 30px rgba(15, 23, 42, 0.05)"
//           : "0 1px 0 rgba(15, 23, 42, 0.06)";
//       header.style.paddingBlock = scrollY > 8 ? "8px" : "14px";
//     }

//     let currentSectionId = null;
//     sections.forEach((section) => {
//       const rect = section.getBoundingClientRect();
//       if (rect.top <= 90 && rect.bottom >= 120) {
//         currentSectionId = "#" + section.id;
//       }
//     });

//     navLinks.forEach((link) => {
//       if (link.getAttribute("href") === currentSectionId) {
//         link.classList.add("active");
//       } else {
//         link.classList.remove("active");
//       }
//     });
//   }

//   window.addEventListener("scroll", onScroll, { passive: true });
//   onScroll();

//   // Attach smooth scroll to nav links
//   navLinks.forEach((link) => {
//     link.addEventListener("click", handleSmoothScroll);
//   });

//   // Attach smooth scroll to any element with data-scroll-target
//   document.querySelectorAll("[data-scroll-target]").forEach((btn) => {
//     btn.addEventListener("click", handleSmoothScroll);
//   });

//   // Mobile nav toggle
//   const nav = document.getElementById("mainNav");
//   const navToggle = document.querySelector(".nav-toggle");
//   if (nav && navToggle) {
//     navToggle.addEventListener("click", () => {
//       nav.classList.toggle("nav--open");
//     });

//     navLinks.forEach((link) => {
//       link.addEventListener("click", () => {
//         nav.classList.remove("nav--open");
//       });
//     });
//   }

//   // Contact form (demo only)
//   const contactForm = document.getElementById("contactForm");
//   const formMessage = document.getElementById("formMessage");

//   if (contactForm && formMessage) {
//     contactForm.addEventListener("submit", (e) => {
//       e.preventDefault();
//       formMessage.textContent =
//         "Thank you. A Meditrack representative will reach out shortly.";
//       formMessage.classList.remove("form-message--error");
//       formMessage.classList.add("form-message--success");
//       contactForm.reset();
//     });
//   }

//   // Find Your Doctor: dynamic cards + specialization filtering
//   const doctorCardsEl = document.getElementById("doctorCards");
//   const doctorEmptyStateEl = document.getElementById("doctorEmptyState");
//   const doctorFilterButtons = Array.from(
//     document.querySelectorAll(".filter-btn[data-doctor-filter]")
//   );

//   const teamCardsEl = document.getElementById("teamCards");

//   function getInitials(name) {
//     const parts = String(name)
//       .trim()
//       .split(/\s+/)
//       .filter(Boolean);
//     const first = parts[0] || "";
//     const last = parts[parts.length - 1] || "";
//     const initials = (first[0] || "") + (last[0] || "");
//     return initials.toUpperCase();
//   }

//   function makeAvatarDataUri(initials, bgHex, accentHex) {
//     // Lightweight inline SVG avatar to avoid needing local image assets.
//     const safeInitials = String(initials).replace(/[^A-Z0-9]/gi, "");
//     const bg = bgHex || "#005249";
//     const accent = accentHex || "#1bb3f2";

//     const svg = `
//       <svg xmlns="http://www.w3.org/2000/svg" width="220" height="220" viewBox="0 0 220 220">
//         <defs>
//           <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
//             <stop offset="0%" stop-color="${bg}"/>
//             <stop offset="100%" stop-color="${accent}"/>
//           </linearGradient>
//         </defs>
//         <circle cx="110" cy="110" r="110" fill="url(#g)"/>
//         <circle cx="110" cy="110" r="108" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="2"/>
//         <text x="50%" y="54%" text-anchor="middle" font-family="Inter, Arial, sans-serif"
//               font-size="64" font-weight="800" fill="#ffffff" letter-spacing="0.04em">${safeInitials}</text>
//       </svg>
//     `.trim();

//     return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
//   }

//   function createDoctorCard(doctor) {
//     const card = document.createElement("article");
//     card.className = "doctor-card";
//     card.dataset.doctorCard = "true";
//     card.dataset.specialization = doctor.specialization;

//     const header = document.createElement("div");
//     header.className = "doctor-card__header";

//     const avatarWrap = document.createElement("div");
//     avatarWrap.className = "doctor-card__avatar";

//     const img = document.createElement("img");
//     img.src = doctor.imageSrc;
//     img.alt = `${doctor.name} profile picture`;
//     avatarWrap.appendChild(img);

//     const nameWrap = document.createElement("div");

//     const nameEl = document.createElement("h3");
//     nameEl.className = "doctor-card__name";
//     nameEl.textContent = doctor.name;

//     const specEl = document.createElement("p");
//     specEl.className = "doctor-card__specialization";
//     specEl.textContent = doctor.specialization;

//     nameWrap.appendChild(nameEl);
//     nameWrap.appendChild(specEl);

//     header.appendChild(avatarWrap);
//     header.appendChild(nameWrap);

//     const desc = document.createElement("p");
//     desc.className = "doctor-card__description";
//     desc.textContent = doctor.shortDescription;

//     const hospitalRow = document.createElement("div");
//     hospitalRow.className = "doctor-card__hospital-row";

//     const hospitalLabel = document.createElement("span");
//     hospitalLabel.className = "doctor-card__hospital-label";
//     hospitalLabel.textContent = "Hospital";

//     const hospitalName = document.createElement("span");
//     hospitalName.className = "doctor-card__hospital-name";
//     hospitalName.textContent = doctor.hospitalName;

//     hospitalRow.appendChild(hospitalLabel);
//     hospitalRow.appendChild(hospitalName);

//     const contactBtn = document.createElement("button");
//     contactBtn.type = "button";
//     contactBtn.className = "btn btn-primary btn-doctor-contact";
//     contactBtn.dataset.scrollTarget = "#contact";
//     contactBtn.textContent = "Contact";

//     card.appendChild(header);
//     card.appendChild(desc);
//     card.appendChild(hospitalRow);
//     card.appendChild(contactBtn);

//     return card;
//   }

//   function renderDoctorsAndTeam() {
//     if (doctorCardsEl) {
//       const doctors = [
//         {
//           name: "Dr. Anjali Sharma",
//           specialization: "Gynecologist",
//           shortDescription:
//             "10+ years experience in women's health. Patient-first care for every stage of life.",
//           hospitalName: "Sanjeevani Women's Clinic",
//           imageSrc: makeAvatarDataUri("AS", "#005249", "#1bb3f2"),
//         },
//         {
//           name: "Dr. Raj Verma",
//           specialization: "Cardiologist",
//           shortDescription:
//             "Heart specialist focused on prevention, diagnosis, and treatment for cardiovascular conditions.",
//           hospitalName: "Apollo Heart Care Center",
//           imageSrc: makeAvatarDataUri("RV", "#005249", "#60a5fa"),
//         },
//         {
//           name: "Dr. Neha Singh",
//           specialization: "Neurologist",
//           shortDescription:
//             "Brain and nerve expert offering guidance for neurological health and everyday wellbeing.",
//           hospitalName: "Meditrack NeuroHealth",
//           imageSrc: makeAvatarDataUri("NS", "#005249", "#38bdf8"),
//         },
//         {
//           name: "Dr. Amit Patel",
//           specialization: "Gastroenterologist",
//           shortDescription:
//             "Digestive system expert with a clear, practical approach to digestive health concerns.",
//           hospitalName: "GastroPrime Hospitals",
//           imageSrc: makeAvatarDataUri("AP", "#005249", "#22c55e"),
//         },
//         {
//           name: "Dr. Karan Mehta",
//           specialization: "Orthopedic",
//           shortDescription:
//             "Bone specialist for joints and mobility, from injury care to rehabilitation support.",
//           hospitalName: "OrthoCare Multi-Specialty",
//           imageSrc: makeAvatarDataUri("KM", "#005249", "#f59e0b"),
//         },
//       ];

//       doctorCardsEl.innerHTML = "";
//       doctors.forEach((doctor) => {
//         doctorCardsEl.appendChild(createDoctorCard(doctor));
//       });

//       // Initial state: show all doctors; empty state should remain hidden.
//       if (doctorEmptyStateEl) doctorEmptyStateEl.hidden = true;

//       // Ensure smooth scroll works for the dynamically created contact buttons.
//       doctorCardsEl
//         .querySelectorAll("[data-scroll-target]")
//         .forEach((btn) => btn.addEventListener("click", handleSmoothScroll));
//     }

//     if (teamCardsEl) {
//       const team = [
//         { name: "Arpita Patra", role: "Frontend Developer", seed: "#005249" },
//         { name: "Nitin Chaudhary", role: "Backend Developer", seed: "#0b73e0" },
//         { name: "Rohit Singh", role: "Database Engineer", seed: "#1bb3f2" },
//         { name: "Disha Chaudhary", role: "UI/UX Designer", seed: "#005249" },
//         { name: "Anant Goyal", role: "IOT Developer", seed: "#1bb3f2" },
//       ];

//       teamCardsEl.innerHTML = "";
//       team.forEach((member, idx) => {
//         const card = document.createElement("article");
//         card.className = "team-card";

//         const initials = getInitials(member.name);
//         const accentHex =
//           idx % 2 === 0 ? "#1bb3f2" : idx % 3 === 0 ? "#60a5fa" : "#22c55e";
//         const imgSrc = makeAvatarDataUri(initials, member.seed, accentHex);

//         const avatar = document.createElement("div");
//         avatar.className = "team-avatar";

//         const img = document.createElement("img");
//         img.src = imgSrc;
//         img.alt = `${member.name} profile picture`;
//         avatar.appendChild(img);

//         const nameEl = document.createElement("h3");
//         nameEl.className = "team-name";
//         nameEl.textContent = member.name;

//         const roleEl = document.createElement("p");
//         roleEl.className = "team-role";
//         roleEl.textContent = member.role;

//         card.appendChild(avatar);
//         card.appendChild(nameEl);
//         card.appendChild(roleEl);

//         teamCardsEl.appendChild(card);
//       });
//     }
//   }

//   function applyDoctorFilter(specialization) {
//     if (!doctorCardsEl || !doctorEmptyStateEl) return;

//     const cards = Array.from(
//       doctorCardsEl.querySelectorAll("[data-doctor-card]")
//     );

//     let visibleCount = 0;
//     cards.forEach((card) => {
//       const match = card.dataset.specialization === specialization;
//       card.hidden = !match;
//       if (match) visibleCount += 1;
//     });

//     doctorEmptyStateEl.hidden = visibleCount !== 0;
//   }

//   renderDoctorsAndTeam();

//   // Wire up filter buttons (click = show matching cards only)
//   doctorFilterButtons.forEach((btn) => {
//     btn.addEventListener("click", () => {
//       doctorFilterButtons.forEach((b) =>
//         b.classList.remove("filter-btn--active")
//       );
//       btn.classList.add("filter-btn--active");
//       applyDoctorFilter(btn.dataset.doctorFilter);
//     });
//   });

//   // Chatbot toggle
//   const chatbotToggle = document.querySelector(".chatbot-toggle");
//   const chatbotPanel = document.getElementById("chatbotPanel");
//   const chatbotClose = document.querySelector(".chatbot-close");
//   const chatbotBody = document.getElementById("chatbotBody");
//   const chatbotForm = document.getElementById("chatbotForm");
//   const chatbotInput = document.getElementById("chatbotInput");

//   function openChatbot() {
//     if (!chatbotPanel) return;
//     chatbotPanel.classList.add("chatbot-panel--open");
//     chatbotPanel.setAttribute("aria-hidden", "false");
//     setTimeout(() => chatbotInput && chatbotInput.focus(), 50);
//   }

//   function closeChatbot() {
//     if (!chatbotPanel) return;
//     chatbotPanel.classList.remove("chatbot-panel--open");
//     chatbotPanel.setAttribute("aria-hidden", "true");
//   }

//   if (chatbotToggle) chatbotToggle.addEventListener("click", openChatbot);
//   if (chatbotClose) chatbotClose.addEventListener("click", closeChatbot);

//   document.addEventListener("keydown", (e) => {
//     if (e.key === "Escape") {
//       closeChatbot();
//     }
//   });

//   // Simple keyword-based chatbot logic (non-clinical, informational only)
//   const cannedResponses = [
//     {
//       keywords: ["temperature", "fever", "hot"],
//       answer:
//         "Temperature readings are one of the vitals Meditrack tracks continuously. A sustained deviation from your normal range can increase the suffering score so that staff review you sooner.",
//     },
//     {
//       keywords: ["heart", "pulse", "bpm"],
//       answer:
//         "Heart rate (bpm) helps indicate how your body is responding to pain, stress or treatment. Sudden spikes or drops are highlighted to clinicians via alerts.",
//     },
//     {
//       keywords: ["oxygen", "spo2", "breathing"],
//       answer:
//         "Oxygen saturation shows how well oxygen is reaching your blood. When levels start trending down, Meditrack raises the priority of that patient on the doctor dashboard.",
//     },
//     {
//       keywords: ["waiting", "time", "queue"],
//       answer:
//         "Waiting time uses crowd and triage information to estimate when you may be seen. If your condition becomes more serious, your suffering score can move you ahead in the queue.",
//     },
//     {
//       keywords: ["suffering", "score", "priority"],
//       answer:
//         "The suffering score is an internal indicator that combines vitals, pain markers and rules configured by your hospital. Higher scores mark you as higher priority for review.",
//     },
//     {
//       keywords: ["emergency", "help", "danger"],
//       answer:
//         "If you feel you are in immediate danger, always use the physical emergency button or contact staff directly. The digital system is designed to support, not replace, emergency protocols.",
//     },
//   ];

//   function getChatbotReply(message) {
//     const text = message.toLowerCase();
//     for (const rule of cannedResponses) {
//       if (rule.keywords.some((kw) => text.includes(kw))) {
//         return rule.answer;
//       }
//     }
//     return "I can explain how readings, waiting time and priority work in this demo system, but I cannot provide a diagnosis. Try asking about temperature, heart rate, oxygen level, waiting time or suffering score.";
//   }

//   function appendMessage(content, from = "bot") {
//     if (!chatbotBody) return;
//     const bubble = document.createElement("div");
//     bubble.className =
//       "chatbot-message " +
//       (from === "user" ? "chatbot-message--user" : "chatbot-message--bot");
//     bubble.innerHTML = `<p>${content}</p>`;
//     chatbotBody.appendChild(bubble);
//     chatbotBody.scrollTop = chatbotBody.scrollHeight;
//   }

//   if (chatbotForm && chatbotInput) {
//     chatbotForm.addEventListener("submit", (e) => {
//       e.preventDefault();
//       const text = chatbotInput.value.trim();
//       if (!text) return;
//       appendMessage(text, "user");
//       chatbotInput.value = "";

//       setTimeout(() => {
//         appendMessage(getChatbotReply(text), "bot");
//       }, 400);
//     });
//   }
// });

