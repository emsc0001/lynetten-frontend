import Category from "../Model/Category.js";

const endpoint = "http://localhost:4444";

let allCategories = [];
let lastFetch = 0;

async function getAllCategories() {
  const now = Date.now();
  const timeSinceLastFetch = now - lastFetch;
  // Only fetch if more than 10 seconds has passed since the last fetch
  if (timeSinceLastFetch > 10_000) {
    await refetchAllCategories();
  }
    return allCategories
}

async function getSomeCategories(limit, offset) {
  const response = await fetch(`${endpoint}/categories?pageNum=${offset}&pageSize=${limit}`);
  const originalJson = await response.json();

  return originalJson.map((jsonObj) => new Category(jsonObj));
}

async function refetchAllCategories() {
  const response = await fetch(`${endpoint}/categories`);
  const originalJson = await response.json();
  allCategories = originalJson.map((jsonObj) => new Category(jsonObj));

  lastFetch = Date.now();
}

export { getAllCategories, getSomeCategories, endpoint };
