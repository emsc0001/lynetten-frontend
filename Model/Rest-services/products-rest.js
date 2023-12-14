import Product from "../Product.js";
// import Products from "../../main.js";

const endpoint = "http://localhost:4444";

let allProducts = [];
let lastFetch = 0;

async function getAllProducts() {
  const now = Date.now();
  const timeSinceLastFetch = now - lastFetch;
  // Only fetch if more than 10 seconds has passed since last fetch
  if (timeSinceLastFetch > 10_000) {
    await refetchAllProducts();
  }
  return allProducts;
}

async function getSomeProducts(limit, offset) {
  const response = await fetch(`${endpoint}/products?pageNum=${offset}&pageSize=${limit}`);
  const originalJson = await response.json();

  return originalJson.map((jsonObj) => new Product(jsonObj));
}

async function refetchAllProducts() {
  const response = await fetch(`${endpoint}/products`);
  const originalJson = await response.json();
  allProducts = originalJson.map((jsonObj) => new Product(jsonObj));

  lastFetch = Date.now();
}

async function updateProduct(product) {
    const json = JSON.stringify(product);
    const response = await fetch(`${endpoint}/products/${product.productId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: json,
    });

    await refetchAllProducts();

    return response.ok;
}

async function createProduct(product) {
  const json = JSON.stringify(product);
  console.log(json);
    const response = await fetch(`${endpoint}/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: json,
    });

    await refetchAllProducts();

    return response.ok;
}

async function deleteProduct(productId) {
    const response = await fetch(`${endpoint}/products/${productId}`, {
        method: "DELETE",
    });

    await refetchAllProducts();

    return response.ok;
}



export { getAllProducts, getSomeProducts, endpoint, updateProduct, createProduct, deleteProduct };
