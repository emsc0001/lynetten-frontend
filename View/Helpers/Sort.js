// function handleSortProducts() {
//   if (sortSelect) {
//     sortSelect.addEventListener("change", () => {
//       const selectedOption = sortSelect.options[sortSelect.selectedIndex];
//       const sortBy = selectedOption.dataset.sortBy;
//       const sortDirection = selectedOption.dataset.sortDirection;

//       // Call the sort function in ListRenderer with the selected options
//       if (productsLists) {
//         const sortedProducts = productsLists.sort(sortBy, sortDirection);
//         productsLists = new ListRenderer(sortedProducts, "#products-container", ProductRenderer);
//         productsLists.render();
//       }
//     });
//   }
// }

// export { handleSortProducts };
