export default class User {
  constructor(obj) {
    this.userId = obj.userId;
    this.email = obj.email;
    this.newsletterSubscription = obj.newsletterSubscription;
    Object.defineProperty(this, "userId", { writable: false });
  }
}
