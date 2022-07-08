document
  .querySelector(".contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const n = document.querySelector(".first-name-input").value,
      t = document.querySelector(".surname-input").value;
    (document.cookie = `firstname=${n}; Secure;`),
      (document.cookie = `lastname=${t}; Secure;`),
      location.reload();
  }),
  window.addEventListener("keydown", function (e) {
    9 === e.keyCode && document.body.classList.add("user-tabbing");
  }),
  window.addEventListener("mousedown", function () {
    document.body.classList.remove("user-tabbing");
  });
