import User from "../User.js";
import { users } from "../../main.js";

const endpoint = "http://localhost:4444";

let allUsers = [];
let lastFetch = null;

async function getAllUsers() {
  const now = Date.now();
  const timeSinceLastFetch = now - lastFetch;

  // Only fetch if more than 10 seconds has passed since last fetch
  if (timeSinceLastFetch > 10_000) {
    await refetchAllUsers();
  }
  return allUsers;
}

// async function getUserById(User) {
//   const response = await fetch(`${endpoint}/users/${User}`);
//   const data = await response.json();

//   console.log(data);

//   return new User(data);
// }

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


async function loginUserForm(loginAttempt) {
  try {
    // Use the findUserByEmailAndPassword function to fetch user data by email and password
    const user = await findUserByEmailAndPassword(loginAttempt.email, loginAttempt.password);
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

function findUserByEmailAndPassword(email, password) {
  console.log(allUsers);
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password);
}

export { getAllUsers, createUser, loginUserForm, allUsers, endpoint };
