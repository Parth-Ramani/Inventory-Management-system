// registration.js
document.addEventListener("DOMContentLoaded", function () {
  // If user is already logged in, redirect to index
  if (isLoggedIn()) {
    window.location.href = "index.html";
    return;
  }
});

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

  // Clear any existing data for new user
  localStorage.clear();

  // Save new user credentials
  localStorage.setItem("userEmail", email);
  localStorage.setItem("userPassword", password);
  localStorage.setItem("userName", name);

  alert("Registration successful! Please login.");
  window.location.href = "login.html";
}
