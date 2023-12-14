import ItemRenderer from "../Itemrenderer.js";

export default class AdminOrderRenderer extends ItemRenderer {
    render() {
      const order = this.item;
      if (order.paid && order.userId) {
          const html = /*html*/ `
            <table class ="table" class="user-order-info">
              <thead>
                <tr>
                <th>Bruger Ordrer</th>
                  <th>${order.orderId}</th>
                  <th>${order.orderDate}</th>
                  <th>${order.totalAmount}</th>
                  <th>${order.address}</th>
                  <th>${order.phoneNumber}</th>
                  <th>${order.country}</th>
                  <th>${order.city}</th>
                  <th>${order.zipCode}</th>
                  <th>Betalt</th>
                </tr>
              </thead>
            </table>
          `;
    
          return html;
      }else if (order.paid&& !order.userId) {
        const html = /*html*/ `
          <table class="table" class="guest-order-info">
            <thead>
              <tr>
                <th>Gæst Ordrer</th>
                <th>${order.guestOrderId}</th>
                <th>${order.orderDate}</th>
                <th>${order.totalAmount}</th>
                <th>${order.fullName}</th>
                <th>${order.email}</th>
                <th>${order.address}</th>
                <th>${order.phoneNumber}</th>
                <th>${order.country}</th>
                <th>${order.city}</th>
                <th>${order.zipCode}</th>
                <th>Betalt</th>
              </tr>
            </thead>
          </table>
        `;
    
        return html;
      }
  }
}