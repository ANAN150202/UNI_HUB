const roleSelect = document.getElementById("roleSelect");
const authSection = document.getElementById("authSection");
const selectedRoleText = document.getElementById("selectedRoleText");

const roleButtons = document.querySelectorAll(".roleBtn");
const backBtn = document.getElementById("backBtn");

const tabLogin = document.getElementById("tabLogin");
const tabSignup = document.getElementById("tabSignup");

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const msg = document.getElementById("msg");

let selectedRole = null;

function setMessage(text, ok = true){
  msg.textContent = text;
  msg.style.color = ok ? "#a7f3d0" : "#fecaca";
}

// role selection
roleButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    selectedRole = btn.dataset.role;
    selectedRoleText.textContent = `Role: ${selectedRole}`;
    roleSelect.classList.add("hidden");
    authSection.classList.remove("hidden");
    setMessage("");
  });
});

// back to role selection
backBtn.addEventListener("click", () => {
  authSection.classList.add("hidden");
  roleSelect.classList.remove("hidden");
  setMessage("");
});

// tabs
tabLogin.addEventListener("click", () => {
  tabLogin.classList.add("active");
  tabSignup.classList.remove("active");
  loginForm.classList.remove("hidden");
  signupForm.classList.add("hidden");
  setMessage("");
});

tabSignup.addEventListener("click", () => {
  tabSignup.classList.add("active");
  tabLogin.classList.remove("active");
  signupForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
  setMessage("");
});

// demo submit
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  setMessage(`✅ Demo login successful as ${selectedRole}. Next: real database login.`);
});

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  setMessage(`✅ Demo signup saved for ${selectedRole}. Next: store in database.`);
});
