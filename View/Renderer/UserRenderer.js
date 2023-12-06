import ItemRenderer from "./Itemrenderer.js";
import * as controller from "../../main.js";

export default class UserRenderer extends ItemRenderer {
  render() {
    const user = this.item;
    const html = /*html*/ `
        <div class="user">
            <h3>${user.email}</h3>
            <h3>${user.password}</h3>
            <h3>${user.newsletterSubscription}</h3>
        </div>
        `;

    // <h2>
    //   ${user.firstName} ${user.lastName}
    // </h2>;

    return html;
  }

  postRender(element) {
    // element.querySelector(".nav-item a").addEventListener("click", (event) => {
    //   event.preventDefault();
    //   controller.getProductsByCategory(element.categoryId);
    // });
  }
}
