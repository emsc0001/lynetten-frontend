import User from "../User.js";
import { usersLists, users } from "../../main.js";

const endpoint = "http://localhost:4444";

let allUsers = [];
let lastFetch = 0;

async function getAllUsers() {
    const now = Date.now();
    const timeSinceLastFetch = now - lastFetch;

    // Only fetch if more than 10 seconds has passed since last fetch
    if (timeSinceLastFetch > 10_000) {
        await refetchAllUsers();
    }
    return allUsers;
}

async function getUserById(userId) {
    const response = await fetch(`${endpoint}/users/${userId}`);
    const data = await response.json();

    return new User(data);
}

async function refetchAllUsers() {
    const response = await fetch(`${endpoint}/users`);
    const originalJson = await response.json();
    allUsers = originalJson.map((jsonObj) => new User(jsonObj));

    lastFetch = Date.now();
}

async function createUser(user) {
    const json = JSON.stringify(user);
    const response = await fetch(`${endpoint}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: json,
    });

    await refetchAllUsers();

    return response.ok;
}

async function createUserForm(user) {
    await createUser(user);

    let users = await getAllUsers();
    usersLists.setLists(users);
    usersLists.render();
}
async function loginUserForm(userId) {
    try {
        // Assuming your user endpoint is something like /users/:userId
        const response = await fetch(`${endpoint}/users/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // You might need to provide any necessary authentication tokens here
            },
        });

        if (response.ok) {
            const userData = await response.json();

            // Now `userData` contains information about the logged-in user
            // You can update the user interface with this information

            // For example, assuming you have an element with id "loggedInUserInfo"
            const loggedInUserInfo = document.getElementById("loggedInUserInfo");
            loggedInUserInfo.innerHTML = `Logged in as ${userData.username}`;

            console.log("Login successful");
        } else {
            // If login fails, handle the error accordingly
            console.error("Login failed");
        }
    } catch (error) {
        // Handle any other errors that may occur during the fetch
        console.error("An error occurred:", error);
    }
}

export { getAllUsers, getUserById, createUser, createUserForm, loginUserForm, endpoint };
