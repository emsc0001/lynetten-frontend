document.getElementById("adminLoginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Admin credentials (for testing only)
    const admins = [
        { username: 'Emil', password: 'lynetten' },
        { username: 'Abdi', password: 'lynetten' },
        { username: 'Mads', password: 'lynetten' }
    ];

    const isAdmin = admins.some(admin => admin.username === username && admin.password === password);

    if (isAdmin) {
        // Redirect to index.html at the root
        window.location.href = '../../index.html'; // Go up two levels
    } else {
        alert('Login failed!');
    }
});
