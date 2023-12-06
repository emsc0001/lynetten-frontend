// import User from "../Model/User.js";
// import { users, usersLists } from ".././main.js";
// import { initializeOtherHtmlViews } from ".././main.js";

// const endpoint = "http://localhost:4444";

// let allUsers = [];
// let lastFetch = 0;

// async function getAllUsers() {
//   const now = Date.now();
//   const timeSinceLastFetch = now - lastFetch;

//   // Only fetch if more than 10 seconds has passed since last fetch
//   if (timeSinceLastFetch > 10_000) {
//     await refetchAllUsers();
//   }
//   return allUsers;
// }

// async function getUserById(userId) {
//   const response = await fetch(`${endpoint}/users/${userId}`);
//   const data = await response.json();

//   return new User(data);
// }

// async function refetchAllUsers() {
//   const response = await fetch(`${endpoint}/users`);
//   const originalJson = await response.json();
//   allUsers = originalJson.map((jsonObj) => new User(jsonObj));

//   lastFetch = Date.now();
// }

// async function createUser(user) {
//   const json = JSON.stringify(user);
//   const response = await fetch(`${endpoint}/users`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: json,
//   });

//   await refetchAllUsers();

//   return response.ok;
// }

// async function createUserFrom(user) {
//   await createUser(user);

//   users = await getAllUsers();
//   usersLists.setList(users);
//   usersLists.render();
//   initializeOtherHtmlViews();
// }

import User from "../Model/User.js";
import { usersLists, initializeOtherHtmlViews } from "../main.js";

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
  const creationSuccessful = await createUser(user);

  if (creationSuccessful) {
    usersLists.setList(allUsers);
    usersLists.render();
    initializeOtherHtmlViews();
  }

  return creationSuccessful;
}

export { getAllUsers, getUserById, createUser, createUserForm, endpoint };
