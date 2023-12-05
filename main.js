"use strict";
import { endpoint, getAllProducts, getSomeProducts } from "./Controller/products-rest.js";
import { getAllCategories, getSomeCategories } from "./Controller/category-rest.js";

import ProductRenderer from "./View/Renderer/ProductRenderer.js";
import CategoryRenderer from "./View/Renderer/CategoryRenderer.js";
import Paginater from "./View/Renderer/Paginater.js";
import ListRenderer from "./View/Renderer/ListRenderer.js";

endpoint;

let products = [];
let categories = [];

let productsLists = null;
let categoriesLists = null;

//Order variables
let cart = [];
let guestOrderCreated = { value: false };

const htmlSide = window.location.pathname;

window.addEventListener("load", () => {
    loadCartFromLocalStorage();
    baddServiceApp();
});

async function baddServiceApp() {
  console.log("baddService loaded!");
  products = await getAllProducts();
  categories = await getAllCategories();

  console.log("number of products: " + products.length);
  console.log("number of categories: " + categories.length);

  if (htmlSide === '/products.html') {
   initializeProductViews() 
  } else {
    initializeOtherHtmlViews();
  }

}

function initializeOtherHtmlViews() {
    categoriesLists = new ListRenderer(categories, ".category-list", CategoryRenderer);
    categoriesLists.render();
}

function initializeProductViews() {
    productsLists = new Paginater(products, "#products-container", ProductRenderer, 10);
    productsLists.render();

    categoriesLists = new ListRenderer(categories, ".category-list", CategoryRenderer);
    categoriesLists.render();
}


// Load cart from localStorage
function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
}

// Save cart to localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId, listPrice) {
    // Check if the product already exists in the cart
    const existingProduct = cart.find((item) => item.productId === productId);

    if (existingProduct) {
        // If the product exists, increase its quantity
        existingProduct.quantity++;
    } else {
        // If the product doesn't exist, add it to the cart with a quantity of 1
        cart.push({ productId, listPrice , quantity: 1 });
    }

  console.log("Item added to cart:", cart); // Logging for demonstration
  
   saveCartToLocalStorage(); // Save cart to localStorage
}


export { addToCart, products, categories, guestOrderCreated };

export default {guestOrderCreated} // Export default so it can get modified in other files

// // Add this to your existing JavaScript file or create a new one
// document.addEventListener("DOMContentLoaded", function () {
//   const discountToggle = document.getElementById("discountToggle");
//   const discountContent = document.getElementById("discountContent");

//   discountToggle.addEventListener("click", function () {
//     discountContent.style.display = discountContent.style.display === "block" ? "none" : "block";
//   });
// });

// function applyDiscount() {
//   // Add your logic to apply the discount here
//   // You can access the discount code using document.getElementById("discountCode").value
// }

// document.addEventListener("click", function (e) {
//   if (e.target.classList.contains("dropbtn")) {
//     let dropdown = e.target.nextElementSibling;
//     dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
//   } else {
//     let openDropdowns = document.querySelectorAll(".dropdown-content");
//     openDropdowns.forEach(function (dropdown) {
//       if (dropdown.style.display === "block") {
//         dropdown.style.display = "none";
//       }
//     });
//   }
// });

// // Place this script after your HTML or at the end of the body
// function toggleSearchBar() {
//   const searchBar = document.querySelector(".search-bar");
//   searchBar.style.display = searchBar.style.display === "none" ? "block" : "none";
// }

// function search() {
//   // Implement search functionality here
// }

// document.addEventListener("DOMContentLoaded", function () {
//   let navItems = document.querySelectorAll(".nav-item");

//   navItems.forEach(function (item) {
//     item.addEventListener("click", function (event) {
//       // Fjern 'active' klassen fra alle faner og tilføj den til den aktive fane
//       navItems.forEach(function (navItem) {
//         navItem.classList.remove("active");
//       });
//       item.classList.add("active");
//     });
//   });
// });







