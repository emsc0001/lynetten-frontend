import User from "../User.js";

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

  if (response.ok) {
    // User created successfully
    await refetchAllUsers();
    return { success: true, message: "User created successfully" };
  } else {
    const errorMessage = await response.json();
    // Check if the error is due to an existing email
    if (response.status === 400 && errorMessage.message === "Email already in use") {
      return { success: false, message: "Email is already in use" };
    } else {
      // Other error occurred
      return { success: false, message: "Error creating user" };
    }
  }
}



async function loginUser(email, password) {
  try {
      console.log(email, password);
        const response = await fetch(`${endpoint}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
      const data = await response.json();
          const { user } = data; // Extract the user object from the response data
        return user;
        } else {
            throw new Error(`Login failed: ${response.statusText}`);
        }
    } catch (error) {
        throw new Error(`Error during login: ${error.message}`);
    }
}


export { getAllUsers, createUser, allUsers, endpoint, loginUser };
