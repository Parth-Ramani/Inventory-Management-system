// if (document.referrer === "") {
//   window.location.href = "authentication.html";
// }
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("isRegistered")) {
    showLogin();
  } else {
    showRegistration();
  }

  if (localStorage.getItem("isLoggedIn")) {
    showHomePage();
  }
});

function showLogin() {
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("registrationForm").style.display = "none";
  document.getElementById("homePage").style.display = "none";
}

function showRegistration() {
  document.getElementById("registrationForm").style.display = "block";
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("homePage").style.display = "none";
}

function showHomePage() {
  document.getElementById("homePage").style.display = "block";
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("registrationForm").style.display = "none";
  window.location.href = "index.html"; // Redirects to index.html
}

function handleRegistration(event) {
  event.preventDefault();
  const name = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;
  const confirmPassword = document.getElementById("regConfirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return false;
  }

  localStorage.setItem("isRegistered", true);
  localStorage.setItem("userEmail", email);
  localStorage.setItem("userPassword", password);

  alert("Registration successful! Please login.");
  showLogin();
}

function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const storedEmail = localStorage.getItem("userEmail");
  const storedPassword = localStorage.getItem("userPassword");

  if (email === storedEmail && password === storedPassword) {
    localStorage.setItem("isLoggedIn", true);
    alert("Login successful!");
    window.location.href = "index.html"; // Redirects to index.html
  } else {
    alert("Invalid email or password.");
  }
}

function handleLogout() {
  localStorage.removeItem("isLoggedIn"); // Clear login status
  window.location.href = "authentication.html"; // Redirect to the login page
}
