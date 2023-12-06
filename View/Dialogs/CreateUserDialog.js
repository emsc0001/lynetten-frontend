import Dialog from "./Dialog.js";
import User from "../../Model/User.js";
import * as Controller from "../../Controller/user-rest.js";

export default class UserCreateDialog extends Dialog {
  renderHTML() {
    const html = /*html*/ `
      <form>
        <label for="email">Email</label>
        <input type="email" name="email" id="createUserEmail" required>
        <label for="password">Adgangskode</label>
        <input type="password" name="password" id="createUserpassword" required>
        <label for="newsletterSubscription">Newsletter Abonnement</label>
        <input type="checkbox" name="newsletterSubscription" id="createUsernewsletterSubscription">
        <button type="submit" data-action="create">Opret</button>
        <button type="button" data-action="cancel">Fortryd</button>
      </form>
    `;
    return html;
  }

  create() {
    // Build user object from form
    const form = this.dialog.querySelector("form");
    const newUser = new User({
      email: form.email.value,
      password: form.password.value,
      newsletterSubscription: form.newsletterSubscription.checked,
    });

    // Clear form
    form.reset();

    // Call the controller method to create the user
    Controller.createUser(newUser);
  }
}
