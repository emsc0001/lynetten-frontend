import ItemRenderer from "./Itemrenderer.js";
import ProductsDialog from "../Dialogs/ProductsDialog.js";

export default class ProductDialogRenderer extends ItemRenderer {
  render() {
    const product = this.item;
    const html = /*html*/ `
            <article class="product">
                <div class="product-item">
                    <img src="${product.imageURLs}" alt="${product.productName}">
                    <h2>${product.productName}</h2>
                    <h4>${product.productNumber}</h4>
                    <h3>${product.listPrice}kr</h3>
                    <button class="button" data-id="${product.productId}" data-action="open-dialog">Add to Cart</button>
                </div>
            </article>
        `;
    return html;
  }

  postRender(element) {
    const product = this.item;
    element.querySelector(".button").addEventListener("click", async (event) => {
      event.preventDefault();
      // Åbn din dialog ved at oprette en instans og vise den
      const productsDialog = new ProductsDialog(product);
      productsDialog.show();
    });
  }
}
