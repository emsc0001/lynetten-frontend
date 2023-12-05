import ItemRenderer from "./Itemrenderer.js";
import * as controller from "../../main.js";
import * as guestOrderController from "../../Controller/guestOrder-rest.js";

export default class ProductRenderer extends ItemRenderer {
    render() {
        const product = this.item;
        const html = /*html*/ `
        <article class="product">
            <div class="product-item">
                <img src="${product.imageURLs}" alt="${product.productName}">
                <h2>${product.productName}</h2>
                <h4>${product.productNumber}</h4>
                <h3>${product.listPrice}kr</h3>
                <button class="button" data-id="${product.productId}">Add to Cart</button>
            </div>
        </article>
        `;
        return html;
    }

    postRender(element) {
        element.querySelector(".button").addEventListener("click", async (event) => {
            event.preventDefault();

            // Checks if the guest order is already created
            if (!controller.guestOrderCreated.value) {
                const orderDate = new Date().toISOString().slice(0, 10);
                try {
                    const guestOrderId = await guestOrderController.createGuestOrder(orderDate);
                    console.log(guestOrderId);
                    if (guestOrderId) {
                        // Marks the guest order as created and adds the item to the cart
                        controller.guestOrderCreated.value = true;
                        controller.addToCart(this.item.productId, this.item.listPrice);
                    } else {
                        console.error("Failed to create guest order");
                    }
                } catch (error) {
                    console.error("Error creating guest order:", error);
                }
            } else {
                // If the guest order is already created, adds the item to the cart directly
                controller.addToCart(this.item.productId, this.item.listPrice);
            }
        });
    }
}

