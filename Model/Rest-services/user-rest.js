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

function findUserByEmailAndPassword(email, password) {
  console.log(allUsers);
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password);
}

export { getAllUsers, createUser, allUsers, endpoint, findUserByEmailAndPassword };
