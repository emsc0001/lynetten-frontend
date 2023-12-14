import { endpoint } from "../../Model/Rest-services/products-rest.js";
import { products } from "../../main.js";
import ListRenderer from "../Renderer/ListRenderer.js";
import ProductRenderer from "../Renderer/ProductRenderer.js";
import Paginater from "../Renderer/Paginater.js";

let productsLists = null;

document.addEventListener("DOMContentLoaded", function () {
  const searchIcon = document.querySelector(".search-icon");
  const searchBar = document.querySelector(".search-bar");

  searchIcon.addEventListener("click", function () {
    searchBar.classList.toggle("active");
  });
});

async function handleSearch(event) {
  // Get the search query from the input field
  const searchInput = event.target;
  const searchQuery = searchInput.value;

  // Get the search type from the data attribute
  const searchType = searchInput.getAttribute("data-search-type");

  // Send a request to the backend if the query is not empty
  if (searchQuery) {
    const response = await fetch(`${endpoint}/search/${searchQuery}`);

    if (response.ok) {
      const data = await response.json();

      // Check if the search type is 'products'
      if (searchType === "Products") {
        // Update the products list with the search results
        updateProductList(data.products);
      }
    } else {
      console.error("Search request failed");
    }
  } else if (searchQuery === "") {
    showAllProducts(products);
  } else {
    // If the Search query is empty, show products not found
    updateProductList(event);
  }
}

function updateProductList(searchResults) {
  // Get the container for products
  const productsContainer = document.querySelector("#products-container");

  // Remove existing pagination
  const existingPagination = document.querySelector("#paginator");
  if (existingPagination) {
    existingPagination.remove();
  }

  // Clear the existing content
  productsContainer.innerHTML = "";

  // Check if there are search results
  if (searchResults && searchResults.length > 0) {
    // Render the updated list of products
    productsLists = new ListRenderer(searchResults, "#products-container", ProductRenderer);
    productsLists.render();
  } else {
    // If there are no search results, show a message "No products found"
    productsContainer.innerHTML = `<p>Ingen produkter fundet😔</p>`;
  }
}

//If the search bar is empty, show all products
function showAllProducts() {
  const productsContainer = document.querySelector("#products-container");
  productsContainer.innerHTML = "";
  productsLists = new Paginater(products, "#products-container", ProductRenderer, 10);
  productsLists.render();
}

export { handleSearch };
