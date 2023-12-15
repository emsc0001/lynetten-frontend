"use strict";
import { endpoint, getAllProducts } from "./Model/Rest-services/products-rest.js";
import { getAllCategories, getCategoryWithProducts } from "./Model/Rest-services/category-rest.js";
import { getAllUsers } from "./Model/Rest-services/user-rest.js";

import UserCreateDialog from "./View/Dialogs/CreateUserDialog.js";
import UserLoginDialog from "./View/Dialogs/UserLoginDialog.js";
import loggedInHtmlChange from "./View/HtmlChangers/loggedInHtmlChange.js";

import { handleSearch } from "./View/Helpers/Search.js";

import ProductRenderer from "./View/Renderer/ProductRenderer.js";
import CategoryRenderer from "./View/Renderer/CategoryRenderer.js";
import Paginater from "./View/Renderer/Paginater.js";
import ListRenderer from "./View/Renderer/ListRenderer.js";
import { initializeCartView, initializeCartHtmlView } from "./View/HtmlChangers/initializeCartViews.js";

import { payNowClicked } from "./Controller/payment.js";
import enablePayNowButton from "./View/HtmlChangers/validateCheckout.js";

endpoint;

let products = [];
let categories = [];

let productsLists = null;
let categoriesLists = null;

//User variables
let users = [];
let UsersLoginDialog = null;
let CreateUserDialog = null;
let loggedInUser = null;

//Order variables
let cart = [];
const htmlSide = window.location.pathname;

window.addEventListener("load", () => {
  baddServiceApp();
  checkLoginStatus();
  loadCartFromLocalStorage();
});

async function baddServiceApp() {
  console.log("baddService loaded!");
  products = await getAllProducts();
  categories = await getAllCategories();
  users = await getAllUsers();

  console.log("Number Of Products: " + products.length);
  console.log("Number Of Categories: " + categories.length);
  console.log("Number Of Users: " + users.length);

  if (htmlSide === "/products.html") {
    initializeCartView();
    // search event listener
    document.querySelector("[data-search-type]").addEventListener("input", handleSearch);

    // document.querySelector("[data-sort-list]").addEventListener("change", handleSort);

    // Category directory //
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get("categoryId");
    if (categoryId) {
      await ProductRenderer.updateProductsByCategory(categoryId);
    } else {
      initializeProductViews();
    }
  } else if (htmlSide === "/kurv.html") {
    initializeCartHtmlView();
  } else if (htmlSide === "/payment.html") {
    document.addEventListener("DOMContentLoaded", () => {
      enablePayNowButton();
    });
    document.querySelector("#pay-now-button").addEventListener("click", payNowClicked); // Event listener for pay now button
    document.querySelector("#shipping-details-form-button").addEventListener("click", (event) => {
      event.preventDefault();
      document.querySelector("#payment-form").scrollIntoView({ behavior: "smooth" });
    }); // Scroll to the payment form
  } else {
    initializeOtherHtmlViews();
    initializeCartView();
  }

  if (loggedInUser) {
    loggedInHtmlChange();
    document.querySelector("#logout").addEventListener("click", logout);
  }
}

//Initiliaze views for koebeguide.html, handelsBetingelser and index.html
async function initializeOtherHtmlViews() {
  // initialize Category Views //
  const hey = document.querySelector(".category-list");
  categoriesLists = new ListRenderer(categories, ".category-list", CategoryRenderer);
  categoriesLists.render();

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

      // Redirect til products.html med det valgte categoryId som query parameter
      window.location.href = `products.html?categoryId=${categoryId}`;
    });
  });

  // LOGIN USER DIALOG //
  UsersLoginDialog = new UserLoginDialog("user-login-dialog");
  UsersLoginDialog.render();

  const userLogin = document.querySelector("#logIn");

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
}

//------------Initiliaze views for products.html---------------//
function initializeProductViews() {
  productsLists = new Paginater(products, "#products-container", ProductRenderer, 10);
  productsLists.render();

  // initialize Category Views //
  categoriesLists = new ListRenderer(categories, ".category-list", CategoryRenderer);
  categoriesLists.render();

  // initialize Products views based on sidebar Categories  //
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

  // ------------ Click event for product dialog --------------//
  const productGrid = document.querySelector("#products-container");
  productGrid.addEventListener("click", (event) => {
    const productElement = event.target.closest(".product");
    if (productElement) {
      ProductRenderer.handleProductClick(productElement);
    }
  });

  //----------- LOGIN USER DIALOG -----------------//
  UsersLoginDialog = new UserLoginDialog("user-login-dialog");
  UsersLoginDialog.render();

  const userLogin = document.querySelector("#logIn");

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
}

// ----------------Sets product and category list-----------------//
function setProductList(products) {
  productsLists = new ListRenderer(products, "#products-container", ProductRenderer, 10);
  productsLists.render();
  const productGrid = document.querySelector("#products-container");
  productGrid.addEventListener("click", (event) => {
    const productElement = event.target.closest(".product");
    if (productElement) {
      ProductRenderer.handleProductClick(productElement);
    }
  });
}

function setCategoryList(categories) {
  categoriesLists = new ListRenderer(categories, ".category-list", CategoryRenderer);
  categoriesLists.render();

  const categoryLinks = document.querySelectorAll(".category-list a");
  categoryLinks.forEach((categoryLink) => {
    categoryLink.addEventListener("click", async (event) => {
      event.preventDefault();
      const categoryId = categoryLink.dataset.categoryId;

      // Brug den nye funktion til at hente kategori og produkter
      const { category, products } = await getCategoryWithProducts(categoryId);

      console.log("Category:", category);
      console.log("Products for category ID", categoryId, products);
      productsLists = new ListRenderer(products, "#products-container", ProductRenderer);
      productsLists.render();
    });
  });
}

// -----Sort EventListener----- //
document.addEventListener("DOMContentLoaded", () => {
  const sortSelect = document.getElementById("sort");
  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      const selectedOption = sortSelect.options[sortSelect.selectedIndex];
      const sortBy = selectedOption.dataset.sortBy;
      const sortDirection = selectedOption.dataset.sortDirection;

      // Call the sort function in ListRenderer with the selected options
      if (productsLists) {
        const sortedProducts = productsLists.sort(sortBy, sortDirection);
        console.log("Sorted products");
        productsLists.render(sortedProducts);
      }
    });
  }
});

function logout() {
  // Clear user-related data
  localStorage.removeItem("loggedInUser"); // Remove user-related stored data
  localStorage.removeItem("cart"); // Remove any cart data associated with the user

  // Reset the application state
  window.location.href = "lynetten-frontend/index.html"; // Redirect to the home page
  loggedInHtmlChange();
}

// ------Check login status------//

function checkLoginStatus() {
  const loggedInUserInfo = localStorage.getItem("loggedInUser");
  if (loggedInUserInfo) {
    loggedInUser = JSON.parse(loggedInUserInfo);
    // Store the logged-in user ID in a global variable

    // Checks if the html has an element with id "loggedInUserInfo" and then puts the email in the element
    const loggedInEmailHtmlId = document.getElementById("loggedInUserInfo");
    if (loggedInEmailHtmlId) {
      // Handle updating the UI with the logged-in user information if needed
      loggedInEmailHtmlId.innerHTML = `Logged in as ${loggedInUser.email}`;
    }

    // User is logged in, perform actions based on the logged-in user
    console.log("Logged in user:", loggedInUser);
  } else {
    // User is not logged in, perform actions for guests
    console.log("User is not logged in");
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

// Save cart to localStorage
function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Købeguide Beskrivelser
document.addEventListener("DOMContentLoaded", function () {
  var collapsibles = document.getElementsByClassName("collapsible");
  for (let i = 0; i < collapsibles.length; i++) {
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

// MAP
let myMap = L.map("interactive-map").setView([55.691046, 12.599752], 13); // Replace with your coordinates

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap contributors",
}).addTo(myMap);

export { products, categories, cart, saveCartToLocalStorage, htmlSide, users, loggedInUser, productsLists, setProductList, setCategoryList };
