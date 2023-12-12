import Dialog from "./Dialog.js";

export default class ProductDialog extends Dialog {
  renderHTML(product) {
    const html = /*html*/ `
  <div class="product-details">
    <img src="${product.imageURLs}" alt="${product.productName}">
    <h4>${product.productName}</h4>
    <div id="description-container">
      <p>Beskrivelse: ${product.description}</p>
    </div>
    <p>Pris: ${product.listPrice} Kr</p>
    <p>Kategori: ${product.categoryName}</p>
    <p>Varer på lager ${product.stockQuantity}</p>
    <button type="button" class="closeModal" data-action="close">Luk</button>
  </div>
`;

    return html;
  }
}
