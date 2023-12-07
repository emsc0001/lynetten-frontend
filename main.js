"use strict";
import { endpoint, getAllProducts } from "./Model/Rest-services/products-rest.js";
import { getAllCategories, getCategoryWithProducts } from "./Model/Rest-services/category-rest.js";
import { getAllUsers } from "./Model/Rest-services/user-rest.js";

import UserCreateDialog from "./View/Dialogs/CreateUserDialog.js";
import UserLoginDialog from "./View/Dialogs/UserLoginDialog.js";
import ForgotPasswordDialog from "./View/Dialogs/ForgotPasswordDialog.js";

import { handleSearch } from "./View/Helpers/Search.js";

// import { createUser } from "./Controller/user-rest.js";
// import UserRenderer from "./View/Renderer/UserRenderer.js";

import ProductRenderer from "./View/Renderer/ProductRenderer.js";
import CategoryRenderer from "./View/Renderer/CategoryRenderer.js";
import UserRenderer from "./View/Renderer/UserRenderer.js";
import Paginater from "./View/Renderer/Paginater.js";
import ListRenderer from "./View/Renderer/ListRenderer.js";
import ProductCartRenderer from "./View/Renderer/ProductCartRenderer.js";

import { payNowClicked } from "./Controller/payment.js";
import enablePayNowButton from "./View/validateCheckout.js";

import { newsletter } from "./View/Nyhedsbrev.js";
// import { myMap } from "./View/map.js";

endpoint;

let products = [];
let categories = [];

let productsLists = null;
let categoriesLists = null;

//User variables
let users = [];
let usersLists = null;
let UsersLoginDialog = null;
let CreateUserDialog = null;
let PasswordForgotDialog = null;

//Order variables
let cart = [];
let cartList = null;
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
  users = await getAllUsers();

  console.log("Number Of Products: " + products.length);
  console.log("Number Of Categories: " + categories.length);
  console.log("Number Of Users: " + users.length);

  // Initialize the views based on html page
  if (htmlSide === "/products.html") {
    initializeProductViews();
    initializeCartView();
  } else if (htmlSide === "/kurv.html") {
    initializeCartHtmlView();
  } else if (htmlSide === "/payment.html") {
    document.addEventListener("DOMContentLoaded", () => {
      enablePayNowButton();
    });
    document.querySelector("#pay-now-button").addEventListener("click", payNowClicked);
  } else {
    initializeOtherHtmlViews();
    initializeCartView();
  }
}

//Initiliaze views for koebeguide.html, handelsBetingelser and index.html
function initializeOtherHtmlViews() {
  // initialize Category Views //
  categoriesLists = new ListRenderer(categories, ".category-list", CategoryRenderer);
  categoriesLists.render();

  // initialize User Views //
  usersLists = new ListRenderer(users, "#user-container", UserRenderer);
  usersLists.render();

  // LOGIN USER DIALOG //

  UsersLoginDialog = new UserLoginDialog("user-login-dialog");
  UsersLoginDialog.render();

  const userLogin = document.querySelector(".userLogin-container");

  userLogin.addEventListener("click", (event) => {
    event.preventDefault();
    UsersLoginDialog.show();
  });

  // CREATE USER DIALOG //
  CreateUserDialog = new UserCreateDialog("user-create-dialog");
  CreateUserDialog.render();

  const createUserLink = document.getElementById("createUserLogin");

  // Event listener to show the dialog when the link is clicked
  createUserLink.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the default link behavior (e.g., navigating to a new page)
    CreateUserDialog.show();
  });

  // FORGOT PASSWORD DIALOG //
  PasswordForgotDialog = new ForgotPasswordDialog("forgot-password-dialog");
  PasswordForgotDialog.render();

  const forgotPasswordLink = document.getElementById("forgotUserLogin");

  // Event listener to show the dialog when the link is clicked
  forgotPasswordLink.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the default link behavior (e.g., navigating to a new page)
    PasswordForgotDialog.show();
  });
  // newsletter();
}

//-----Initiliaze views for products.html-----//
function initializeProductViews() {
  productsLists = new Paginater(products, "#products-container", ProductRenderer, 10);
  productsLists.render();

  // initialize Category Views //
  categoriesLists = new ListRenderer(categories, ".category-list", CategoryRenderer);
  categoriesLists.render();

  // initialize Products views based on Categories  //

  const categoryLinks = document.querySelectorAll(".category-list a");
  categoryLinks.forEach((categoryLink) => {
    categoryLink.addEventListener("click", async (event) => {
      event.preventDefault();
      const categoryId = categoryLink.dataset.categoryId;

      // Brug den nye funktion til at hente kategori og produkter
      const { category, products } = await getCategoryWithProducts(categoryId);

      // Gør noget med kategori og produkter, f.eks. vis dem i konsollen
      console.log("Category:", category);
      console.log("Products for category ID", categoryId, products);

      productsLists = new ListRenderer(products, "#products-container", ProductRenderer);
      productsLists.render();
    });
  });
}

// -----Search EventListener------//

document.addEventListener("DOMContentLoaded", () => {
  const searchInputs = document.querySelectorAll("[data-search-type]");
  searchInputs.forEach((input) => {
    input.addEventListener("input", handleSearch);
  });
});

function updateProductList(searchResults) {
  // Get the container for products
  const productsContainer = document.querySelector("#products-container");

  // Remove existing pagination
  const existingPagination = document.querySelector("#paginator");
  if (existingPagination) {
    existingPagination.remove();
  }

  // Clear the existing content
  productsContainer.innerHTML = "";

  // Check if there are search results
  if (searchResults && searchResults.length > 0) {
    // Render the updated list of products
    productsLists = new ListRenderer(searchResults, "#products-container", ProductRenderer);
    productsLists.render();
  } else {
    // If there are no search results, render all products
    productsLists = new Paginater(products, "#products-container", ProductRenderer, 10);
    productsLists.render();
  }
}

// -------every function cart related-------//

// Load cart from localStorage
function loadCartFromLocalStorage() {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    cart = JSON.parse(storedCart);
  }
}
//Initiliaze views the cart for products.html, koebeguide.html, handelsBetingelser and index.html
function initializeCartView() {
  if (cart.length > 0) {
    cartList = new ListRenderer(cart, ".cart-items", ProductCartRenderer);
    cartList.render();
  } else {
    document.querySelector(".cart-items").innerHTML = "<p>Der er ingen varer i din kurv</p>";
  }
  const totalPriceSection = new ProductCartRenderer().renderTotalPriceCart();
  document.querySelector(".cart-total-container").innerHTML = totalPriceSection;
}

//Initiliaze views the cart for kurv.html
function initializeCartHtmlView() {
  if (cart.length > 0) {
    cartList = new ListRenderer(cart, ".cart-items", ProductCartRenderer);
    cartList.render();
  } else {
    document.querySelector(".cart-items").innerHTML = "<p>Der er ingen varer i din kurv</p>";
  }

  const totalPriceSection = new ProductCartRenderer().renderTotalPriceCartHtml();
  document.querySelector(".cart-summary").innerHTML = totalPriceSection;
}

function addToCart(productId, listPrice, productName, imageURLs, guestOrderId) {
  // Check if the product already exists in the cart
  const existingProduct = cart.find((item) => item.productId === productId);

  if (existingProduct) {
    // If the product exists, increase its quantity
    existingProduct.quantity++;
  } else {
    // If the product doesn't exist, add it to the cart with a quantity of 1
    cart.push({ productId, listPrice, productName, imageURLs, guestOrderId, quantity: 1 });
  }

  console.log("Item added to cart:", cart); // Logging for demonstration

  saveCartToLocalStorage(); // Save cart to localStorage
  console.log(htmlSide);
  if (htmlSide === "/kurv.html") {
    initializeCartHtmlView(); // Render the cart
  } else {
    initializeCartView(); // Render the cart
  }
}

// Købeguide Beskrivelser
document.addEventListener("DOMContentLoaded", function () {
  var collapsibles = document.getElementsByClassName("collapsible");
  for (var i = 0; i < collapsibles.length; i++) {
    collapsibles[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }
});

// Save cart to localStorage
function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Købeguide Beskrivelser
document.addEventListener("DOMContentLoaded", function () {
  var collapsibles = document.getElementsByClassName("collapsible");
  for (var i = 0; i < collapsibles.length; i++) {
    collapsibles[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }
});

export {
  addToCart,
  products,
  categories,
  guestOrderCreated,
  cart,
  saveCartToLocalStorage,
  initializeCartView,
  htmlSide,
  initializeCartHtmlView,
  updateProductList,
  usersLists,
  users,
};

export default { guestOrderCreated }; // Export default so it can get modified in other files

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

// Place this script after your HTML or at the end of the body

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

// MAP _____________________________

// var myMap = L.map("interactive-map").setView([55.691046, 12.599752], 13); // Replace with your coordinates

// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//   maxZoom: 19,
//   attribution: "© OpenStreetMap contributors",
// }).addTo(myMap);

// // NEWSLETTER ______________________

// document.addEventListener("DOMContentLoaded", function () {
//   // Check if the user has already subscribed in this session
//   if (!sessionStorage.getItem("subscribed")) {
//     setTimeout(function () {
//       document.getElementById("newsletter-popup").classList.add("show");
//     }, 2000);
//   }

//   // Handle form submission
//   document.getElementById("newsletter-form").addEventListener("submit", function (event) {
//     event.preventDefault();
//     document.getElementById("newsletter-form").classList.add("hidden");
//     document.getElementById("subscription-message").classList.remove("hidden");

//     // Set a flag in session storage
//     sessionStorage.setItem("subscribed", "true");

//     // Close the popup automatically after a delay
//     setTimeout(function () {
//       document.getElementById("newsletter-popup").classList.remove("show");
//     }, 3000); // Adjust time as needed
//   });

//   // Close button functionality
//   document.getElementById("close-popup").addEventListener("click", function () {
//     document.getElementById("newsletter-popup").classList.remove("show");
//   });
// });
