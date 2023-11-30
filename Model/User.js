export default class User {
    constructor(obj) {
        this.userId = obj.userId;
        this.email = obj.email;
        this.password = obj.password;
        this.newsLetter = obj.newsLetter;
        Object.defineProperty(this, "userId", { writable: false });
    }
}