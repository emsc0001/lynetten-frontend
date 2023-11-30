import Category from "../Model/Category.js";

const endpoint = "http://localhost:4444";

let allCategories = [];
let lastFetch = 0;

async function getAllCategories() {
  const now = Date.now();
  const timeSinceLastFetch = now - lastFetch;
  // Only fetch if more than 10 seconds has passed since last fetch
  if (timeSinceLastFetch > 10_000) {
    await refetchAllCaregories();
  }
  return allCategories;
}

async function refetchAllCaregories() {
  const response = await fetch(`${endpoint}/categories`);
  const originalJson = await response.json();
  allCategories = originalJson.map((jsonObj) => new Category(jsonObj));

  lastFetch = Date.now();
}

export { getAllCategories, endpoint };
