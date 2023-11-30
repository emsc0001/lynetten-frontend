import ItemRenderer from "./ItemRenderer.js";
import * as controller from "../../main.js";

export default class CategoryRenderer extends ItemRenderer {
  render() {
    const category = this.item;
    const html = /*html*/ `
            <article class="category">
                <div class="category-item" >
                    <h2>${category.categoryName}</h2>
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
