
export default function cartFeedback(productName) {
    // Show feedback box
    var feedbackBox = document.getElementById("feedbackBox");
    feedbackBox.innerText = productName + " added to cart!"; // Update text to show which product was added
    feedbackBox.style.display = "block";
    setTimeout(function () {
        feedbackBox.style.display = "none";
    }, 3000); // Hide the box after 3 seconds
}
