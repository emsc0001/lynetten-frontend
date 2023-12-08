import Dialog from "./Dialog.js";
import Product from "../../Model/Product.js";
import * as Controller from "../../Model/Rest-services/user-rest.js";

export default class ProductsDialog extends Dialog {
  renderHTML() {
    const html = /*html*/ `
        <div class="product-form-container">
          <form id="productForm">
            <button type="button" data-action="close">X</button>
            <h1 class="productHeader">Produkt Information</h1>
            <label for="productNumber">Produktnummer</label>
            <input type="text" name="productNumber" id="productNumber" required>
            <label for="productName">Produktnavn</label>
            <input type="text" name="productName" id="productName" required>
            <label for="imageURLs">Billed-URLs</label>
            <textarea name="imageURLs" id="imageURLs" required></textarea>
            <label for="listPrice">Listepris</label>
            <input type="number" name="listPrice" id="listPrice" step="0.01" required>
            <label for="offerPrice">Tilbudspris</label>
            <input type="number" name="offerPrice" id="offerPrice" step="0.01">
            <label for="stockQuantity">Lagermængde</label>
            <input type="number" name="stockQuantity" id="stockQuantity" required>
            <label for="description">Beskrivelse</label>
            <textarea name="description" id="description" required></textarea>
            <button type="button" data-action="cancel">Luk Produkt</button>
          </form>
        </div>
        `;
    return html;
  }
}
