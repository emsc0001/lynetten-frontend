import ItemRenderer from "./Itemrenderer.js";
import * as controller from "../../main.js";
import * as guestOrderController from "../../Model/Rest-services/guestOrder-rest.js";
import { createOrder } from "../../Model/Rest-services/order-rest.js";
import { getCategoryWithProducts } from "../../Model/Rest-services/category-rest.js";
import ProductDialog from "../Dialogs/ProductDialog.js";
import addToCart from "../../Controller/addToCart.js";

export default class ProductRenderer extends ItemRenderer {
  render() {
    const product = this.item;
    const html = /*html*/ `
      <article class="product">
        <div class="product-item">
          <img id="product-image"src="${product.imageURLs}" alt="${product.productName}">
          <h2 id="product-name">${product.productName}</h2>
          <h4 id="product-number">${product.productNumber}</h4>
          <h3 id="product-list-price">${product.listPrice}kr</h3>
          <button class="button" data-id="${product.productId}">Add to Cart</button>
          </div>
      </article>
    `;
    return html;
  }

  static async updateProductsByCategory(categoryId) {
    // Hent kategori og produkter baseret på categoryId
    const { products } = await getCategoryWithProducts(categoryId);
    // Logik for at opdatere produkterne baseret på kategori
    console.log("Products for category ID", categoryId, products);
    // Opdater visningen med de nye produkter
    const productsContainer = document.querySelector("#products-container");
    productsContainer.innerHTML = ""; // Ryd indholdet

    controller.setProductList(products);
    controller.setCategoryList(controller.categories);
  }

  postRender(element) {
    const product = this.item;
    element.querySelector(".button").addEventListener("click", async (event) => {
      event.preventDefault();
      event.stopPropagation();
      try {
        if (controller.loggedInUser) {
          // Check if the cart exists and has at least one item
          const orderId = controller.cart[0]?.orderId;
          console.log("Order ID:", orderId);
          if (!orderId) {
            // Create a new order if no order ID exists
            const orderDate = new Date().toISOString().slice(0, 10);
            const newOrderId = await createOrder(orderDate, controller.loggedInUser.userId);
            addToCart(product.productId, product.listPrice, product.productName, product.imageURLs, product.categories, newOrderId, null);
          } else {
            // Add item to existing order
            addToCart(product.productId, product.listPrice, product.productName, product.imageURLs,  product.categories, orderId, null);
          }
        } else {
          const guestOrderId = controller.cart[0]?.guestOrderId;
          console.log("Guest order ID:", guestOrderId);
          if (!guestOrderId) {
            // Create a new guest order if no order ID exists
            const orderDate = new Date().toISOString().slice(0, 10);
            const newGuestOrderId = await guestOrderController.createGuestOrder(orderDate);
            addToCart(product.productId, product.listPrice, product.productName, product.imageURLs, product.categories,  null, newGuestOrderId);
          } else {
            // Add item to existing guest order
            addToCart(product.productId, product.listPrice, product.productName, product.imageURLs, product.categories, null, guestOrderId);
          }
        }
      } catch (error) {
        console.error("Error handling item addition to cart:", error);
      }
    });
  }
  static handleProductClick(element) {
    const productNumber = element.querySelector("#product-number").textContent;
    const product = controller.products.find((product) => product.productNumber === productNumber);
    console.log(product);
    // Create and show the product dialog
    const dialog = new ProductDialog("product-dialog");
    const dialogHTML = dialog.renderHTML(product);

    // Insert the dialog HTML into the DOM
    dialog.dialog.innerHTML = dialogHTML; // Set HTML directly to the dialog container
    // Show the dialog
    dialog.show();

    //dialog close
    dialog.dialog.querySelector(".closeModal").addEventListener("click", (event) => {
      event.preventDefault();
      dialog.close();
    });
  }
}
