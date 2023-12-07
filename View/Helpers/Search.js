// import { updatedListArtist } from "../../frontend.js";
import { updateProductList } from "../../main.js";
import { endpoint } from "../../Model/Rest-services/products-rest.js";

import ProductRenderer from "../Renderer/ProductRenderer.js";

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
    } else {
        // If the search query is empty, reset the product list to show all products
        updateProductList(event);
    }
}

export { handleSearch };
