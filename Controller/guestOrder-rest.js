// import GuestOrder from "./Model/GuestOrder.js";

const endpoint = "http://localhost:4444";


async function createGuestOrder(orderDate) {
    try {
        const response = await fetch(`${endpoint}/guestOrders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ orderDate }),
        });
        
        if (response.ok) {
            const data = await response.json();
            const guestOrderId = data.guestOrderId;
            console.log('Guest order created with id ${orderId}');
            return guestOrderId;
        } else {
            console.log('Error creating guest order');
            return null;
        }
    } catch (error) {
            console.error(error);
            return null;
        }

    }
    
    export {createGuestOrder};
