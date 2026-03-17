// Smooth scroll for buttons and nav links
function handleSmoothScroll(event) {
  const targetSelector = event.currentTarget.getAttribute("data-scroll-target");
  const href = event.currentTarget.getAttribute("href");
  const selector = targetSelector || (href && href.startsWith("#") ? href : null);
  if (!selector) return;

  const el = document.querySelector(selector);
  if (!el) return;

  event.preventDefault();
  const yOffset = -70;
  const y =
    el.getBoundingClientRect().top + window.pageYOffset + yOffset;

  window.scrollTo({ top: y, behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear().toString();
  }

  // Hero auto slider (10s) - minimal horizontal carousel
  const heroSliderTrack = document.getElementById("heroSliderTrack");
  const heroSlider = document.querySelector(".hero-slider");
  const prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (heroSliderTrack && heroSlider && !prefersReducedMotion) {
    const slideCount = 3;
    let currentIndex = 0;

    function renderHeroSlide() {
      const slideWidth = heroSlider.clientWidth;
      heroSliderTrack.style.transform = `translate3d(-${
        currentIndex * slideWidth
      }px, 0, 0)`;
    }

    renderHeroSlide();
    window.addEventListener("resize", renderHeroSlide, { passive: true });
    window.setInterval(() => {
      currentIndex = (currentIndex + 1) % slideCount;
      renderHeroSlide();
    }, 10000);
  }

  const header = document.querySelector(".main-header");
  const navLinks = document.querySelectorAll(".nav__link");
  const sections = Array.from(navLinks)
    .map((link) => {
      const id = link.getAttribute("href");
      return id && id.startsWith("#")
        ? document.querySelector(id)
        : null;
    })
    .filter(Boolean);

  // Sticky header shrink effect and active section highlighting
  function onScroll() {
    const scrollY = window.scrollY || window.pageYOffset;

    if (header) {
      header.style.boxShadow =
        scrollY > 8
          ? "0 1px 0 rgba(15, 23, 42, 0.08), 0 10px 30px rgba(15, 23, 42, 0.05)"
          : "0 1px 0 rgba(15, 23, 42, 0.06)";
      header.style.paddingBlock = scrollY > 8 ? "8px" : "14px";
    }

    let currentSectionId = null;
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 90 && rect.bottom >= 120) {
        currentSectionId = "#" + section.id;
      }
    });

    navLinks.forEach((link) => {
      if (link.getAttribute("href") === currentSectionId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Attach smooth scroll to nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", handleSmoothScroll);
  });

  // Attach smooth scroll to any element with data-scroll-target
  document.querySelectorAll("[data-scroll-target]").forEach((btn) => {
    btn.addEventListener("click", handleSmoothScroll);
  });

  // Mobile nav toggle
  const nav = document.getElementById("mainNav");
  const navToggle = document.querySelector(".nav-toggle");
  if (nav && navToggle) {
    navToggle.addEventListener("click", () => {
      nav.classList.toggle("nav--open");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("nav--open");
      });
    });
  }

  // Contact form (demo only)
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  if (contactForm && formMessage) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      formMessage.textContent =
        "Thank you. A Meditrack representative will reach out shortly.";
      formMessage.classList.remove("form-message--error");
      formMessage.classList.add("form-message--success");
      contactForm.reset();
    });
  }

  // Chatbot toggle
  const chatbotToggle = document.querySelector(".chatbot-toggle");
  const chatbotPanel = document.getElementById("chatbotPanel");
  const chatbotClose = document.querySelector(".chatbot-close");
  const chatbotBody = document.getElementById("chatbotBody");
  const chatbotForm = document.getElementById("chatbotForm");
  const chatbotInput = document.getElementById("chatbotInput");

  function openChatbot() {
    if (!chatbotPanel) return;
    chatbotPanel.classList.add("chatbot-panel--open");
    chatbotPanel.setAttribute("aria-hidden", "false");
    setTimeout(() => chatbotInput && chatbotInput.focus(), 50);
  }

  function closeChatbot() {
    if (!chatbotPanel) return;
    chatbotPanel.classList.remove("chatbot-panel--open");
    chatbotPanel.setAttribute("aria-hidden", "true");
  }

  if (chatbotToggle) chatbotToggle.addEventListener("click", openChatbot);
  if (chatbotClose) chatbotClose.addEventListener("click", closeChatbot);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeChatbot();
    }
  });

  // Simple keyword-based chatbot logic (non-clinical, informational only)
  const cannedResponses = [
    {
      keywords: ["temperature", "fever", "hot"],
      answer:
        "Temperature readings are one of the vitals Meditrack tracks continuously. A sustained deviation from your normal range can increase the suffering score so that staff review you sooner.",
    },
    {
      keywords: ["heart", "pulse", "bpm"],
      answer:
        "Heart rate (bpm) helps indicate how your body is responding to pain, stress or treatment. Sudden spikes or drops are highlighted to clinicians via alerts.",
    },
    {
      keywords: ["oxygen", "spo2", "breathing"],
      answer:
        "Oxygen saturation shows how well oxygen is reaching your blood. When levels start trending down, Meditrack raises the priority of that patient on the doctor dashboard.",
    },
    {
      keywords: ["waiting", "time", "queue"],
      answer:
        "Waiting time uses crowd and triage information to estimate when you may be seen. If your condition becomes more serious, your suffering score can move you ahead in the queue.",
    },
    {
      keywords: ["suffering", "score", "priority"],
      answer:
        "The suffering score is an internal indicator that combines vitals, pain markers and rules configured by your hospital. Higher scores mark you as higher priority for review.",
    },
    {
      keywords: ["emergency", "help", "danger"],
      answer:
        "If you feel you are in immediate danger, always use the physical emergency button or contact staff directly. The digital system is designed to support, not replace, emergency protocols.",
    },
  ];

  function getChatbotReply(message) {
    const text = message.toLowerCase();
    for (const rule of cannedResponses) {
      if (rule.keywords.some((kw) => text.includes(kw))) {
        return rule.answer;
      }
    }
    return "I can explain how readings, waiting time and priority work in this demo system, but I cannot provide a diagnosis. Try asking about temperature, heart rate, oxygen level, waiting time or suffering score.";
  }

  function appendMessage(content, from = "bot") {
    if (!chatbotBody) return;
    const bubble = document.createElement("div");
    bubble.className =
      "chatbot-message " +
      (from === "user" ? "chatbot-message--user" : "chatbot-message--bot");
    bubble.innerHTML = `<p>${content}</p>`;
    chatbotBody.appendChild(bubble);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
  }

  if (chatbotForm && chatbotInput) {
    chatbotForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = chatbotInput.value.trim();
      if (!text) return;
      appendMessage(text, "user");
      chatbotInput.value = "";

      setTimeout(() => {
        appendMessage(getChatbotReply(text), "bot");
      }, 400);
    });
  }
});

