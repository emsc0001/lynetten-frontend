import ItemRenderer from "./Itemrenderer.js";

export default class CategoryRenderer extends ItemRenderer {
  render() {
    const category = this.item;
    const html = /*html*/ `
            <li class="nav-item">
                <a href="#" data-category-id="${category.categoryId}">
                    <span class="category-icon"></span> ${category.categoryName}
                </a>
            </li>
        `;
    return html;
  }

}
