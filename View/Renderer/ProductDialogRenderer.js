import ItemRenderer from "./Itemrenderer.js";
import * as controller from "../../main.js";

export default class ProductDialogRenderer extends ItemRenderer {
  render() {
    const productDialog = this.item;
    const html = /*html*/ `
<table class="product-info">
<thead>
<tr>
<th>${productDialog.imageURLs}</th>
<th>${productDialog.productNumber}</th>
<th>${productDialog.productName}</th>
<th>${productDialog.listPrice}</th>
<th>${productDialog.offerPrice}</th>
<th>${productDialog.stockQuantity}</th>
<th>${productDialog.description}</th>
</tr>
`;
    return html;
  }

  postRender(element) {}
}
