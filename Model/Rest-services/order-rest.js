
const endpoint = "http://localhost:4444";

async function createOrder(orderDate, userId) {
    try {
        const requestBody = {
            orderDate,
            userId,
        };

        const response = await fetch(`${endpoint}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error("Error creating order");
        }

        const data = await response.json();
        console.log(data);
        const orderId = data.orderId;
        console.log(`Order created with id ${orderId}`);
        return orderId;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function updateOrder(orderId, address, phoneNumber, country, city, zipCode) {
    try {
        const requestBody = {
            address,
            phoneNumber,
            country,
            city,
            zipCode,
        };

        const response = await fetch(`${endpoint}/orders/${orderId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error("Error updating order");
        }

        const data = await response.json();
        console.log(data);
        return data.orderId;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export { createOrder, updateOrder };
