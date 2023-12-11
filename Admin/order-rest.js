const orderEndpoint = "http://localhost:4444/orders";

let allOrders = [];
let lastOrderFetch = 0;

async function getAllOrders() {
  const now = Date.now();
  const timeSinceLastFetch = now - lastOrderFetch;

  // Only fetch if more than 10 seconds has passed since last fetch
  if (timeSinceLastFetch > 10_000) {
    await refetchAllOrders();
  }
  return allOrders;
}

async function getOrderById(orderId) {
  const response = await fetch(`${orderEndpoint}/${orderId}`);
  const data = await response.json();

  return data; // Assuming data is the order object
}

async function refetchAllOrders() {
  const response = await fetch(orderEndpoint);
  allOrders = await response.json();

  lastOrderFetch = Date.now();
}



import { getAllUsers } from './path/to/user-rest.js';

async function displayUsers() {
    const users = await getAllUsers();
    const userListElement = document.getElementById('user-list');
    
    // Assuming you have a function to convert user data to HTML
    userListElement.innerHTML = users.map(user => renderUser(user)).join('');
}

function renderUser(user) {
    // Convert the user object to HTML
    return `<div class="user-item">${user.name} - ${user.email}</div>`;
}

// Call this function to display users
displayUsers();

export { getAllOrders, getOrderById, orderEndpoint };