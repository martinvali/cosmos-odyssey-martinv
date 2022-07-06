document
  .querySelector(".contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const t = document.querySelector(".first-name-input").value,
      n = document.querySelector(".surname-input").value;
    (document.cookie = `firstName=${t}; Secure;`),
      (document.cookie = `lastName=${n}; Secure;`),
      location.reload();
  });
