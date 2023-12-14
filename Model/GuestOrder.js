export default class GuestOrder {
    constructor(obj) {
        this.guestOrderId = obj.guestOrderId;
        this.temporaryUserId = obj.temporaryUserId;
        this.orderDate = obj.orderDate;
        this.totalAmount = obj.totalAmount;
        this.fullName = obj.fullName;
        this.email = obj.email;
        this.address = obj.address;
        this.phoneNumber = obj.phoneNumber;
        this.country = obj.country;
        this.city = obj.city;
        this.zipCode = obj.zipCode;
        this.paid = obj.paid;
        Object.defineProperty(this, "guestOrderId", { writable: false });
    }
}
