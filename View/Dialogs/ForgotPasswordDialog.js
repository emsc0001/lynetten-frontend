import Dialog from "./Dialog.js";
import User from "../../Model/User.js";
import * as Controller from "../../Model/Rest-services/user-rest.js";

export default class ForgotPasswordDialog extends Dialog {
    renderHTML() {
        const html = /*html*/ `
        <div class="Forgot-form-container">
            <form>
                <button type="button" data-action="close">X</button>
                <h1>Forgot Password</h1>
                <img src="https://i.ibb.co/r2bH4d1/Sk-rmbillede-2023-11-28-kl-15-35-30.png" alt="Logo" height="50" />
                <label for="email">Email</label>
                <input type="email" name="email" id="forgotUserEmail" required>
                <button type="submit" data-action="forgot">Send Email</button>
                <button type="button" data-action="cancel">Fortryd</button>
            </form>
        </div>
        `;
        return html;
    }
}
