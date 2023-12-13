import Dialog from "./Dialog.js";

export default class ProductDialog extends Dialog {
  renderHTML(product) {
    const isLowInStock = product.stockQuantity > 0 && product.stockQuantity <= 2;
    const stockFeedback = isLowInStock
      ? `<p style="color: red; font-weight: bold;">Lavt på lager🚨</p>`
      : product.stockQuantity === 0
      ? `<p style="color:  #FFD700; font-weight: bold;">Ingen varer på lager⚠️</p>`
      : `<p>På lager</p>`;

    const html = /*html*/ `
      <div class="product-details">
        <img src="${product.imageURLs}" alt="${product.productName}">
        <h4>${product.productName}</h4>
        <p>${stockFeedback}</p>
        <div id="description-container">
          <p>Beskrivelse: ${product.description}</p>
        </div>
        <p>Pris: ${product.listPrice} Kr</p>
        <p>Varer på lager: ${product.stockQuantity}</p>
        <button type="button" class="closeModal" data-action="close">Luk</button>
        </div>
    `;

    return html;
  }
}
