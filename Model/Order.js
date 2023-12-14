export default class Order {
    constructor(obj) {
        this.orderId = obj.orderId;
        this.userId = obj.userId;
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
        Object.defineProperty(this, "orderId", { writable: false });
    }
}