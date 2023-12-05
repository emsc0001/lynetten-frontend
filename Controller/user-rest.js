import User from "./Model/User.js";

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

export { getAllUsers, getUserById, endpoint };
