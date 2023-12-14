import ListRenderer from "./ListRenderer.js";
import { getSomeProducts } from "../../Model/Rest-services/products-rest.js";
import { products } from "../../main.js";

export default class Paginater extends ListRenderer {
  constructor(route, containerparent, itemRenderer, itemsPrPage) {
    super([], document.querySelector(containerparent), itemRenderer);

    this.containerParent = document.querySelector(containerparent);
    this.itemsPrPage = itemsPrPage;

    this.setPage(1);
    this.renderPageButtons();
  }

  setList(list) {
    // set list without sorting
    if (list) {
      this.list = list.map((item) => new this.itemRenderer(item));
    }
    this.render();
  }

  sort(sortBy, sortDir) {
    // if sorting by the same property as last time
    if (sortBy === this.sortBy) {
      // Toggle sort direction, ignore what sortDir is given
      this.sortDir = this.sortDir === "asc" ? "desc" : "asc";
    } else {
      if (sortDir) {
        this.sortDir = sortDir;
      } else {
        this.sortDir = "asc";
      }
    }
    // store sortBy in the property for next time
    this.sortBy = sortBy;

    this.setPage(this.page);
    this.renderPageButtons(); // Re-render the page buttons after sorting
  }

  async setPage(page) {
    console.log("Items on page", this.itemsPrPage);
    this.setList(await getSomeProducts(this.itemsPrPage, page));
  }

  renderPageButtons() {
    const totalNumberOfItems = products.length; // TODO: Find from backend
    // create a list of buttons - add them below the parent
    let html = '<div id="paginator">';
    for (let p = 0; p < totalNumberOfItems / this.itemsPrPage; p++) {
      html += `<a href="#">${p * this.itemsPrPage + 1}-${(p + 1) * this.itemsPrPage}</a> . `;
    }
    html += `</div>`;
    this.containerParent.insertAdjacentHTML("afterend", html);

    // create eventlisteners on "buttons"
    document.querySelectorAll("#paginator a").forEach((pageButton, index) => {
      pageButton.addEventListener("click", (event) => {
        event.preventDefault(); // avoid following links of submitting
        const page = index + 1;
        console.log("Clicked page: " + page);
        this.setPage(page);
      });
    });
  }
  sort(sortBy, sortDir) {
    if (sortBy === this.sortBy) {
      this.sortDir = this.sortDir === "asc" ? "desc" : "asc";
    } else {
      if (sortDir) {
        this.sortDir = sortDir;
      } else {
        this.sortDir = "asc";
      }
    }
    // store sortBy in property for next time
    this.sortBy = sortBy;

    // make direction into a number, to make it easier to flip
    const dir = this.sortDir === "asc" ? 1 : -1;

    // NOTE: sortFunctions MUST be arrow-functions, to keep the reference to this!
    const valueSortFunction = (a, b) => (a.item[this.sortBy] > b.item[this.sortBy] ? dir : -dir);
    const stringSortFunction = (a, b) => a.item[this.sortBy]?.localeCompare(b.item[this.sortBy]) * dir;

    // select between sortFunctions, depending on the type on the sortBy property in the first item in the list
    const sortFunction = typeof this.list[0].item[this.sortBy] === "string" ? stringSortFunction : valueSortFunction;

    // sort the list with the chosen sortFunction
    this.list.sort(sortFunction);

    // and re-render the list
    this.render();
  }
}
