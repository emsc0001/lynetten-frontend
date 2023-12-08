import { deleteUnpaidGuestOrder } from "../Model/Rest-services/guestOrder-rest.js";
import { cart, saveCartToLocalStorage, initializeCartView } from "../main.js";

export default async function clearCartAndDeleteUnpaidOrders() {
    try {
        await deleteUnpaidGuestOrder(); // Call the function to delete unpaid guest orders
        cart.items = [];
        saveCartToLocalStorage(); // Save the updated cart to localStorage
        console.log("Cart cleared and unpaid orders deleted successfully!");
        initializeCartView(); // Render the updated cart view
    } catch (error) {
        console.error("Error clearing cart and deleting unpaid orders:", error);
    }
}
