// if (document.referrer === "") {
//   window.location.href = "registration.html";
// }
// function handleLogin(event) {
//   event.preventDefault();
//   const email = document.getElementById("loginEmail").value;
//   const password = document.getElementById("loginPassword").value;
//   const storedEmail = localStorage.getItem("userEmail");
//   const storedPassword = localStorage.getItem("userPassword");

//   if (email === storedEmail && password === storedPassword) {
//     localStorage.setItem("isLoggedIn", true);
//     alert("Login successful!");
//     window.location.href = "index.html"; // Redirects to the home page after login
//   } else {
//     alert("Invalid email or password.");
//   }
// }

// function handleLogout() {
//   localStorage.removeItem("isLoggedIn"); // Clear login status
//   window.location.href = "login.html"; // Redirect to the login page
// }

// login.js
document.addEventListener("DOMContentLoaded", function () {
  // If user is already logged in, redirect to index
  if (isLoggedIn()) {
    window.location.href = "index.html";
    return;
  }

  // If no user is registered, redirect to registration
  if (!localStorage.getItem("userEmail")) {
    window.location.href = "registration.html";
    return;
  }
});

function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const storedEmail = localStorage.getItem("userEmail");
  const storedPassword = localStorage.getItem("userPassword");

  if (email === storedEmail && password === storedPassword) {
    localStorage.setItem("isLoggedIn", "true");
    alert("Login successful!");
    window.location.href = "index.html";
  } else {
    alert("Invalid email or password.");
  }
}

function handleLogout() {
  // Only clear login status, keep user data
  localStorage.removeItem("isLoggedIn");
  window.location.href = "login.html";
}
