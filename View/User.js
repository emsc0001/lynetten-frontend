// Open the User Login modal
// function openUserModal() {
//   console.log("Opened User Login");
//   const userModalShow = document.getElementById("userModal");
//   userModalShow.classList.add("show"); // Add the 'show' class
//   userModalShow.style.display = "block"; // Show the modal

//   // Close the User login modal
//   const closeUserButton = document.getElementById("closeUser");
//   closeUserButton.removeEventListener("click", closeUser); // Remove existing event listener
//   closeUserButton.addEventListener("click", closeUser);
// }

// Open the Create User Login modal
// function openCreateUserModal() {
//   console.log("Opened Create User Login");

//   const createUserModalShow = document.getElementById("createUserModal");
//   createUserModalShow.classList.add("show");
//   createUserModalShow.style.display = "block";

//   // Close the create user modal
//   const closeCreateUserButton = document.getElementById("closeCreateUser");
//   closeCreateUserButton.removeEventListener("click", closeCreateUser); // Remove existing event listener
//   closeCreateUserButton.addEventListener("click", closeCreateUser);
// }

// Open the Forgot Password modal
function openForgotPasswordModal() {
  console.log("Opened Forgot Password");

  const forgotPasswordModalShow = document.getElementById("forgotPasswordModal");
  forgotPasswordModalShow.classList.add("show");
  forgotPasswordModalShow.style.display = "block";

  // Close the forgot password modal
  const closeForgotPasswordButton = document.getElementById("closeForgotPassword");
  closeForgotPasswordButton.removeEventListener("click", closeForgotPassword); // Remove existing event listener
  closeForgotPasswordButton.addEventListener("click", closeForgotPassword);
}

// function closeUser(event) {
//   event.stopPropagation(); // Stop the event from propagating to the user icon
//   document.getElementById("userModal").style.display = "none";
// }

// function closeCreateUser() {
//   document.getElementById("createUserModal").style.display = "none";
// }

function closeForgotPassword() {
  document.getElementById("forgotPasswordModal").style.display = "none";
}

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
// const userIcon = document.querySelector(".user-container");
// if (userIcon) {
//   userIcon.addEventListener("click", openUserModal);
// } else {
//   console.error(".nav-icon not found");
// }

const createUserLink = document.getElementById("createUserLink");
if (createUserLink) {
  createUserLink.addEventListener("click", function (event) {
    event.preventDefault();
    openUserModal(); // Close the userModal
  });
}

// Listen for clicks on the forgot password link
const forgotPasswordLink = document.getElementById("forgotUserLink");
if (forgotPasswordLink) {
  forgotPasswordLink.addEventListener("click", function (event) {
    event.preventDefault();
    openUserModal(); // Close the userModal
    openForgotPasswordModal(); // Open the forgotPasswordModal
  });
}

export { openForgotPasswordModal };
