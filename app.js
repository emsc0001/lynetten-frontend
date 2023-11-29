"use strict";

window.addEventListener("load", baddService);

function baddService() {
  console.log("baddService loaded!");
}

// Add this to your existing JavaScript file or create a new one
document.addEventListener("DOMContentLoaded", function () {
  const discountToggle = document.getElementById("discountToggle");
  const discountContent = document.getElementById("discountContent");

  discountToggle.addEventListener("click", function () {
    discountContent.style.display = discountContent.style.display === "block" ? "none" : "block";
  });
});

function applyDiscount() {
  // Add your logic to apply the discount here
  // You can access the discount code using document.getElementById("discountCode").value
}

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("dropbtn")) {
    let dropdown = e.target.nextElementSibling;
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
  } else {
    let openDropdowns = document.querySelectorAll(".dropdown-content");
    openDropdowns.forEach(function (dropdown) {
      if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
      }
    });
  }
});

// Place this script after your HTML or at the end of the body
function toggleSearchBar() {
  const searchBar = document.querySelector(".search-bar");
  searchBar.style.display = searchBar.style.display === "none" ? "block" : "none";
}

function search() {
  // Implement search functionality here
}

document.addEventListener("DOMContentLoaded", function () {
  let navItems = document.querySelectorAll(".nav-item");

  navItems.forEach(function (item) {
    item.addEventListener("click", function (event) {
      // Fjern 'active' klassen fra alle faner og tilføj den til den aktive fane
      navItems.forEach(function (navItem) {
        navItem.classList.remove("active");
      });
      item.classList.add("active");
    });
  });
});
