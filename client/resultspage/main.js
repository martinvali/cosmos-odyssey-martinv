import accessibleAutocomplete from "accessible-autocomplete";

const searchForm = document.querySelector(".search-form");

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
  minLength: 2,
  defaultValue: searchForm.dataset.from || "",
});

accessibleAutocomplete({
  element: document.querySelector(".destination-container"),
  id: "destination",
  source: planets,
  name: "destination",
  placeholder: "Mars",
  displayMenu: "overlay",
  showNoOptionsFound: true,
  minLength: 2,
  defaultValue: searchForm.dataset.to || "",
});

function loadingAnimation() {
  document.querySelector(
    ".results-container"
  ).innerHTML = `<span class="loading-circle">&nbsp;</span>`;
}

function closeButtonClicked() {
  searchForm.classList.remove("selected--mobile");
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
      searchForm.classList.remove("selected--desktop");
      searchForm.classList.add("selected--mobile");
    } else {
      searchForm.classList.remove("selected--mobile");
      searchForm.classList.add("selected--desktop");
    }
  });

  el.addEventListener("focusout", function () {
    searchForm.classList.remove("selected--desktop");
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

function filterClicked() {
  document
    .querySelector(".filtering-options-container")
    .classList.add("visible");
}

function reservationCloseButtonClicked() {
  document.querySelector(".reservation-container").classList.remove("visible");
}

function sortValueChanged(e) {
  const sortValue = e.target.value;
  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.set("sort", sortValue);
  window.location = currentUrl;
  loadingAnimation();
}

function refreshPage() {
  const url = new URL(document.location.href);
  url.searchParams.delete("filter");
  document.querySelectorAll(".company-filter").forEach(function (checkbox) {
    if (!checkbox.checked) {
      url.searchParams.append("filter", checkbox.name);
    }
  });
  window.location.href = url;

  loadingAnimation();
}

function checkboxClicked(e) {
  if (window.matchMedia("(min-width: 1120px)").matches) {
    const eventTarget = e.target;
    if (!eventTarget.classList.contains("company-filter")) return;

    refreshPage();
  }
}

function filterCloseButtonClicked() {
  document
    .querySelector(".filtering-options-container")
    .classList.remove("visible");
  refreshPage();
}

function pricesUpdated() {
  document.querySelector(
    ".results-container"
  ).innerHTML = `<div class="refresh-container">
  <p class="refresh-text">
    The prices have been updated. Please refresh the page.
  </p>
  <button type="button" onclick="location.reload()" class="refresh-button">Refresh</button>
</div>`;
}

function reserveButtonClicked(e) {
  const targetElement = e.target;
  if (targetElement.classList.contains("reserve-button")) {
    const reservationElement = document.querySelector(".reservation-container");

    const resultArticle = targetElement.closest(".result-container");
    const id = resultArticle.querySelector(".reserve-button").dataset.id;
    const companyName =
      resultArticle.querySelector(".result-company").innerText;
    const travelTime =
      resultArticle.querySelector(".result-time-text").innerText;
    const travelPrice = resultArticle.querySelector(".result-price").innerText;
    const travelDates =
      resultArticle.querySelector(".result-dates-text").innerText;
    const reservationCompleteButton = reservationElement.querySelector(
      ".reservation-complete-button"
    );

    reservationCompleteButton.dataset.id = id;
    reservationCompleteButton.dataset.companyName = companyName;
    reservationCompleteButton.dataset.travelTime = travelTime;
    reservationCompleteButton.dataset.travelPrice = travelPrice;
    reservationCompleteButton.dataset.travelDates = travelDates;

    if (window.matchMedia("(min-width: 1120px)").matches) {
      resultArticle.appendChild(reservationElement);
    }
    reservationElement.classList.add("visible");
  }
}

function reservationSubmitted(e) {
  const formElement = e.target;
  const id = formElement.querySelector(".reservation-complete-button").dataset
    .id;
  const { from, to, distance } = searchForm.dataset;
  const { travelTime, travelPrice, companyName, travelDates } =
    document.querySelector(".reservation-complete-button").dataset;
  const extraData = [
    { id },
    { from },
    { to },
    { travelTime },
    { travelPrice },
    { travelDates },
    { companyName },
    { distance },
  ];
  extraData.forEach(function (data) {
    const input = document.createElement("input");
    input.style.display = "none";
    input.name = Object.keys(data)[0];
    input.value = Object.values(data)[0];
    formElement.appendChild(input);
  });
}

(function socketIO() {
  const socket = io("https://cosmos-odyssey-martinv.herokuapp.com/");
  socket.on("newPrices", pricesUpdated);
})();

document
  .querySelector(".close-btn")
  .addEventListener("click", closeButtonClicked);

document
  .querySelectorAll(".autocomplete__input")
  .forEach(addInputEventListeners);

document
  .querySelector(".filtering-button")
  .addEventListener("click", filterClicked);

document
  .querySelector(".filtering-close-button")
  .addEventListener("click", filterCloseButtonClicked);

document
  .querySelector(".reservation-close-button")
  .addEventListener("click", reservationCloseButtonClicked);

document
  .querySelector(".sorting-button")
  .addEventListener("change", sortValueChanged);

document
  .querySelector(".filtering-options")
  .addEventListener("change", checkboxClicked);

document
  .querySelector(".results-container")
  .addEventListener("click", reserveButtonClicked);

document
  .querySelector(".reservation-form")
  .addEventListener("submit", reservationSubmitted);

window.addEventListener("keydown", checkTab);
window.addEventListener("mousedown", mouseDetected);
