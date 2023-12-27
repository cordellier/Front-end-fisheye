import { getPhotographers } from "./utils/fetchJsonData.js";
import { renderCard } from "./view/headerPhotographerUI.js";
import { openCustomModal, closeModal } from "./utils/contactForm.js";
import { factoryMedia } from "./view/mediaUI.js";
import { setupContactForm } from "./controller/modal.js";
import { displayMediaWithFilter, openCloseFilterMenu } from "./utils/filter.js";

document.addEventListener("DOMContentLoaded", function () {
  setupContactForm();
});

async function initPage() {
  // Récupérer l'id de l'url
  const searchParam = new URLSearchParams(window.location.search);
  const id = searchParam.get("id");
  const photographe = await findPhotographe(Number.parseInt(id));
  const photographeHeader = renderCard(photographe);
  const baseView = document.querySelector(".photograph-content");
  baseView.innerHTML = photographeHeader;
  // Afficher l'ensemble des médias du photographe
  const medias = await findMediaByPhotographe(Number.parseInt(id));
  console.log(medias);
  displayMedia(medias);

  // Ajout de la fonction de filtrage
  displayMediaWithFilter({ medias });
  openCloseFilterMenu(); // Appel de la fonction pour ouvrir/fermer le menu de filtre
}

async function findPhotographe(id) {
  const { photographers } = await getPhotographers();
  return photographers.find((p) => p.id === id);
}

async function findMediaByPhotographe(id) {
  const { media } = await getPhotographers();
  return media.filter((m) => m.photographerId === id);
}

function displayMedia(listMedia) {
  const mediaZone = document.querySelector(".photo-grid");
  mediaZone.innerHTML = "";
  listMedia.forEach((media) => (mediaZone.innerHTML += factoryMedia(media)));
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
