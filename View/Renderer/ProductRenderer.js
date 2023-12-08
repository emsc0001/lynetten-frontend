import ItemRenderer from "./Itemrenderer.js";
import * as controller from "../../main.js";
import * as guestOrderController from "../../Model/Rest-services/guestOrder-rest.js";
import { getCategoryWithProducts } from "../../Model/Rest-services/category-rest.js";
import ListRenderer from "../Renderer/ListRenderer.js";

export default class ProductRenderer extends ItemRenderer {
  render() {
    const product = this.item;
    const html = /*html*/ `
      <article class="product">
        <div class="product-item">
          <img src="${product.imageURLs}" alt="${product.productName}">
          <h2>${product.productName}</h2>
          <h4>${product.productNumber}</h4>
          <h3>${product.listPrice}kr</h3>
          <button class="button" data-id="${product.productId}">Add to Cart</button>
        </div>
      </article>
    `;
    return html;
  }

  postRender(element) {
    const product = this.item;
    element.querySelector(".button").addEventListener("click", async (event) => {
      event.preventDefault();
      try {
        const orderDate = new Date().toISOString().slice(0, 10);
        const guestOrderId = await guestOrderController.createGuestOrder(orderDate);

        // Checks if the guest order is already created
        if (!controller.guestOrderCreated.value) {
          console.log(guestOrderId);
          if (guestOrderId) {
            // Marks the guest order as created and adds the item to the cart
            controller.guestOrderCreated.value = true;
            controller.addToCart(product.productId, product.listPrice, product.productName, product.imageURLs, guestOrderId);
          } else {
            console.error("Failed to create guest order");
          }
        } else {
          // If the guest order is already created, adds the item to the cart directly
          controller.addToCart(product.productId, product.listPrice, product.productName, product.imageURLs, guestOrderId);
        }
      } catch (error) {
        console.error("Error creating guest order:", error);
      }
    });
  }

  static async updateProductsByCategory(categoryId) {
    // Hent kategori og produkter baseret på categoryId
    const { category, products } = await getCategoryWithProducts(categoryId);

    // Logik for at opdatere produkterne baseret på kategori
    console.log("Category:", category);
    console.log("Products for category ID", categoryId, products);

    // Opdater visningen med de nye produkter
    const productsContainer = document.querySelector("#products-container");
    productsContainer.innerHTML = ""; // Ryd indholdet

    if (products && products.length > 0) {
      // Render produkterne baseret på kategori
      const productsLists = new ListRenderer(products, "#products-container", ProductRenderer);
      productsLists.render();
    } else {
      // Hvis der ikke er nogen produkter, vis en passende meddelelse
      productsContainer.innerHTML = "<p>Ingen produkter fundet.</p>";
    }
  }
}
