// Fonction permettant de retourner sur l'acceuil avec "Alt"
function redirectToHome() {
  window.location.href = "index.html";
}

document.addEventListener("keydown", function (event) {
  var altKeyPressed = event.altKey;

  if (altKeyPressed) {
    redirectToHome();

    document.querySelector(".logo").style.transform = "scale(1.1)";
  }
});

document.querySelector(".logo").addEventListener("click", function () {
  redirectToHome();
});
