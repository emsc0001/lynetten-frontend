import ItemRenderer from "./ItemRenderer.js";
import * as controller from "../../main.js";

export default class CategorySidebarRenderer extends ItemRenderer {
    render() {
        const category = this.item;
        const html = /*html*/ `
            <li class="nav-item"><a href="#">${category.categoryName}</a></li>
                `;
        return html;
    }
    
    postRender(element) {
        // element.querySelector(".nav-item").addEventListener("click", (event) => {
        //     event.preventDefault();
        //     controller.getProductsByCategory(this.item.categoryId);
        // });
    }
    }