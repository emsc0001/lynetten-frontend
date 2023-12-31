import { createOrderItem } from "../Model/Rest-services/orderItem-rest.js";
import { cart, loggedInUser } from "../main.js";
import { updateGuestOrder } from "../Model/Rest-services/guestOrder-rest.js";
import { updateOrder } from "../Model/Rest-services/order-rest.js";

async function payNowClicked(event) {
    event.preventDefault();
    console.log("Pay now clicked");
    extractShipmentDetails();
    extractItemsCart();
}

// --extract items from cart and create orderItems--//
async function extractItemsCart() {
    let orderItems = [];

    if (!cart[0].orderId) {
        //loop through cart and create orderItems
        for (const item of cart) {
            orderItems.push({ productId: item.productId, quantity: item.quantity });
        }
        const orderId = cart[0].guestOrderId;

        await createOrderItem(orderId, orderItems);
    } else {
        //loop through cart and create orderItems
        for (const item of cart) {
            orderItems.push({ productId: item.productId, quantity: item.quantity });
        }
        const orderId = cart[0].orderId;

        await createOrderItem(orderId, orderItems, loggedInUser.userId);
    }

    cart.items = [];
    cart.orderId = null;
    cart.userId = null;
    localStorage.removeItem("cart");
    window.location.href = "orderComplete.html";
}

// --extract shipment details and updates order-//
async function extractShipmentDetails() {
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const country = document.getElementById("country").value;
    const city = document.getElementById("city").value;
    const zipCode = document.getElementById("zipCode").value;
    if (!cart[0].orderId) {
        const orderId = cart[0].guestOrderId;
        console.log(orderId);
        console.log(fullName, email, address, phoneNumber, city, zipCode);
        await updateGuestOrder(orderId, fullName, email, address, phoneNumber, country, city, zipCode);
    } else {
        const orderId = cart[0].orderId;
        updateOrder(orderId, fullName, email, address, phoneNumber, country, city, zipCode);
         console.log(orderId, fullName, email, address, phoneNumber, city, zipCode);
    }
}

export { payNowClicked };
