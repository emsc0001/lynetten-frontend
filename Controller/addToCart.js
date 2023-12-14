import { cart, saveCartToLocalStorage, htmlSide } from "../main.js";
import { initializeCartView, initializeCartHtmlView } from "../View/HtmlChangers/initializeCartViews.js";
import cartFeedback from "../View/HtmlChangers/cartFeedBack.js";

export default function addToCart(productId, listPrice, productName, imageURLs, categories, orderId, guestOrderId) {
    // Check if the product already exists in the cart
    const existingProduct = cart.find((item) => item.productId === productId);

    if (existingProduct) {
        // If the product exists, increase its quantity
        existingProduct.quantity++;
    } else if (orderId) {
        cart.push({ productId, listPrice, productName, imageURLs, categories, orderId, quantity: 1 });
    } else {
        cart.push({ productId, listPrice, productName, imageURLs, categories, guestOrderId, quantity: 1 });
    }

    console.log("Item added to cart:", cart); // Logging for demonstration

    saveCartToLocalStorage(); // Save cart to localStorage
    console.log(htmlSide);
    if (htmlSide === "/kurv.html") {
        initializeCartHtmlView(); // Render the cart
    } else {
        initializeCartView(); // Render the cart
    }

    // Call cartFeedback function here to show feedback
    cartFeedback(productName); // Pass the product name or any other relevant information
}
