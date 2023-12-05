// Open the User Login modal

function openUserModal() {
  console.log("Opened User Login");
  const userModalShow = document.getElementById("userModal");
  userModalShow.classList.add("show"); // Add the 'show' class
  userModalShow.style.display = "block"; // Show the modal
}
// Close the User login modal
// Vent, indtil DOM'en er fuldt indlæst
document.addEventListener("DOMContentLoaded", function () {
  // Tilknyt hændelseslytteren efter DOM-indlæsning
  document.getElementById("closeUser").addEventListener("click", function closeUser() {
    document.getElementById("userModal").style.display = "none";
  });
});

// Open the Create User Login modal

function openCreateUserModal() {
  console.log("Opened Create User Login");

  const createUserModalShow = document.getElementById("createUserModal");
  createUserModalShow.classList.add("show");
  createUserModalShow.style.display = "block";
}

// Close the create user modal
document.getElementById("closeCreateUser").addEventListener("click", function () {
  document.getElementById("createUserModal").style.display = "none";
});

// Open the Forgot Password modal
function openForgotPasswordModal() {
  console.log("Opened Forgot Password");

  const forgotPasswordModalShow = document.getElementById("forgotPasswordModal");
  forgotPasswordModalShow.classList.add("show");
  forgotPasswordModalShow.style.display = "block";
}

// Close the forgot password modal
document.getElementById("closeForgotPassword").addEventListener("click", function () {
  document.getElementById("forgotPasswordModal").style.display = "none";
});

// Handle login logic
// function login() {
//   // Get user input values
//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;

//   // Perform login logic (add your own logic here)
//   console.log("Email:", email);
//   console.log("Password:", password);

//   // Close the modal after handling login
//   closeAccountModal();
// }

// Listen for clicks on the account icon
const userIcon = document.querySelector(".nav-icon");
userIcon.addEventListener("click", openUserModal);

const createUserLink = document.getElementById("createUserLink");

createUserLink.addEventListener("click", function (event) {
  event.preventDefault();
  openUserModal(); // Close the userModal
  openCreateUserModal(); // Open the createUserModal
});

// Listen for clicks on the forgot password link
const forgotPasswordLink = document.getElementById("forgotUserLink");
forgotPasswordLink.addEventListener("click", function (event) {
  event.preventDefault();
  openUserModal(); // Close the userModal
  openForgotPasswordModal(); // Open the forgotPasswordModal
});

export { openUserModal, openCreateUserModal, openForgotPasswordModal };
