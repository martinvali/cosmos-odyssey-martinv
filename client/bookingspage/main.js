function checkTab(e) {
  if (e.keyCode === 9) {
    document.body.classList.add("user-tabbing");
  }
}

function mouseDetected() {
  document.body.classList.remove("user-tabbing");
}
window.addEventListener("keydown", checkTab);
window.addEventListener("mousedown", mouseDetected);
