import accessibleAutocomplete from "accessible-autocomplete";

const formElement = document.querySelector(".search-form");

const planets = [
  "Earth",
  "Jupiter",
  "Mars",
  "Venus",
  "Saturn",
  "Mercury",
  "Uranus",
  "Neptune",
];

accessibleAutocomplete({
  element: document.querySelector(".origin-container"),
  id: "origin",
  source: planets,
  name: "origin",
  placeholder: "Earth",
  displayMenu: "overlay",
  showNoOptionsFound: true,
  showAllValues: true,
});

accessibleAutocomplete({
  element: document.querySelector(".destination-container"),
  id: "destination",
  source: planets,
  name: "destination",
  placeholder: "Mars",
  displayMenu: "overlay",
  showNoOptionsFound: true,
  showAllValues: true,
});

function closeButtonClicked() {
  formElement.classList.remove("selected--mobile");
  const menuItems = document.querySelectorAll(".autocomplete__menu");
  if (menuItems) {
    menuItems.forEach(function (menuItem) {
      menuItem.classList.remove("autocomplete__menu--visible");

      menuItem.classList.add("autocomplete__menu--hidden");
    });
  }
}

function addInputEventListeners(el) {
  el.addEventListener("focus", function (e) {
    if (window.matchMedia("(max-width: 1120px)").matches) {
      formElement.classList.remove("selected--desktop");
      formElement.classList.add("selected--mobile");
    } else {
      formElement.classList.remove("selected--mobile");
      formElement.classList.add("selected--desktop");
    }
  });

  el.addEventListener("focusout", function () {
    formElement.classList.remove("selected--desktop");
  });
}

function checkTab(e) {
  if (e.keyCode === 9) {
    document.body.classList.add("user-tabbing");
  }
}

function mouseDetected() {
  document.body.classList.remove("user-tabbing");
}

document
  .querySelector(".close-btn")
  .addEventListener("click", closeButtonClicked);

document
  .querySelectorAll(".autocomplete__input")
  .forEach(addInputEventListeners);

window.addEventListener("keydown", checkTab);
window.addEventListener("mousedown", mouseDetected);
