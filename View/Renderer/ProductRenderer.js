import ItemRenderer from "./ItemRenderer.js";
import * as controller from "../../main.js";

export default class ProductRenderer extends ItemRenderer {
  render() {
    const product = this.item;
    const html = /*html*/ `
        <article class="product">
            <div class="product-item" >
                <img src="${product.imageURLs}" alt="${product.productName}">
                <h2>${product.productName}</h2>
                <h4>${product.productNumber}</h4>
                <h3>${product.listPrice}</h3>
            </div>
                <button class="button" data-id="${product.productId}">Add to Cart</button>
            </div>
        </div>
        </article>
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
