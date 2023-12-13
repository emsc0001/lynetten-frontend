import ItemRenderer from "../Itemrenderer.js";
import UpdateCategoryDialog from "../../Dialogs/AdminDialogs/UpdateCategoryDialog.js";
import DeleteCategoryDialog from "../../Dialogs/AdminDialogs/DeleteCategoryDialog.js";

export default class AdminCategoryRenderer extends ItemRenderer {
    render() {
        const category = this.item;
        const html = /*html*/ `
        <div class="category-item">
          <h3>${category.categoryName}</h3>
          <button class="edit-category-button" data-category-id="${category.categoryId}">Edit</button>
          <button class="delete-category-button" data-category-id="${category.categoryId}">Delete</button>
        </div>`;
        return html;
    }

    postRender(element) {
        const category = this.item;

        element.querySelector(".edit-category-button").addEventListener("click", async (event) => {
            event.preventDefault();
            const dialog = new UpdateCategoryDialog(category, "editCategoryModal");
            dialog.render();
            dialog.show();
            console.log("Edit button clicked");
        });

        element.querySelector(".delete-category-button").addEventListener("click", async (event) => {
            event.preventDefault();
            const dialog = new DeleteCategoryDialog(category, "deleteCategoryModal");
            dialog.render();
            dialog.show();
            console.log("Delete button clicked");
        });
    }
}
