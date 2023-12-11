import ItemRenderer from "./Itemrenderer.js";
import { cart, initializeCartView, saveCartToLocalStorage, htmlSide, initializeCartHtmlView } from "../../main.js";
export default class ProductCartRenderer extends ItemRenderer {
  render() {
    const cartItem = this.item;
    const total = cartItem.listPrice * cartItem.quantity; // Calculate the total price for the cart item
    const html = `
      <div class="cart-item">
        <img src="${cartItem.imageURLs}" alt="${cartItem.productName}">
        <h2>${cartItem.productName}</h2>
        <h3>${cartItem.listPrice}kr</h3>
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
    console.log(cart);
    cart.forEach((item) => {
      total += item.listPrice * item.quantity;
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
}
