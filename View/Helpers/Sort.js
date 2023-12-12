import ListRenderer from "./ListRenderer.js";
import { productsLists } from "../../main.js";
import ProductRenderer from "./ProductRenderer.js";

function sortProducts() {
  document.querySelectorAll("[data-action='sort']").forEach((button) => {
    button.addEventListener("click", () => {
      // before sorting - remove .selected from previous selected header
      document.querySelector("[data-action=sort].selected")?.classList.remove("selected");

      // Determine the type of list based on button attributes
      const listType = button.dataset.sortList;
      let listToSort;

      if (listType === "products") {
        listToSort = productsLists;
      } else {
        // Handle other list types if needed
      }

      if (listToSort) {
        listToSort.sort(button.dataset.sortBy, button.dataset.sortDirection);

        // indicate selected sort header
        button.classList.add("selected");
        // indicate sort-direction on button
        button.dataset.sortDirection = listToSort.sortDir;

        // Update the rendered list
        const renderer = new ListRenderer(listToSort, "#products-container", ProductRenderer);
        renderer.render();
      }
    });
  });
}

export { sortProducts };
