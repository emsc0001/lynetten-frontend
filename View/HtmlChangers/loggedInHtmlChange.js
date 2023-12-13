import { loggedInUser } from "../../main.js";


export default function loggedInHtmlChange() {
    const loggedInUserInfo = document.querySelector(".userLogin-container");

    if (loggedInUser) {
        //remove current innerHTML
        loggedInUserInfo.innerHTML = "";
        // Handle updating the UI with the logged-in user information if needed
        loggedInUserInfo.innerHTML = `<p>Logged in as ${loggedInUser.email}</p><button id="logout">Logout</button>`;
    } else {
        loggedInUserInfo.innerHTML = "";
        loggedInUserInfo.innerHTML = `<span class="nav-icon" id="logIn">👤</span>`;
    }

}