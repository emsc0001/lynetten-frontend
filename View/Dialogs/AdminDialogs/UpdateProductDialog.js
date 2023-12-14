import Dialog from "../Dialog.js";
import {updateProduct} from "../../../Model/Rest-services/products-rest.js";

export default class UpdateProductDialog extends Dialog {
    constructor(product, id) {
        super(id);
        this.product = product;
    }

    renderHTML() {
        const product = this.product;
        const html = /*html*/ `

            <div class="modal-content">
                <span class="close" data-action="close">&times;</span>
                <h2>Edit Produkt</h2>
                <form id="editProductForm">
                    <input type="hidden" id="editProductId">
                    <input type="text" id="editProductName" name="productName" placeholder="Product Name" value="${product.productName}" required>
                    <input type="number" id="editProductPrice" name="productPrice" placeholder="List Price" value="${product.listPrice}" required>
                    <input type="text" id="editProductNumber" name="productNumber" placeholder="Product Number" value="${product.productNumber}" required>
                    <input type="number" id="editProductStock" name="stockQuantity" placeholder="Stock Quantity" value="${product.stockQuantity}" required>
                    <input type="number" id="editProductOfferPrice" name="offerPrice" placeholder="Offer Price" value="${product.offerPrice}">
                    <input type="text" id="editProductImageURLs" name="imageURLs" placeholder="Image URLs" value="${product.imageURLs}"required>
                    <textarea id="editProductDescription" name="description" placeholder="Description"> ${product.description}</textarea>
                    <label for="category">Category</label>
                    <select id="updateProductCategories" name="categories"  required>
                    </select>
                    <button type="submit">Save Changes</button>
                </form>
            </div>
    `;
        return html;
    }
    
    async postRender() {
        
        addEventListener("submit", async (event) => {
            event.preventDefault();
            // Build product object from form
            const form = this.dialog.querySelector("form");
            console.log(form);
            const product = {
                productId: this.product.productId,
                productName: form.productName.value,
                productNumber: form.productNumber.value,
                listPrice: form.productPrice.value,
                offerPrice: form.offerPrice.value || null,
                stockQuantity: form.stockQuantity.value,
                imageURLs: form.imageURLs.value,
                description: form.description.value,
                categories: form.categories.value,
            };
            console.log(product.categories);
            // Clear form
            form.reset();

            // Log the productId and productName before calling the controller method
            console.log("Updating product with productId:", product.productId, "and productName:", product.productName);

            // Call the controller method to update the product
            const updateSuccessFull = await updateProduct(product);

            if (updateSuccessFull) {
                // Close the dialog if the product update is 
                this.close();
                //reloads the page
                location.reload();
            }
        });

        //close dialog
        this.dialog.querySelector(".close").addEventListener("click", (event) => {
            event.preventDefault();
            this.close();
        });
 
    }

}
