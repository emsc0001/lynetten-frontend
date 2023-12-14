import ItemRenderer from "../Itemrenderer.js";

export default class AdminUserRenderer extends ItemRenderer {
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

}
