export default class Product {
  constructor(obj) {
    this.productId = obj.productId;
    this.productNumber = obj.productNumber;
    this.productName = obj.productName;
    this.imageURLs = obj.imageURLs;
    this.listPrice = obj.listPrice;
    this.offerPrice = obj.offerPrice;
    this.stockQuantity = obj.stockQuantity;
    this.description = obj.description;
    // this.categories = obj.categories;
    // this.colors = obj.color;
    Object.defineProperty(this, "productId", { writable: false });
  }
}
