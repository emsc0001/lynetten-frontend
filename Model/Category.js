export default class Category {
    constructor(obj) {
        this.categoryId = obj.categoryId;
        this.categoryName = obj.categoryName;
        Object.defineProperty(this, "categoryId", { writable: false });
    }
}