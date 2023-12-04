import ItemRenderer from "./Itemrenderer.js";
import * as controller from "../../main.js";

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
    const addToCartButton = element.querySelector(".button");

    // Fjern eksisterende event listeners for at undgå duplikatlyttere
    addToCartButton.removeEventListener("click", this.handleAddToCartClick);

    // Tilføj en ny event listener
    addToCartButton.addEventListener("click", this.handleAddToCartClick);
  }

  handleAddToCartClick = (event) => {
    event.preventDefault();
    controller.addToCart(this.item);
  };
}
