function setStatus(el, message, type) {
  if (!el) return;
  el.textContent = message || "";
  el.classList.remove("status--success", "status--error");
  if (type === "success") el.classList.add("status--success");
  if (type === "error") el.classList.add("status--error");
}

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

document.addEventListener("DOMContentLoaded", () => {
  const sendBtn = document.querySelector("[data-otp-send]");
  const verifyBtn = document.querySelector("[data-otp-verify]");
  const otpInput = document.querySelector("[data-otp-input]");
  const phoneInput = document.querySelector("[data-phone-input]");
  const statusEl = document.querySelector("[data-otp-status]");
  const verifiedEl = document.querySelector("[data-phone-verified]");

  if (!sendBtn || !verifyBtn || !otpInput || !phoneInput || !statusEl) return;

  let generatedOtp = null;
  let isVerified = false;

  function updateVerifiedUi() {
    if (verifiedEl) {
      verifiedEl.value = isVerified ? "verified" : "";
    }
    verifyBtn.disabled = !generatedOtp || isVerified;
  }

  updateVerifiedUi();

  sendBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const phone = (phoneInput.value || "").trim();
    if (!phone) {
      setStatus(statusEl, "Please enter your phone number first.", "error");
      return;
    }

    generatedOtp = generateOtp();
    isVerified = false;
    otpInput.value = "";
    setStatus(statusEl, "OTP sent to your phone. (Demo OTP: " + generatedOtp + ")", "success");
    updateVerifiedUi();
    otpInput.focus();
  });

  verifyBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!generatedOtp) {
      setStatus(statusEl, "Please send OTP first.", "error");
      return;
    }

    const entered = (otpInput.value || "").trim();
    if (entered === generatedOtp) {
      isVerified = true;
      setStatus(statusEl, "Phone number verified.", "success");
      updateVerifiedUi();
      return;
    }
    setStatus(statusEl, "Invalid OTP. Please try again.", "error");
  });

  // If user edits phone again, verification resets
  phoneInput.addEventListener("input", () => {
    if (!generatedOtp && !isVerified) return;
    generatedOtp = null;
    isVerified = false;
    setStatus(statusEl, "", null);
    updateVerifiedUi();
  });
});

