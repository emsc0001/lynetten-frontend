import ItemRenderer from "./Itemrenderer.js";
import * as controller from "../../main.js";

export default class LoggedInUserRenderer extends ItemRenderer {
  render() {
    const user = this.item;
    const html = /*html*/ `
                <li class="nav-item">
                    <a href="#" data-user-id="${user.userId}">
                        <span class="user-icon"></span> ${user.email}
                    </a>
                </li>
            `;
    return html;
  }

  postRender(element) {
    // element.querySelector(".nav-item a").addEventListener("click", (event) => {
    //   event.preventDefault();
    //   controller.getProductsByCategory(element.categoryId);
    // });
  }
}
