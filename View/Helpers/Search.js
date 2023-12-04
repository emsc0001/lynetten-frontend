// import { updatedListArtist } from "../../frontend.js";
import { updatedList } from "../../main.js";
import { endpoint } from "../../Controller/products-rest.js";

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
  console.log(searchQuery);

  // Get the search type from the data attribute
  const searchType = searchInput.getAttribute("data-search-type");

  // Send a request to the backend if the query is not empty
  if (searchQuery) {
    const response = await fetch(`${endpoint}/search?q=${searchQuery}`);

    if (response.ok) {
      const data = await response.json();
      if (searchType === "products") {
        updatedList(data.products, "#products-container", ProductRenderer);
      }
    } else {
      console.error("Search request failed");
    }
  }
}

export { handleSearch };
