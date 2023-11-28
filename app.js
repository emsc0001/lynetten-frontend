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

// Tab til at skifte fra forside til handelsbetingelser
// document.addEventListener("DOMContentLoaded", function () {
//   let navItems = document.querySelectorAll(".nav-item");

//   navItems.forEach(function (item) {
//     item.addEventListener("click", function (event) {
//       event.preventDefault();

//       // Hent det data-tab-attribut fra det klikkede element
//       let tab = item.getAttribute("data-tab");

//       // Skjul alt indhold
//       hideAllContent();

//       // Vis det indhold, der svarer til den klikkede fane
//       showContent(tab);

//       // Fjern 'active' klassen fra alle faner og tilføj den til den aktive fane
//       navItems.forEach(function (navItem) {
//         navItem.classList.remove("active");
//       });
//       item.classList.add("active");
//     });
//   });

//   // Skjul alt indhold
//   function hideAllContent() {
//     let contents = document.querySelectorAll(".tab-content");
//     contents.forEach(function (content) {
//       content.style.display = "none";
//     });
//   }

//   // Vis specifikt indhold
//   function showContent(target) {
//     let content = document.getElementById(target);
//     if (content) {
//       content.style.display = "block";
//     }
//   }
// });
