import itemRenderer from "./itemRenderer.js";
import * as controller from "../../main.js";

export default class productRenderer extends itemRenderer {
  render() {
    const product = this.item;
    const html = /*html*/ `
        <div class="product">
            <div class="product__image">
                <img src="${product.imageURLs}" alt="${product.productName}">
            </div>
            <div class="product_number">${product.productNumber}</div>
            <div class="product_name">${product.productName}</div>
            <div class="product_price">$${product.listPrice}</div>
            <div class="product_button">
                <button class="button" data-id="${product.productId}">Add to Cart</button>
            </div>
        </div>
        `;
    return html;
  }

  postRender(element) {
    element.querySelector(".button").addEventListener("click", (event) => {
      event.preventDefault();
      controller.addToCart(this.item);
    });
  }
}
