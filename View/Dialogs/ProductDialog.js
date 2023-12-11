import Dialog from "./Dialog.js";

export default class ProductDialog extends Dialog {
    renderHTML(product) {
         const html=  /*html*/`
      <div class="product-details">
        <img src="${product.imageURLs}" alt="${product.productName}">
        <h4>${product.productName}</h4>
        <p>Description: ${product.description}</p>
        <p>Price: ${product.listPrice}</p>
        <p>Category: ${product.categoryName}</p>
      </div>
      <button data-action="close">Close</button>
    `;
    return html;
    }

}