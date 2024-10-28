if (document.referrer === "") {
  window.location.href = "registration.html";
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
    window.location.href = "index.html"; // Redirects to the home page after login
  } else {
    alert("Invalid email or password.");
  }
}

function handleLogout() {
  localStorage.removeItem("isLoggedIn"); // Clear login status
  window.location.href = "login.html"; // Redirect to the login page
}
