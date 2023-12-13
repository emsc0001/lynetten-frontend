import ItemRenderer from "../Itemrenderer.js";
import * as controller from "../../../main.js";

export default class UserRenderer extends ItemRenderer {
    render() {
        const user = this.item;
        const html = /*html*/ `
      <table class="user-info">
        <thead>
          <tr>
            <th>${user.userId}</th>
            <th>${user.email}</th>
            <th>${user.password}</th>
            <th>${user.newsletterSubscription}</th>
          </tr>
        </thead>
      </table>
    `;

        return html;
    }

    postRender(element) {
        // Tilføj eventuelle efterbehandling her, hvis nødvendigt
    }
}
