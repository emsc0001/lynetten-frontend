import ItemRenderer from "./Itemrenderer.js";

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
    
        // postRender(element) {
        //     const productId = this.item.productId;
    
        //     element.querySelector(".edit-button").addEventListener("click", async (event) => {
        //         event.preventDefault();
        //         showEditCategoryModal(productId);
        //         console.log("Edit button clicked");
        //     });
        //     element.querySelector(".delete-button").addEventListener("click", async (event) => {
        //         event.preventDefault();
        //         showDeleteCategoryModal(productId);
        //         console.log("Delete button clicked");
        //     });
        // }
}