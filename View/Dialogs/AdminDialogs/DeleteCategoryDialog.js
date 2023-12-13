import Dialog from "../Dialog.js";
import { deleteCategory } from "../../../Model/Rest-services/category-rest.js";

export default class DeleteCategoryDialog extends Dialog {
    constructor(category, id) {
        super(id);
        this.category = category;
    }

    renderHTML() {
        const html = /*html*/ `
        <div class="modal-content">
            <h2>Slet Kategori</h2>
            <p>Vil du slette ${this.category.categoryName}??</p>
            <button id="deleteCategoryButton">Slet</button>
            <button id="closeDeleteCategoryButton" data-action="close">Luk</button>
        </div>
        `;
        return html;
    }

    postRender() {
        const deleteButton = this.dialog.querySelector("#deleteCategoryButton");
        deleteButton.addEventListener("click", async (event) => {
            event.preventDefault();
            const categoryId = this.category.categoryId;

            deleteCategory(categoryId);
            console.log("Deleting category with categoryId:", categoryId);
            this.dialog.close();
            //reloads page
            location.reload();
        });

        //close delete dialog
        const closeDeleteButton = this.dialog.querySelector("#closeDeleteCategoryButton");
        closeDeleteButton.addEventListener("click", async (event) => {
            event.preventDefault();
            this.dialog.close();
        });

    }

}