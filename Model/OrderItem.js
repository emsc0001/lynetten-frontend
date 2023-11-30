export default class OrderItem {
    constructor(obj) {
        this.orderItemId = obj.orderItemId;
        this.orderId = obj.orderId;
        this.productId = obj.productId;
        this.quantity = obj.quantity;
        this.guestOrderId = obj.guestOrderId;
        Object.defineProperty(this, 'orderItemId', { writable: false })
    }
}