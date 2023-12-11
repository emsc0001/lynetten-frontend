function login() {
    // Get the username and password from the form
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Check if the provided credentials are correct
    if (username === "admin" && password === "adminpw") {
        // Redirect to the admin dashboard
        window.location.href = "admin-dashboard.html";
    } else {
        // Display an error message (you can customize this part)
        alert("Invalid username or password");
    }
}