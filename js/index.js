// index.js (for your main application page)
document.addEventListener("DOMContentLoaded", function () {
  // If user is not logged in, redirect to login
  if (!isLoggedIn()) {
    checkAuthAndRedirect();
    return;
  }

  // Initialize your application here
  const userName = localStorage.getItem("userName");
  if (userName) {
    document.getElementById(
      "welcomeMessage"
    ).textContent = `Welcome, ${userName}!`;
  }
});
