import { deleteUnpaidGuestOrder } from "../Model/Rest-services/guestOrder-rest.js";
import clearCart from "./clearCart.js";

export default async function deleteUnpaidOrders() {
    await deleteUnpaidGuestOrder(); // Call the function to delete unpaid guest orders
    // Call clear cart
    clearCart();

}
