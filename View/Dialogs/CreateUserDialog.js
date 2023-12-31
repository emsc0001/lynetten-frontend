import Dialog from "./Dialog.js";
import User from "../../Model/User.js";
import * as Controller from "../../Model/Rest-services/user-rest.js";
import { users } from "../../main.js";

export default class UserCreateDialog extends Dialog {
  renderHTML() {
    const html = /*html*/ `
      <form>
      <h1> Opret Bruger </h1>
      <div class="createUserForm">
    <img src="https://i.ibb.co/r2bH4d1/Sk-rmbillede-2023-11-28-kl-15-35-30.png" alt="Logo" height="50" />
      <button type="button" data-action="close">X</button>
        <label for="email">Email</label>
        <input type="email" name="email" id="createUserEmail" required>
        <label for="password">Adgangskode</label>
        <input type="password" name="password" id="createUserpassword" required>
        <label for="newsletterSubscription">Newsletter Abonnement</label>
        <input type="checkbox" name="newsletterSubscription" id="createUsernewsletterSubscription">
        <button class="createUser"  data-action="create">Opret</button>
        <button class="closeUser" data-action="cancel">Fortryd</button>
        </div>
      </form>
    `;
    return html;
  }

  async create() {
    // Build user object from form
    const form = this.dialog.querySelector("form");
    this.user = {
      email: form.email.value,
      password: form.password.value,
      newsletterSubscription: form.newsletterSubscription.checked ? 1 : 0,
    };

    // Clear form
    form.reset();

    // Call the controller method to create the user
    const createdUser = await Controller.createUser(this.user);
    console.log(createdUser);

    if (createdUser) {
      // Log the created user
      console.log("User created:", createdUser);

      users.push(createdUser);

      // Close the dialog if the user creation is successful
      this.close();
      window.location.reload();
    }
  }
}
