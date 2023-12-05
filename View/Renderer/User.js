// Open the account login modal
function openAccountModal() {
  const accountModal = document.getElementById("userModal");
  accountModal.style.display = "block";
}

// Close the account login modal
document.getElementById("closeUser").addEventListener("click", function () {
  document.getElementById("userModal").style.display = "none";
});

// Handle login logic
function login() {
  // Get user input values
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Perform login logic (add your own logic here)
  console.log("Email:", email);
  console.log("Password:", password);

  // Close the modal after handling login
  closeAccountModal();
}

// Listen for clicks on the account icon
const accountIcon = document.querySelector(".nav-icon");
accountIcon.addEventListener("click", openAccountModal);

export { openAccountModal, login };
