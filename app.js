"use strict";

window.addEventListener("load", baddService);

function baddService() {
  console.log("baddService loaded!");
  toggleSearchBar();
}

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("dropbtn")) {
    var dropdown = e.target.nextElementSibling;
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
  } else {
    var openDropdowns = document.querySelectorAll(".dropdown-content");
    openDropdowns.forEach(function (dropdown) {
      if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
      }
    });
  }
});

// Function to toggle the search bar visibility
function toggleSearchBar() {
  const searchBar = document.querySelector(".search-bar");
  searchBar.style.display = searchBar.style.display === "block" ? "none" : "block";
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
