import Dialog from "./Dialog.js";
import User from "../../Model/User.js";
import * as Controller from "../../Controller/user-rest.js";

export default class UserLoginDialog extends Dialog {
  renderHTML() {
    const html = /*html*/ `
<div class="login-form-container">
    <form>
        <button type="button" data-action="close">X</button>
        <h1>Login</h1>
        <img src="https://i.ibb.co/r2bH4d1/Sk-rmbillede-2023-11-28-kl-15-35-30.png" alt="Logo" height="50" />
        <label for="email">Email</label>
        <input type="email" name="email" id="loginUserEmail" required>
        <label for="password">Adgangskode</label>
        <input type="password" name="password" id="loginUserpassword" required>
        <button type="submit" data-action="login">Login</button>
        <button type="button" data-action="cancel">Fortryd</button>
        <div class="additional-options">
            <p><a id="forgotUserLink" href="#">Forgot Password?</a></p>
            <p><a id="createUserLogin" href="#">Create New Account</a></p>
        </div>
    </form>
</div>


        `;
    return html;
  }

  login() {
    // Build user object from form
    const form = this.dialog.querySelector("form");
    const newUser = new User({
      email: form.email.value,
      password: form.password.value,
    });

    // Clear form
    form.reset();

    // Call the controller method to create the user
    Controller.loginUserForm(newUser);
  }
}
