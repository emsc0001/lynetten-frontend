import { createOrderItem } from "./orderItem-rest.js";
import { cart } from "../main.js";

let user = false;
export default async function payNowClicked(event) {
    event.preventDefault();
    console.log("Pay now clicked");
    let orderItems = [];

    if (!user) {
        //loop through cart and create orderItems
        for (const item of cart) {
            orderItems.push({ productId: item.productId, quantity: item.quantity });
        }
        const orderId = cart[0].guestOrderId;
    
        await createOrderItem(orderId, orderItems);

    } else {
        //loop through cart and create orderItems
        for (const item of cart.items) {
            orderItems.push({ productId: item.productId, quantity: item.quantity });
        }
        const orderId = cart.orderId;
        const userId = user.userId;
    
        await createOrderItem(orderId, orderItems, userId);
    }
    
    cart.items = [];
    cart.orderId = null;
    cart.userId = null;
    localStorage.removeItem("cart");
    window.location.href = "orderComplete.html";
}



