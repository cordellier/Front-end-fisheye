import { displayMedia } from "../profil.js";
import { handleLikeButtonClick } from "../profil.js";

/**
 * Gère l'ouverture et la fermeture du menu de filtre.
 *
 * @returns {void}
 */
export const openCloseFilterMenu = () => {
  const filterMenu = document.querySelector(".dropdown_content");
  const filterMenuButton = document.querySelector(".btn_drop");
  const filterButtons = document.querySelectorAll(".dropdown_content button");

  filterMenuButton.addEventListener("click", () => {
    const isExpanded =
      filterMenuButton.getAttribute("aria-expanded") === "true" || false;
    filterMenuButton.setAttribute("aria-expanded", !isExpanded);
    filterMenu.classList.toggle("curtain_effect");

    document.querySelector(".fa-chevron-up").classList.toggle("rotate");

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
  const currentFilter = document.querySelector("#current_filter");
  const allFilters = Array.from(
    document.querySelectorAll(".dropdown_content li button")
  );

  let filterAlreadySelected = allFilters.find(
    (filter) => filter.textContent == currentFilter.textContent
  );

  if (filterAlreadySelected) {
    filterAlreadySelected.style.display = "none";
  }

  allFilters.forEach((filter) => {
    filter.addEventListener("click", () => {
      currentFilter.textContent = filter.textContent;

      if (filterAlreadySelected) {
        filterAlreadySelected.style.display = "block";
      }

      filterAlreadySelected = filter;
      filterAlreadySelected.style.display = "none";

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
    console.log("Application du filtre :", filterValue);
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
    }

    displayMedia(mediasTemplate.medias);

    const mediaElements = document.querySelectorAll(".gallery_card");
    mediaElements.forEach((media, index) => {
      setTimeout(() => {
        media.classList.add("animeCard");
      }, 100 * index);
    });

    // Réinitialiser les écouteurs d'événements des boutons de like
    handleLikeButtonClick();
  };
};
