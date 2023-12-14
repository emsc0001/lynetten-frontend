import ItemRenderer from "../Itemrenderer.js";

export default class AdminUserRenderer extends ItemRenderer {
  render() {
    const user = this.item;
    let subscriptionStatus = user.newsletterSubscription ? "Ja" : "Nej";

    const html = /*html*/ `

          <tr class="user-info">
            <th>${user.userId}</th>
            <th>${user.email}</th>
            <th>${subscriptionStatus}</th>
          </tr>

    `;

    return html;
  }

}
