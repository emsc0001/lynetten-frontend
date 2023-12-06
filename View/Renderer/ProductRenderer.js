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
            const product = this.item;
        element.querySelector(".button").addEventListener("click", async (event) => {
            event.preventDefault();
            try {
                const orderDate = new Date().toISOString().slice(0, 10);
                const guestOrderId = await guestOrderController.createGuestOrder(orderDate);
                // Checks if the guest order is already created
                if (!controller.guestOrderCreated.value) {
                        console.log(guestOrderId);
                        if (guestOrderId) {
                            // Marks the guest order as created and adds the item to the cart
                            controller.guestOrderCreated.value = true;
                            controller.addToCart(product.productId, product.listPrice, product.productName, product.imageURLs, guestOrderId);
                        } else {
                            console.error("Failed to create guest order");
                        }

                } else {
                    // If the guest order is already created, adds the item to the cart directly
                    controller.addToCart(product.productId, product.listPrice, product.productName, product.imageURLs, guestOrderId);
                }
            } catch (error) {
                console.error("Error creating guest order:", error);
            }
        });
    }
}

