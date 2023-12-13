import Dialog from "../Dialog.js";
import { deleteProduct } from "../../../Model/Rest-services/products-rest.js";

export default class DeleteProductDialog extends Dialog {
    constructor(product, id) {
        super(id);
        this.product = product;
    }

    renderHTML() {
        const html = /*html*/ `
        <div class="modal-content">
            <h2>Slet Produkt</h2>
            <p>Vil du slette ${this.product.productName}??</p>
            <button id="deleteProductButton">Slet</button>
            <button id="closeDeleteProductButton" data-action="close">Luk</button>
        </div>
        `;
        return html;
    }

    postRender() {
        const deleteButton = this.dialog.querySelector("#deleteProductButton");
        deleteButton.addEventListener("click", async (event) => {
            event.preventDefault();
            const productId = this.product.productId;

            deleteProduct(productId);
            console.log("Deleting product with productId:", productId);
            this.dialog.close();
            //reloads page
            location.reload();
        });

        //close delete dialog
        const closeDeleteButton = this.dialog.querySelector("#closeDeleteProductButton");
        closeDeleteButton.addEventListener("click", async (event) => {
            event.preventDefault();
            this.dialog.close();
        });

    }
}
            