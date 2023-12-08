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

async function createUserForm(user) {
  await createUser(user);

  let fetchedUsers = await getAllUsers();
  usersLists.setLists(fetchedUsers);
  usersLists.render();
}

async function loginUserForm(users) {
  try {
    console.log(users);
    // Use the getUserById function to fetch user data by userId
    const user = await findUserByEmail(users.email);
    console.log(user);
    // Assuming you have an element with id "loggedInUserInfo"
    const loggedInUserInfo = document.getElementById("loggedInUserInfo");

    if (loggedInUserInfo) {
      // Handle updating the UI with the logged-in user information if needed
      loggedInUserInfo.innerHTML = `Logged in as ${user.userId}`;
    }

    console.log("User logged in with userId:", user.userId, "and email:", user.email);
  } catch (error) {
    // Handle any errors that may occur during the fetch or processing
    console.error("Login failed:", error);
    // You might want to provide more specific error messages or log additional information for debugging
  }
}

function findUserByEmail(email) {

  return allUsers.find((user) => user.email === email);
}

export { getAllUsers, createUser, createUserForm, loginUserForm, allUsers, endpoint };
