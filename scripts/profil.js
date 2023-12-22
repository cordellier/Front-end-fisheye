import { getPhotographers } from "./utils/fetchJsonData.js";
import { renderCard } from "./view/headerPhotographerUI.js";
import { openCustomModal, closeModal } from "./utils/contactForm.js";

async function initPage() {
  const searchParam = new URLSearchParams(window.location.search);
  const id = searchParam.get("id");
  const photographe = await findPhotographe(Number.parseInt(id));
  const photographeHeader = renderCard(photographe);
  const baseView = document.querySelector(".photograph-content");
  baseView.innerHTML = photographeHeader;
}

async function findPhotographe(id) {
  const { photographers } = await getPhotographers();
  return photographers.find((p) => p.id === id);
}

initPage();

// Fonction permettant de retourner sur l'accueil
function redirectToHome() {
  window.location.href = "index.html";
}

// Écouteur d'événement pour le clic sur le logo
document.querySelector(".logo").addEventListener("click", function () {
  redirectToHome();
});

// Écouteur d'événement pour ouvrir et fermer le modal de contact
document.getElementById("openButton").addEventListener("click", function () {
  openCustomModal();
});

document.getElementById("closeButton").addEventListener("click", function () {
  closeModal();
});
