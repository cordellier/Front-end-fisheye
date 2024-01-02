// Importations
import { getPhotographers } from "./utils/fetchJsonData.js";
import { renderCard } from "./view/headerPhotographerUI.js";
import { openCustomModal, closeModal } from "./utils/contactForm.js";
import { factoryMedia } from "./view/mediaUI.js";
import { setupContactForm } from "./controller/modal.js";
import { displayMediaWithFilter, openCloseFilterMenu } from "./utils/filter.js";
import { displayTotalLikes } from "./utils/likes.js";

// Écouteur d'événement pour la fin du chargement du DOM
document.addEventListener("DOMContentLoaded", function () {
  setupContactForm();
});

async function initPage() {
  // Récupérer l'id de l'url
  const searchParam = new URLSearchParams(window.location.search);
  const id = searchParam.get("id");

  // Récupérer le photographe et afficher l'en-tête
  const photographe = await findPhotographe(Number.parseInt(id));
  const photographeHeader = renderCard(photographe);
  const baseView = document.querySelector(".photograph-content");
  baseView.innerHTML = photographeHeader;

  // Afficher l'ensemble des médias du photographe
  const medias = await findMediaByPhotographe(Number.parseInt(id));
  displayMedia(medias);

  // Ajout de la fonction de filtrage
  displayMediaWithFilter({ medias });
  // Appel de la fonction pour ouvrir/fermer le menu de filtre
  openCloseFilterMenu();

  // Appel de la fonction pour afficher le total des likes
  displayTotalLikes(medias);

  // Affichage du pied de page
  const footerData = { price: photographe.price };
  const footer = renderFooter(footerData);
  const footerElement = document.querySelector(".footer-container");
  footerElement.innerHTML = footer;
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
document.querySelector(".logo").addEventListener("click", redirectToHome);

// Écouteur d'événement pour ouvrir et fermer le modal de contact
document
  .getElementById("openButton")
  .addEventListener("click", openCustomModal);
document.getElementById("closeButton").addEventListener("click", closeModal);

// Définition de la fonction renderFooter
function renderFooter(data) {
  const { price } = data;
  return `
    <aside>
      <p class="photographer_Likes">
        <span class="photographer_likes_count"></span>
        <span class="fas fa-heart" aria-hidden="true"></span>
      </p>
      <span>${price}€ / jour</span>
    </aside>`;
}
