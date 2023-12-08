// import OrderItem from "./Model/OrderItem.js";

const endpoint = "http://localhost:4444";

async function createOrderItem(orderId, orderItems, userId) {
    try {
        const requestBody = {
            orderItems,
            userId,
        };
        
        const response = await fetch(`${endpoint}/orderItems/${orderId}/items`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error("Error creating order item");
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
        return null;
    }
}


export { createOrderItem };