import { simpleMediaNode } from "../view/mediaUI.js";

/**
 * Affiche et gère la lightbox pour la visualisation des médias.
 *
 * Cette fonction initialise et gère le comportement de la lightbox pour afficher
 * les médias en plein écran et permettre la navigation entre eux.
 *
 * @param {Object} medias - Les données des médias à afficher.
 * @param {Object} medias.photographer - Les détails du photographe associé.
 * @param {Array} medias.medias - La liste des médias à afficher.
 * @returns {void}
 */
export const displayLightbox = (medias) => {
  // Sélection des éléments DOM nécessaires pour la lightbox
  const lightboxWrapper = document.querySelector(".lightbox");
  const btnClose = document.querySelector(".lightbox__close");
  const btnPrevious = document.querySelector(".lightbox__prev");
  const btnNext = document.querySelector(".lightbox__next");
  const lightboxMedia = document.querySelector(".lightbox__container");
  const mediaProvider = Array.from(document.querySelectorAll(".gallery_card"));

  // Initialisation des variables
  const photographer = medias.photographer;
  const mediasList = medias.medias;
  let currentIndex = 0;

  // Ajout des écouteurs d'événements aux médias pour ouvrir la lightbox
  mediaProvider.forEach((media) => {
    media.addEventListener("click", () => {
      const mediaId = media.dataset.media;
      const mediaIndex = mediasList.findIndex((media) => media.id == mediaId);
      currentIndex = mediaIndex;

      // Crée un overlay pour l'arrière-plan
      const overlay = document.createElement("div");
      overlay.classList.add("lightbox-overlay");
      document.body.appendChild(overlay);

      lightboxWrapper.style.display = "flex";

      btnClose.focus();
      lightboxTemplate();
    });
  });

  // Événement de transition pour détecter le moment où la lightbox est ouverte
  lightboxWrapper.addEventListener("transitionend", () => {
    // Appel à lightboxTemplate() seulement après que la lightbox est ouverte
    lightboxTemplate();
  });

  // Fonction pour générer le template du média actuel
  const lightboxTemplate = () => {
    const currentMedia = mediasList[currentIndex];
    // S'assure que l'objet currentMedia est défini
    if (currentMedia) {
      const mediaType = currentMedia.image ? "image" : "video";
      // Génération du contenu HTML en fonction du type de média (image ou vidéo)
      lightboxMedia.innerHTML = simpleMediaNode(currentMedia);
    } else {
      console.error("Média actuel non défini dans lightboxTemplate");
    }
  };

  // Fonction pour fermer la lightbox
  const closeLightbox = () => {
    // Supprime l'overlay pour l'arrière-plan
    const overlay = document.querySelector(".lightbox-overlay");
    if (overlay) {
      overlay.parentNode.removeChild(overlay);
    }

    lightboxWrapper.style.display = "none";
    lightboxMedia.innerHTML = "";
  };

  // Fonctions pour naviguer entre les médias
  const nextMedia = () => {
    currentIndex++;
    if (currentIndex > mediasList.length - 1) currentIndex = 0;
    lightboxTemplate();
    showActiveBtn(btnNext);
  };

  const previousMedia = () => {
    currentIndex--;
    if (currentIndex < 0) currentIndex = mediasList.length - 1;
    lightboxTemplate();
    showActiveBtn(btnPrevious);
  };

  // Fonction pour mettre en évidence le bouton actif pendant une courte durée
  const showActiveBtn = (btn) => {
    btn.classList.add("active");
    setTimeout(() => btn.classList.remove("active"), 100);
  };

  // Événement de gestion du focus pour la navigation avec la tabulation
  lightboxWrapper.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      e.preventDefault(); // Empêche le comportement par défaut de la tabulation

      // Détermine les éléments focusables à l'intérieur de la lightbox
      const focusableElements = lightboxWrapper.querySelectorAll(
        "input, textarea, button, [tabindex]:not([tabindex='-1'])"
      );
      const totalFocusableElements = focusableElements.length;

      if (totalFocusableElements > 1) {
        let currentIndex = Array.from(focusableElements).indexOf(
          document.activeElement
        );

        // Détermine la direction de la tabulation
        const shiftTab = e.shiftKey;

        // Met à jour l'index en fonction de la direction de la tabulation
        currentIndex = shiftTab
          ? (currentIndex - 1 + totalFocusableElements) % totalFocusableElements
          : (currentIndex + 1) % totalFocusableElements;

        // Applique le focus à l'élément approprié
        focusableElements[currentIndex].focus();
      }
    }
  });

  // Écouteurs d'événements pour la navigation au clavier
  window.addEventListener("keydown", (e) => {
    if (lightboxWrapper.style.display === "flex") {
      switch (e.key) {
        case "Escape":
          closeLightbox();
          break;
        case "ArrowLeft":
          previousMedia();
          break;
        case "ArrowRight":
          nextMedia();
          break;
      }
    }
  });

  // Écouteurs d'événements pour la navigation avec les boutons
  btnPrevious.addEventListener("click", () => previousMedia());
  btnNext.addEventListener("click", () => nextMedia());
  btnClose.addEventListener("click", () => closeLightbox());
};