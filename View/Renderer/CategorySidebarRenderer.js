import ItemRenderer from "./Itemrenderer.js";
import * as controller from "../../main.js";

export default class CategorySidebarRenderer extends ItemRenderer {
    render(selector) {
        const category = this.item;
        const html = /*html*/ `
            <li class="nav-item"><a href="#">${category.categoryName}</a></li>
                `;
        const targetEle
    }

    postRender(element) {
        // element.querySelector(".nav-item").addEventListener("click", (event) => {
        //     event.preventDefault();
        //     controller.getProductsByCategory(this.item.categoryId);
        // });
    }
}
