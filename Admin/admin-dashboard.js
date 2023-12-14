"use strict";
import { getAllOrders } from "../Model/Rest-services/order-rest.js";
import { getAllGuestOrder } from "../Model/Rest-services/guestOrder-rest.js";
import { endpoint, getAllProducts, createProduct } from "../Model/Rest-services/products-rest.js";
import { getAllCategories, createCategory } from "../Model/Rest-services/category-rest.js";
import { getAllUsers } from "../Model/Rest-services/user-rest.js";

import ListRenderer from "../View/Renderer/ListRenderer.js";
import AdminProductRenderer from "../View/Renderer/AdminRenderer/AdminProductRenderer.js";
import AdminCategoryRenderer from "../View/Renderer/AdminRenderer/AdminCategoryRenderer.js";
import AdminUserRenderer from "../View/Renderer/AdminRenderer/AdminUserRenderer.js";
import AdminOrderRenderer from "../View/Renderer/AdminRenderer/AdminOrderRenderer.js";

// import deleteUnpaidOrders from "../Controller/deleteUnpaidOrders.js";

let products = [];
let categories = [];
let users = [];
let orders = [];

let productsLists = null;
let categoriesLists = null;
let usersLists = null;
let ordersLists = null;

window.addEventListener("load", () => {
    adminApp();
});

async function adminApp() {
    products = await getAllProducts();
    categories = await getAllCategories();
    users = await getAllUsers();
    //fetchs all orders and guest orders and concats them
    const [allOrders, allGuestOrders] = await Promise.all([getAllOrders(), getAllGuestOrder()]);
    orders = allOrders.concat(allGuestOrders);

    console.log("Number Of Products: " + products.length);
    console.log("Number Of Categories: " + categories.length);
    console.log("Number Of Users: " + users.length);

    // Event listeners for tabs
    document.getElementById("showProducts").addEventListener("click", () => showSection("productSection"));
    document.getElementById("showCategories").addEventListener("click", () => showSection("categoriesSection"));
    document.getElementById("showUsers").addEventListener("click", () => showSection("userSection"));
    document.getElementById("showOrders").addEventListener("click", () => showSection("orderSection"));
    // Event listeners for create product and category
    document.getElementById("createProductForm").addEventListener("submit", extractProductFromForm);
    document.getElementById("createCategoryForm").addEventListener("submit", extractCategoryFromForm);

    initializeAdminView();
}

async function initializeAdminView() {
    productsLists = new ListRenderer(products, "#product-list", AdminProductRenderer);
    categoriesLists = new ListRenderer(categories, "#category-list", AdminCategoryRenderer);
    usersLists = new ListRenderer(users, "#user-table-body", AdminUserRenderer);
    ordersLists = new ListRenderer(orders, "#order-table-body", AdminOrderRenderer);

    productsLists.render();
    categoriesLists.render();
    usersLists.render();
    ordersLists.render();

    //populate create dropdown
    populateCategoryDropdown("#productCategories", categories);
}

//extracts from form and calls createProduct in products-rest.js
async function extractProductFromForm() {
    const form = document.getElementById("createProductForm");
    const product = {
        productName: form.productName.value,
        productNumber: form.productNumber.value,
        listPrice: form.productPrice.value,
        offerPrice: form.offerPrice.value || null,
        stockQuantity: form.stockQuantity.value,
        imageURLs: form.imageURLs.value,
        description: form.description.value,
        categories: form.productCategories.value,
        colors: form.productColors.value,
    };

    const result = await createProduct(product);
    if (result) {
        products.push(product);
        productsLists.render();
    }
    return result;
}

//extracts from form and calls createCategory in category-rest.js
async function extractCategoryFromForm() {
    const form = document.getElementById("createCategoryForm");
    const category = {
        categoryName: form.categoryName.value,
    };

    const result = await createCategory(category);
    if (result) {
        categories.push(category);
        categoriesLists.render();
    }
    return result;
}

function hideAllSections() {
    document.getElementById("productSection").style.display = "none";
    document.getElementById("categoriesSection").style.display = "none";
    document.getElementById("userSection").style.display = "none";
    document.getElementById("orderSection").style.display = "none";
}

function showSection(sectionId) {
    hideAllSections();
    document.getElementById(sectionId).style.display = "block";
}

function populateCategoryDropdown(selector, data) {
    const dropdown = document.querySelector(selector);

    if (!dropdown) return; // Ensure the dropdown exists

    // Clear existing options
    dropdown.innerHTML = "";
    // Iterate through the data and create option elements
    data.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.categoryId;
        option.textContent = item.categoryName;

        dropdown.appendChild(option);
    });
}

export { populateCategoryDropdown, categories };
// function setupTabToggle() {
//     document.getElementById("showProducts").addEventListener("click", () => {
//         document.getElementById("productSection").style.display = "block";
//         document.getElementById("categoriesSection").style.display = "none";
//     });

//     document.getElementById("showCategories").addEventListener("click", () => {
//         document.getElementById("productSection").style.display = "none";
//         document.getElementById("categoriesSection").style.display = "block";
//     });
// }
