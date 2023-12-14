import {loginUser} from "../Model/Rest-services/user-rest.js";

export default async function loginUserForm(loginAttempt) {
    try {
        // Use the findUserByEmailAndPassword function to fetch user data by email and password
        const user = await loginUser(loginAttempt.email, loginAttempt.password);
        console.log(user);

        // Assuming you have an element with id "loggedInUserInfo"
        const loggedInUserInfo = document.getElementById("userLogin-container");

        if (loggedInUserInfo) {
            //remove current innerHTML
            loggedInUserInfo.innerHTML = "";
            // Handle updating the UI with the logged-in user information if needed
            loggedInUserInfo.innerHTML = `<p>Logged in as ${user.email}</p><button id="logout">Logout</button>`;
        }

        console.log("User logged in with userId:", user.userId, "and email:", user.email);
        return user;
    } catch (error) {
        // Handle any errors that may occur during the fetch or processing
        console.error("Login failed:", error);
        // You might want to provide more specific error messages or log additional information for debugging
    }
}
