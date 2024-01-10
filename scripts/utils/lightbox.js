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

  console.log(
    "Element: ",
    lightboxWrapper,
    btnClose,
    btnPrevious,
    btnNext,
    lightboxMedia
  );

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
      lightboxWrapper.style.display = "flex";
      btnClose.focus();
      lightboxTemplate();
    });
  });

  // Fonction pour générer le template du média actuel
  const lightboxTemplate = () => {
    const currentMedia = mediasList[currentIndex];
    // Génération du contenu HTML en fonction du type de média (image ou vidéo)
    lightboxMedia.innerHTML = `
    ${
      currentMedia.image
        ? `
    <img src="assets/images/photographers/samplePhotos-Medium/${photographer.name}/${currentMedia.image}" alt="${currentMedia.alt}">`
        : `<video controls aria-label="${currentMedia.alt}"><source src="assets/images/photographers/samplePhotos-Medium/${photographer.name}/${currentMedia.video}" type="video/mp4"></video>`
    }

    <figcaption>${currentMedia.title}</figcaption>
`;
  };

  // Fonction pour fermer la lightbox
  const closeLightbox = () => {
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

  // Écouteurs d'événements pour la navigation au clavier
  document.addEventListener("keyup", (e) => {
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
  });

  // Écouteurs d'événements pour la navigation avec les boutons
  btnPrevious.addEventListener("click", () => previousMedia());
  btnNext.addEventListener("click", () => nextMedia());
  btnClose.addEventListener("click", () => closeLightbox());
};
