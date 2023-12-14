// import ListRenderer from "../Renderer/ListRenderer.js";
// import ProductRenderer from "../Renderer/ProductRenderer.js";
// import { products } from "../../main.js";

// let productsLists = null;

// function handleSort() {
//   document.addEventListener("DOMContentLoaded", () => {
//     const sortSelect = document.getElementById("sort");
//     if (sortSelect) {
//       sortSelect.addEventListener("change", () => {
//         const selectedOption = sortSelect.options[sortSelect.selectedIndex];
//         const sortBy = selectedOption.dataset.sortBy;
//         const sortDirection = selectedOption.dataset.sortDirection;

//         // Call the sort function in ListRenderer with the selected options
//         if (productsLists) {
//           productsLists.sort(sortBy, sortDirection);
//           productsLists = new ListRenderer(products, "#products-container", ProductRenderer);
//           productsLists.render();
//         }
//       });
//     }
//   });
// }

// export default handleSort;
