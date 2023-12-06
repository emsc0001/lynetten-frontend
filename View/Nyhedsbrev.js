

// NEWSLETTER ______________________

function newsletter() {
        // Check if the user has already subscribed in this session
        if (!sessionStorage.getItem('subscribed')) {
            setTimeout(function() {
                document.getElementById("newsletter-popup").classList.add("show");
            }, 2000);
        }
    
        // Handle form submission
        document.getElementById("newsletter-form").addEventListener("submit", function(event) {
            event.preventDefault();
            document.getElementById("newsletter-form").classList.add("hidden");
            document.getElementById("subscription-message").classList.remove("hidden");
            
            // Set a flag in session storage
            sessionStorage.setItem('subscribed', 'true');
    
            // Close the popup automatically after a delay
            setTimeout(function() {
                document.getElementById("newsletter-popup").classList.remove("show");
            }, 3000); // Adjust time as needed
        });
    
        // Close button functionality
        document.getElementById("close-popup").addEventListener("click", function() {
            document.getElementById("newsletter-popup").classList.remove("show");
        });
    };
    


export { newsletter};