export default class Order {
    constructor(obj) {
        this.orderId = obj.orderId;
        this.userId = obj.userId;
        this.orderDate = obj.orderDate;
        this.totalAmount = obj.totalAmount;
        Object.defineProperty(this, "orderId", { writable: false });
    }
}