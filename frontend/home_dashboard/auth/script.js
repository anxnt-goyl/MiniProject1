function register() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const msg = document.getElementById("regMsg");

    if (password !== confirmPassword) {
        msg.style.color = "red";
        msg.textContent = "Passwords do not match ❌";
        return;
    }

    // save all data
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    msg.style.color = "green";
    msg.textContent = "Registered successfully ✅";
}