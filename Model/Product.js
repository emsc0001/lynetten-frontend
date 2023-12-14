export default class Product {
  constructor(obj) {
    this.productId = obj.productId;
    this.productNumber = obj.productNumber;
    this.productName = obj.productName;
    this.imageURLs = obj.imageURLs;
    this.listPrice = Number(obj.listPrice);
    this.offerPrice = Number(obj.offerPrice);
    this.stockQuantity = Number(obj.stockQuantity);
    this.description = obj.description;
    this.categories = obj.categories;
    Object.defineProperty(this, "productId", { writable: false });
  }
}
