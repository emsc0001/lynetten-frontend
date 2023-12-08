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
    
async function updateGuestOrder(orderId, fullName, email, address, phoneNumber, country, city, zipCode) {
    try {
        const response = await fetch(`${endpoint}/guestOrders/${orderId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ fullName, email, address, phoneNumber, country, city, zipCode, paid: true }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
        } else {
            console.log("Error updating guest order");
        }
    } catch (error) {
        console.error(error);
    }
}

async function deleteUnpaidGuestOrder() {
    try {
        const response = await fetch(`${endpoint}/guestOrders/unpaid`, {
            method: "DELETE",
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
        } else {
            console.log("Error deleting guest order");
        }
    } catch (error) {
        console.error(error);
    }
}
    
    export {createGuestOrder, updateGuestOrder, deleteUnpaidGuestOrder};
