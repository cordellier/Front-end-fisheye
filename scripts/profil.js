// Importations
import { getPhotographers } from "./utils/fetchJsonData.js";
import { renderCard } from "./view/headerPhotographerUI.js";
import { openCustomModal, closeModal } from "./utils/contactForm.js";
import { factoryMedia } from "./view/mediaUI.js";
import { displayMediaWithFilter, openCloseFilterMenu } from "./utils/filter.js";
import { calculateTotalLikes, updateTotalLikes } from "./utils/likes.js";
import { setupContactForm } from "./controller/modal.js";

/**
 * Initialise la page principale.
 *
 * @returns {void}
 */
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
  // Focus
  setupContactForm();

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

/**
 * Recherche un photographe par son ID.
 *
 * @param {number} id - L'ID du photographe à rechercher.
 * @returns {Promise<Object>} Les détails du photographe.
 */
async function findPhotographe(id) {
  const { photographers } = await getPhotographers();
  return photographers.find((p) => p.id === id);
}

/**
 * Recherche tous les médias pour un photographe spécifique.
 *
 * @param {number} id - L'ID du photographe.
 * @returns {Promise<Array>} Liste des médias du photographe.
 */
async function findMediaByPhotographe(id) {
  const { media } = await getPhotographers();
  return media.filter((m) => m.photographerId === id);
}

/**
 * Affiche tous les médias dans une zone spécifique.
 *
 * @param {Array} listMedia - Liste des médias à afficher.
 * @returns {void}
 */
export function displayMedia(listMedia) {
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
/**
 * Affiche le pied de page.
 *
 * @param {Object} data - Les données pour le pied de page.
 * @param {number} data.price - Le prix du photographe.
 * @returns {string} Le code HTML du pied de page.
 */
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

// Fonction pour gérer les clics sur le bouton de like
/**
 * Gère les clics sur les boutons de like.
 *
 * @returns {void}
 */
export function handleLikeButtonClick() {
  console.log("Fonction handleLikeButtonClick appelée");
  const likeButtons = document.querySelectorAll(".btn_like");
  console.log(`Nombre de boutons de like trouvés : ${likeButtons.length}`);

  // Récupérer les ID des éléments déjà aimés
  const likedItems = JSON.parse(localStorage.getItem("likedItems")) || [];

  likeButtons.forEach((btn) => {
    const dataId = btn.getAttribute("data-id");

    // Appliquer la classe 'liked' si l'ID est dans la liste des éléments aimés
    if (likedItems.includes(dataId)) {
      btn.classList.add("liked");
    }

    btn.addEventListener("click", function () {
      console.log("Bouton de like cliqué");

      const likeElement = document.querySelector(`[data-id="${dataId}"]`);
      console.log("likeElement : ", likeElement);

      if (likeElement) {
        const spanLike = likeElement.previousElementSibling;
        let likes = parseInt(spanLike.textContent, 10);

        if (!isNaN(likes)) {
          if (btn.classList.contains("liked")) {
            // Si déjà aimé et re-cliqué, diminuer le compteur et retirer l'ID
            likes -= 1;
            btn.classList.remove("liked");

            // Retirer l'ID de l'élément aimé de la liste
            const index = likedItems.indexOf(dataId);
            if (index > -1) {
              likedItems.splice(index, 1);
              localStorage.setItem("likedItems", JSON.stringify(likedItems));
            }
          } else {
            // Si non aimé, augmenter le compteur et ajouter l'ID
            likes += 1;
            btn.classList.add("liked");

            // Ajouter l'ID de l'élément aimé à la liste
            likedItems.push(dataId);
            localStorage.setItem("likedItems", JSON.stringify(likedItems));
          }

          spanLike.textContent = likes;
          // Mettre à jour le total des likes après avoir modifié un like
          updateTotalLikes();
        }
      } else {
        console.log("Element .nLike non trouvé");
      }
    });
  });
}

// Appeler la fonction pour initialiser
handleLikeButtonClick();
