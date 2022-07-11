function formSubmitted(e) {
  e.preventDefault();

  const firstName = document.querySelector(".first-name-input").value;

  const surName = document.querySelector(".surname-input").value;

  document.cookie = `firstname=${firstName}; Secure;`;
  document.cookie = `lastname=${surName}; Secure;`;

  location.reload();
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
  .querySelector(".contact-form")
  .addEventListener("submit", formSubmitted);

window.addEventListener("keydown", checkTab);
window.addEventListener("mousedown", mouseDetected);
