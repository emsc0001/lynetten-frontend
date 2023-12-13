import Dialog from "../Dialog.js";
import { updateCategory } from "../../../Model/Rest-services/category-rest.js";

export default class UpdateCategoryDialog extends Dialog {
    constructor(category, id) {
        super(id);
        this.category = category;
    }

    renderHTML() {
        const html = /*html*/ `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Edit kategori</h2>
                <form id="editCategoryForm">
                    <input type="hidden" id="editCategoryId">
                    <input type="text" id="editCategoryName" name="categoryName" value="${this.category.categoryName}" required>
                    <button type="submit">Gem ændringer</button>
                </form>
            </div>
        `;
        return html;
    }


    postRender() {

            const form = this.dialog.querySelector("form");
        addEventListener("submit", async (event) => {
            event.preventDefault();
            const updatedCategory = {
                categoryId: this.category.categoryId,
                categoryName: form.categoryName.value,
            };
            
            form.reset();
            
              const updateSuccessFull = await updateCategory(updatedCategory);

              if (updateSuccessFull) {
                  // Close the dialog if the product update is
                  this.close();
                  //reloads the page
                  location.reload();
              }
        });

}

}