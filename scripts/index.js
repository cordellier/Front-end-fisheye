//Import les fonctions
import { renderCard } from "./view/carPhotographerUI.js";
import { getPhotographers } from "./utils/fetchJsonData.js";

/**
 * Affiche les données des photographes dans la section spécifiée.
 *
 * @param {Array} photographers - Les données des photographes à afficher.
 * @param {HTMLElement} photographersSection - La section où afficher les photographes.
 * @returns {void}
 */
async function displayData(photographers, photographersSection) {
  photographers.forEach((photographer) => {
    const photographerCard = renderCard(photographer);
    const photographerHtml = document.createElement("div");
    photographerHtml.innerHTML = photographerCard;
    photographersSection.appendChild(photographerHtml);
  });
}

/**
 * Initialise l'application en récupérant les données des photographes et en les affichant.
 *
 * @returns {void}
 */
async function init() {
  const { photographers } = await getPhotographers();
  const photographersSection = document.querySelector(".photographer_section");

  displayData(photographers, photographersSection);
}

// Initialise l'application lors du chargement du script.
init();
