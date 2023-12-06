import User from "../Model/User.js";
import { usersLists, users } from "../main.js";

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
  // Assuming your login endpoint is something like /users/login
  const response = await fetch(`${endpoint}/users/${userId}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // You might need to provide any necessary login credentials here
  });

  if (response.ok) {
    // If login is successful, you might want to perform additional actions
    // For example, you can update the user interface, set authentication tokens, etc.
    console.log("Login successful");
  } else {
    // If login fails, handle the error accordingly
    console.error("Login failed");
  }
}

export { getAllUsers, getUserById, createUser, createUserForm, loginUserForm, endpoint };
