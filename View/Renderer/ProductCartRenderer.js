import ItemRenderer from "./Itemrenderer.js";
import { cart, saveCartToLocalStorage, htmlSide, loggedInUser, categories, products } from "../../main.js";
import { initializeCartHtmlView, initializeCartView } from "../HtmlChangers/initializeCartViews.js";
import { getCategoryWithProducts} from "../../Model/Rest-services/category-rest.js";
import addToCart from "../../Controller/addToCart.js";
import { createOrder } from "../../Model/Rest-services/order-rest.js";
import { createGuestOrder } from "../../Model/Rest-services/guestOrder-rest.js";

export default class ProductCartRenderer extends ItemRenderer {
  
    render() {
        const cartItem = this.item;
        const price = cartItem.offerPrice || cartItem.listPrice; // Use offer price if available, otherwise use list price
        const total = price * cartItem.quantity; // Calculate the total price for the cart item

        const html = `
    <div class="cart-item">
      <img src="${cartItem.imageURLs}" alt="${cartItem.productName}">
      <h2>${cartItem.productName}</h2>
      <h3>${price}kr</h3> <!-- Display the calculated price -->
      <div class="quantity">
        <button class="minus-button" data-id="${cartItem.productId}">-</button>
        <input type="number" value="${cartItem.quantity}" disabled>
        <button class="plus-button" data-id="${cartItem.productId}">+</button>
      </div>
      <p>Total: ${total}kr</p>
      <button class="remove-button" data-id="${cartItem.productId}">Fjern</button>
    </div>
  `;

        return html;
    }

    async renderRecomendationCartHtml(cart) {
        let allHtml = "";
        for (const cartItem of cart) {
            const categoryName = cartItem.categories;
            //find categories id
            const category = categories.find((item) => item.categoryName === categoryName);
            const categoryProducts = await getCategoryWithProducts(category.categoryId);
            for (let i = 0; i < categoryProducts.products.length && i < 4; i++) {
                const html = `
        <div class="recommended-cart-item">
          <img src="${categoryProducts.products[i].imageURLs}" alt="${categoryProducts.products[i].productName}">
          <h2>${categoryProducts.products[i].productName}</h2>
          <h3>${categoryProducts.products[i].listPrice}kr</h3>
          <button class="add-button" data-id="${categoryProducts.products[i].productId}">Tilføj</button>
        </div>
      `;
                allHtml += html;
            }
            return allHtml;
        }
        this.addRecommendedItemsListeners();
    }

    renderTotalPriceCart() {
        const cartTotal = ProductCartRenderer.calculateTotal(cart); // Calculate the total price for the cart
        const totalPriceHTML = `
            <div class="cart-total">
                <p>Pris i alt: ${cartTotal} kr</p>
                <a href="kurv.html" class="go-to-cart-link">Gå til kurv</a>
            </div>
        `;
        return totalPriceHTML;
    }

    renderTotalPriceCartHtml() {
        const cartTotal = ProductCartRenderer.calculateTotal(cart); // Calculate the total price for the cart
        const totalPriceHTML = `
        <p>Pris i alt: ${cartTotal}kr</p>
        <a href="payment.html"><button class="checkout-button">Gå til betaling</button></a>
        `;
        return totalPriceHTML;
    }

    static calculateTotal(cart) {
        let total = 0;
        cart.forEach((item) => {
            const price = item.offerPrice || item.listPrice; // Use offer price if available, otherwise use list price
            total += price * item.quantity;
        });
        return total;
    }

    postRender(element) {
        const productId = this.item.productId; // Assuming productId is part of the cart item

        // Decrease quantity button event
        element.querySelector(".minus-button").addEventListener("click", () => {
            const cartItem = cart.find((item) => item.productId === productId);
            if (cartItem && cartItem.quantity > 1) {
                cartItem.quantity--;
                this.render(); // Rerender the cart after updating the quantity
                saveCartToLocalStorage(); // Save the updated cart to localStorage
                if (htmlSide === "/kurv.html") {
                    initializeCartHtmlView();
                } else {
                    initializeCartView();
                }
            } else if (cartItem && cartItem.quantity === 1) {
                // If the quantity is 1, remove the item from the cart
                const cartIndex = cart.findIndex((item) => item.productId === productId);
                if (cartIndex !== -1) {
                    cart.splice(cartIndex, 1); // Remove the item from the cart
                    this.render(); // Rerender the cart after removing the item
                    saveCartToLocalStorage(); // Save the updated cart to localStorage
                    if (htmlSide === "/kurv.html") {
                        initializeCartHtmlView();
                    } else {
                        initializeCartView();
                    }
                }
            }
        });

        // Increase quantity button event
        element.querySelector(".plus-button").addEventListener("click", () => {
            const cartItem = cart.find((item) => item.productId === productId);
            if (cartItem) {
                cartItem.quantity++;
                this.render(); // Rerender the cart after updating the quantity
                saveCartToLocalStorage(); // Save the updated cart to localStorage
                if (htmlSide === "/kurv.html") {
                    initializeCartHtmlView();
                } else {
                    initializeCartView();
                }
            }
        });

        // Remove item button event
        element.querySelector(".remove-button").addEventListener("click", () => {
            const cartIndex = cart.findIndex((item) => item.productId === productId);
            if (cartIndex !== -1) {
                cart.splice(cartIndex, 1); // Remove the item from the cart
                this.render(); // Rerender the cart after removing the item
                saveCartToLocalStorage(); // Save the updated cart to localStorage
                if (htmlSide === "/kurv.html") {
                    initializeCartHtmlView();
                } else {
                    initializeCartView();
                }
            }
        });
    }

    addRecommendedItemsListeners() {
        const addButtonElements = document.querySelectorAll(".recommended-cart-item .add-button");
        addButtonElements.forEach((button) => {
            button.addEventListener("click", async (event) => {
                event.preventDefault();
                event.stopPropagation();
                const productId = Number(button.dataset.id);
                //find product
                const product = products.find((item) => item.productId === productId);

                try {
                    if (loggedInUser) {
                        // Check if the cart exists and has at least one item
                        const orderId = cart[0]?.orderId;
                        if (!orderId) {
                            // Create a new order if no order ID exists
                            const orderDate = new Date().toISOString().slice(0, 10);
                            const newOrderId = await createOrder(orderDate, loggedInUser.userId);
                            addToCart(productId, product.listPrice, product.productName, product.imageURLs, newOrderId, null);
                        } else {
                            // Add item to existing order
                            addToCart(productId, product.listPrice, product.productName, product.imageURLs, orderId, null);
                        }
                    } else {
                        const guestOrderId = cart[0]?.guestOrderId;
                        if (!guestOrderId) {
                            // Create a new guest order if no order ID exists
                            const orderDate = new Date().toISOString().slice(0, 10);
                            const newGuestOrderId = await createGuestOrder(orderDate);
                            addToCart(productId, product.listPrice, product.productName, product.imageURLs, null, newGuestOrderId);
                        } else {
                            // Add item to existing guest order
                            addToCart(productId, product.listPrice, product.productName, product.imageURLs, null, guestOrderId);
                        }
                    }
                } catch (error) {
                    console.error("Error handling item addition to cart:", error);
                }
            });
        });
    }
}
