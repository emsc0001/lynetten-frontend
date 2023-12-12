import Dialog from "./Dialog.js";
import User from "../../Model/User.js";
import * as Controller from "../../Model/Rest-services/user-rest.js";
import { cart } from "../../main.js";
import { createOrder } from "../../Model/Rest-services/order-rest.js";

export default class UserLoginDialog extends Dialog {
  renderHTML() {
    const html = /*html*/ `
      <div class="login-form-container">
        <form id="loginForm">
          <button type="button" data-action="close">X</button>
          <h1 class="loginHeader">Login</h1>
          <img src="https://i.ibb.co/r2bH4d1/Sk-rmbillede-2023-11-28-kl-15-35-30.png" alt="Logo" height="50" />
          <label for="email">Email</label>
          <input type="email" name="email" id="loginUserEmail" required>
          <label for="password">Adgangskode</label>
          <input type="password" name="password" id="loginUserpassword" required>
          <button type="submit" data-action="login">Login</button>
          <button type="button" data-action="cancel">Fortryd</button>
          <div class="additional-options">
            <p><a id="forgotUserLogin" href="#">Forgot Password?</a></p>
            <p><a id="createUserLogin" href="#">Create New Account</a></p>
          </div>
        </form>
      </div>
    `;
    return html;
  }

  async login() {
    // Build user credentials from form
    const form = this.dialog.querySelector("form");
    const email = form.email.value;
    const password = form.password.value;

    // Clear form
    form.reset();

    // Call the controller method to log in the user
    const loggedInUser = await Controller.loginUserForm({ email, password });

    if (loggedInUser) {
        // Store user information in local storage
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

      // Add the cart items to the user's cart
      const userCart = JSON.parse(localStorage.getItem("cart")) || [];
    if (userCart.length > 0) {
      const orderId = await createOrder(new Date().toISOString().slice(0, 10), loggedInUser.userId);
      console.log(orderId);
        const updatedCart = userCart.reduce((result, item) => {
          if (item.guestOrderId) {
            // Update the guestOrderId and orderId as needed
            console.log(item.guestOrderId);
            result.push({ ...item, orderId: orderId, guestOrderId: null });
            } else {
            result.push(item);
            }
            return result;
        }, []);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

        // Close the dialog if the user login is successful
        this.close();
        window.location.reload();
    }
  }
}
