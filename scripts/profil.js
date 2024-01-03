// Importations
import { getPhotographers } from "./utils/fetchJsonData.js";
import { renderCard } from "./view/headerPhotographerUI.js";
import { openCustomModal, closeModal } from "./utils/contactForm.js";
import { factoryMedia } from "./view/mediaUI.js";
import { displayMediaWithFilter, openCloseFilterMenu } from "./utils/filter.js";
import { calculateTotalLikes, updateTotalLikes } from "./utils/likes.js";

// Fonction pour gérer les clics sur les boutons de like
function handleLikeButtonClick() {
  console.log("Fonction handleLikeButtonClick appelée");
  const likeButtons = document.querySelectorAll(".btn_like");
  console.log(`Nombre de boutons de like trouvés : ${likeButtons.length}`);

  likeButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      console.log("Bouton de like cliqué");
      const dataId = btn.getAttribute("data-id");
      console.log(`ID de données du bouton : ${dataId}`);
      const likeElement = document.querySelector(`.nLike[data-id="${dataId}"]`);
      console.log("likeElement : ", likeElement);

      if (likeElement) {
        console.log("Element .nLike trouvé");
        let likes = parseInt(likeElement.textContent, 10);
        if (!isNaN(likes)) {
          likes += 1;
          likeElement.textContent = likes;
          btn.classList.add("liked");
        }
      } else {
        console.log("Element .nLike non trouvé");
      }
    });
  });
}

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

  // Calculer le total des "likes"
  calculateTotalLikes();

  // Affichage du pied de page
  const footerData = { price: photographe.price };
  const footer = renderFooter(footerData);
  const footerElement = document.querySelector(".footer-container");
  footerElement.innerHTML = footer;

  // Vérifier la présence de l'élément .total-likes
  const totalLikesContainer = document.querySelector(".total-likes");
  if (totalLikesContainer) {
    console.log("L'élément .total-likes est présent dans le DOM");
    // Mettre à jour l'affichage du total des "likes"
    updateTotalLikes();
  } else {
    console.log("L'élément .total-likes n'est pas trouvé dans le DOM");
  }

  // Appel de la fonction pour gérer les clics sur les boutons de like
  handleLikeButtonClick();
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
    <aside class="total-likes">
      <p class="photographer_Likes">
        <span class="photographer_likes_count"></span>
        <span class="fas fa-heart" aria-hidden="true"></span>
      </p>
      <span>${price}€ / jour</span>
    </aside>`;
}
