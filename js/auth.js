// auth.js - Common authentication utilities
function isLoggedIn() {
  return localStorage.getItem("isLoggedIn") === "true";
}

function checkAuthAndRedirect() {
  if (isLoggedIn()) {
    // If user is logged in, redirect to index.html
    window.location.href = "index.html";
  } else if (!localStorage.getItem("userEmail")) {
    // If no user is registered, redirect to registration
    window.location.href = "registration.html";
  } else {
    // If user exists but not logged in, redirect to login
    window.location.href = "login.html";
  }
}

// Make handleLogout globally available
window.handleLogout = function () {
  // Clear all authentication-related data
  localStorage.removeItem("isLoggedIn");
  // Redirect to login page
  window.location.href = "login.html";
};

// Add authentication check for protected pages
document.addEventListener("DOMContentLoaded", function () {
  // Get the current page name
  const currentPage = window.location.pathname.split("/").pop();

  // List of pages that require authentication
  const protectedPages = ["index.html", "dashboard.html", "sales.html"];

  // If this is a protected page and user is not logged in, redirect to login
  if (protectedPages.includes(currentPage) && !isLoggedIn()) {
    checkAuthAndRedirect();
  }
});
