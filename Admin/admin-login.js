// admin-login.js
document.getElementById('adminLoginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Send login info to your backend for verification
    // If successful, redirect to the admin dashboard
    fetch('http://localhost:4444/admin/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = 'admin-dashboard.html'; 
        } else {
            alert('Invalid login credentials');
        }
    })
    .catch(error => console.error('Error:', error));
});
