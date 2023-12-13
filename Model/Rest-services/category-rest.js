import Category from "../Category.js";
import Product from "../Product.js";

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
  return allCategories;
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

async function getCategoryWithProducts(categoryId) {
  const response = await fetch(`${endpoint}/categories/${categoryId}`);
  const data = await response.json();

  const category = new Category(data.category);
  const products = data.products.map((jsonObj) => new Product(jsonObj));

  return { category, products };
}
export { getAllCategories, getSomeCategories, getCategoryWithProducts, endpoint };
