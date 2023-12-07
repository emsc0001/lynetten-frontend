document.getElementById("adminLoginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Admin credentials (for testing only)
    const admins = [
        { username: 'emil', password: 'lynetten' },
        { username: 'abdi', password: 'lynetten' },
        { username: 'mads', password: 'lynetten' }
    ];

    const isAdmin = admins.some(admin => admin.username === username && admin.password === password);

    if (isAdmin) {
        // Store the admin status in local storage
        localStorage.setItem('isAdmin', 'true');

        // Redirect to index.html at the root
        window.location.href = '../../index.html'; // Go up two levels
    } else {
        // Clear any existing admin status
        localStorage.removeItem('isAdmin');

        alert('Login failed!');
    }
});


// Assuming this script is at the bottom of your index.html or in a separate JS file
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', async function() {
            const productId = this.getAttribute('data-product-id');
            if (confirm('Are you sure you want to delete this product?')) {
                try {
                    const response = await fetch(`/products/${productId}`, { method: 'DELETE' });
                    if (response.ok) {
                        alert('Product deleted successfully');
                        // Optionally refresh the page or remove the product from the DOM
                        location.reload(); // Refresh page
                    } else {
                        alert('Failed to delete product');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        });
    });
});
