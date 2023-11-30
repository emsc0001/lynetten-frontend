import listRenderer from "./ListRenderer.js";
import { getSomeProducts } from "../../Controller/products-rest.js";
import ListRenderer from "./ListRenderer.js";

export default class Paginater extends ListRenderer {
    constructor(list, containerId, itemsPerPage) {
        super(list, containerId);
        this.itemsPerPage = itemsPerPage;
        this.currentPage = 0;
    }
    
    render() {
        this.renderPage(this.currentPage);
    }
    
    renderPage(pageNumber) {
        const start = pageNumber * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        const page = this.list.slice(start, end);
        super.render(page);
    }
    
    nextPage() {
        this.currentPage++;
        this.renderPage(this.currentPage);
    }
    
    previousPage() {
        this.currentPage--;
        this.renderPage(this.currentPage);
    }
}

