// Importe la fonction displayMedia du fichier profil.js
import { displayMedia } from "../profil.js";
// Importe la fonction handleLikeButtonClick du fichier likes.js dans le dossier utils
import { handleLikeButtonClick, restoreLikes } from "../utils/likes.js";

/**
 * Gère l'ouverture et la fermeture du menu de filtre.
 *
 * @returns {void}
 */
export const openCloseFilterMenu = () => {
  // Sélectionne les éléments du DOM nécessaires pour le menu de filtre
  const filterMenu = document.querySelector(".dropdown_content");
  const filterMenuButton = document.querySelector(".btn_drop");
  const filterButtons = document.querySelectorAll(".dropdown_content button");

  // Ajoute un écouteur d'événements pour le clic sur le bouton du menu de filtre
  filterMenuButton.addEventListener("click", () => {
    // Vérifie si le menu est actuellement étendu
    const isExpanded =
      filterMenuButton.getAttribute("aria-expanded") === "true" || false;

    // Inverse l'état du menu (étendu ou réduit)
    filterMenuButton.setAttribute("aria-expanded", !isExpanded);
    filterMenu.classList.toggle("curtain_effect");

    // Tourne la flèche du bouton de menu
    document.querySelector(".fa-chevron-up").classList.toggle("rotate");

    // Met à jour les attributs aria-hidden et tabindex pour gérer l'accessibilité
    const newAriaHiddenValue = filterMenu.classList.contains("curtain_effect")
      ? "false"
      : "true";
    filterMenu.setAttribute("aria-hidden", newAriaHiddenValue);

    const newTabIndexValue = filterMenu.classList.contains("curtain_effect")
      ? "0"
      : "-1";
    filterButtons.forEach((button) =>
      button.setAttribute("tabindex", newTabIndexValue)
    );
  });
};

/**
 * Affiche les médias filtrés en fonction du filtre sélectionné.
 *
 * @param {Object} mediasTemplate - Le template des médias à afficher.
 * @param {Array} mediasTemplate.medias - La liste des médias à afficher.
 * @returns {void}
 */
export const displayMediaWithFilter = (mediasTemplate) => {
  // Sélectionne les éléments du DOM nécessaires pour les filtres
  const currentFilter = document.querySelector("#current_filter");
  const allFilters = Array.from(
    document.querySelectorAll(".dropdown_content li button")
  );

  // Vérifie si le filtre actuel est déjà sélectionné et le masque
  let filterAlreadySelected = allFilters.find(
    (filter) => filter.textContent == currentFilter.textContent
  );

  if (filterAlreadySelected) {
    filterAlreadySelected.style.display = "none";
  }

  // Ajoute des écouteurs d'événements pour chaque bouton de filtre
  allFilters.forEach((filter) => {
    filter.addEventListener("click", () => {
      // Met à jour le texte du filtre actuel avec celui du filtre sélectionné
      currentFilter.textContent = filter.textContent;

      // Réaffiche le filtre précédemment masqué
      if (filterAlreadySelected) {
        filterAlreadySelected.style.display = "block";
      }

      // Masque le filtre sélectionné pour éviter la sélection du même filtre
      filterAlreadySelected = filter;
      filterAlreadySelected.style.display = "none";

      // Trie et affiche les médias en fonction du filtre sélectionné
      sortByFilter(filter.textContent, mediasTemplate);
    });
  });

  /**
   * Trie les médias en fonction du filtre sélectionné.
   *
   * @param {string} filterValue - La valeur du filtre sélectionné.
   * @param {Object} mediasTemplate - Le template des médias à trier.
   * @param {Array} mediasTemplate.medias - La liste des médias à trier.
   * @returns {void}
   */
  const sortByFilter = (filterValue, mediasTemplate) => {
    // Affiche le filtre actuel dans la console
    console.log("Application du filtre :", filterValue);

    // Utilise une instruction switch pour trier les médias en fonction du filtre
    switch (filterValue) {
      case "Titre":
        console.log("Tri par Titre...");
        mediasTemplate.medias.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Popularité":
        console.log("Tri par Popularité...");
        mediasTemplate.medias.sort((a, b) => b.likes - a.likes);
        break;
      case "Date":
        console.log("Tri par Date...");
        mediasTemplate.medias.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        break;
      default:
        console.log("Aucun tri spécifique spécifié.");

        // Obtient les médias filtrés en fonction du filtre personnalisé
        const filteredMedias = getFilteredMedias(
          filterValue,
          mediasTemplate.medias
        );
    }

    // Affiche tous les médias après le tri
    displayMedia(mediasTemplate.medias);

    // Ajoute une classe animeCard avec un délai pour une animation fluide
    const mediaElements = document.querySelectorAll(".gallery_card");
    mediaElements.forEach((media, index) => {
      setTimeout(() => {
        media.classList.add("animeCard");
      }, 100 * index);
    });

    // Réinitialise les écouteurs d'événements des boutons de like
    handleLikeButtonClick();

    // Rétablir les likes depuis le localStorage après chaque clic
    restoreLikes();
  };
};
