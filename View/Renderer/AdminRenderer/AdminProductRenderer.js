import ItemRenderer from "../Itemrenderer.js";
import UpdateProductDialog from "../../Dialogs/AdminDialogs/UpdateProductDialog.js";
import DeleteProductDialog from "../../Dialogs/AdminDialogs/DeleteProductDialog.js";
import { populateCategoryDropdown, categories } from "../../../Admin/admin-dashboard.js";

export default class AdminProductRenderer extends ItemRenderer {
    render() {
        const product = this.item;
        const html = /*html*/ `
        <div class="product-item">
          <h3>${product.productName}</h3>
          <p>Price: ${product.listPrice}</p>
          <p>Product Number: ${product.productNumber}</p>
          <p>Stock Quantity: ${product.stockQuantity}</p>
          <p>Offer Price: ${product.offerPrice}</p>
          <p>Category ${product.categories}</p>
          <button class="edit-button" data-product-id="${product.productId}">Edit</button>
          <button class="delete-button" data-product-id="${product.productId}">Delete</button>
        </div>`;
        return html;
    }

    postRender(element) {
        const product = this.item;

        element.querySelector(".edit-button").addEventListener("click", async (event) => {
            event.preventDefault();
            const dialog = new UpdateProductDialog(product, "editProductModal");
            dialog.render();
            dialog.show();
            populateCategoryDropdown("#updateProductCategories", categories);
            console.log("Edit button clicked");
        });
        element.querySelector(".delete-button").addEventListener("click", async (event) => {
            event.preventDefault();
            const dialog = new DeleteProductDialog(product, "deleteProductModal");
            dialog.render();
            dialog.show();
            console.log("Delete button clicked");
        });
    }
}
