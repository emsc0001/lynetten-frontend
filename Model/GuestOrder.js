export default class GuestOrder {
    constructor(obj) {
        this.guestOrderId = obj.guestId;
        this.temporaryUserId = obj.temporaryUserId;
        this.orderDate = obj.orderDate;
        this.totalAmount = obj.totalAmount;
        Object.defineProperty(this, "guestOrderId", { writable: false });
    }
}
