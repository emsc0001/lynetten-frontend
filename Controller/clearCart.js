import { cart, saveCartToLocalStorage } from "../main.js";
import { initializeCartView } from "../View/HtmlChangers/initializeCartViews.js";

 export default async function clearCart() {
    try {
        cart.items = [];
        saveCartToLocalStorage(); // Save the updated cart to localStorage
        console.log("Cart cleared successfully!");
        initializeCartView(); // Render the updated cart view
    } catch (error) {
        console.error("Error clearing cart:", error);
    }
}