window.addEventListener("keydown", function (e) {
  9 === e.keyCode && document.body.classList.add("user-tabbing");
}),
  window.addEventListener("mousedown", function () {
    document.body.classList.remove("user-tabbing");
  });
