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
                // Check if the cart exists and has at least one item

                const guestOrderId = controller.cart[0]?.guestOrderId;
                console.log("Guest order ID:", guestOrderId);
                if (!guestOrderId) {
                    // Create a new guest order if no order ID exists
                    const orderDate = new Date().toISOString().slice(0, 10);
                  const newGuestOrderId = await guestOrderController.createGuestOrder(orderDate);
                  controller.addToCart(product.productId, product.listPrice, product.productName, product.imageURLs, newGuestOrderId);

                } else {
                    // Add item to existing guest order
                    controller.addToCart(product.productId, product.listPrice, product.productName, product.imageURLs, guestOrderId);
                }
                
            } catch (error) {
                console.error("Error handling item addition to cart:", error);
            }
        });
    }
}

