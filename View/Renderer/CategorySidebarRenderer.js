import ItemRenderer from "./Itemrenderer.js";


export default class CategorySidebarRenderer extends ItemRenderer {
    render() {
        const category = this.item;
        const html = /*html*/ `
            <li class="nav-item"><a href="#">${category.categoryName}</a></li>
                `;
        return html;
    }

}
