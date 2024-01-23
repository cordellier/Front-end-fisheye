// likes.js

/**
 * Rétablit les likes depuis le localStorage lors de l'initialisation de la page.
 *
 * @returns {void}
 */
export function restoreLikes() {
  // Sélectionne tous les boutons de like
  const likeButtons = document.querySelectorAll(".btn_like");

  // Pour chaque bouton de like
  likeButtons.forEach((btn) => {
    const dataId = btn.getAttribute("data-id");
    const likesKey = `likes_${dataId}`;

    // Si des likes sont enregistrés dans le localStorage pour cet élément
    if (localStorage.getItem(likesKey)) {
      // Ajoute la classe "liked" pour indiquer que cet élément a déjà été aimé
      btn.classList.add("liked");

      // Récupère l'élément de like correspondant
      const likeElement = document.querySelector(`[data-id="${dataId}"]`);
      const spanLike = likeElement.previousElementSibling;

      // Met à jour le nombre de likes à partir des données du localStorage
      spanLike.textContent = localStorage.getItem(likesKey);
    }

    // Met à jour le total des likes après avoir restauré les likes depuis le localStorage
    updateTotalLikes();
  });
}

/**
 * Calcule le nombre total de "likes" à partir des éléments avec la classe ".nLike".
 *
 * @returns {number} Le nombre total de "likes".
 */
export function calculateLikes() {
  // Sélectionne tous les éléments avec la classe ".nLike"
  const likeElements = document.querySelectorAll(".nLike");
  let totalLikes = 0;

  // Pour chaque élément avec la classe ".nLike"
  likeElements.forEach((likeElement) => {
    // Récupère le nombre de likes sous forme de texte
    const likes = parseInt(likeElement.textContent, 10);

    // Si le texte peut être converti en nombre, l'ajoute au total
    if (!isNaN(likes)) {
      totalLikes += likes;
    }
  });

  return totalLikes;
}

/**
 * Met à jour l'affichage du nombre total de "likes" dans l'élément .total-likes.
 *
 * @returns {void}
 */
export function updateTotalLikes() {
  // Calcule le nombre total de likes
  const totalLikes = calculateLikes();

  // Sélectionne l'élément qui affiche le total des likes
  const totalLikesContainer = document.querySelector(".total-likes");

  // Si l'élément existe
  if (totalLikesContainer) {
    // Sélectionne l'élément spécifique pour afficher le nombre total de likes pour le photographe
    const photographerLikesCount = totalLikesContainer.querySelector(
      ".photographer_likes_count"
    );

    // Si cet élément existe, met à jour son contenu avec le nombre total de likes
    if (photographerLikesCount) {
      photographerLikesCount.textContent = totalLikes;
    }
  }
}

/**
 * Gère les clics sur les boutons de like.
 *
 * @returns {void}
 */
export function handleLikeButtonClick() {
  // Sélectionne tous les boutons de like
  const likeButtons = document.querySelectorAll(".btn_like");

  // Pour chaque bouton de like
  likeButtons.forEach((btn) => {
    const dataId = btn.getAttribute("data-id");

    // Ajoute un gestionnaire d'événements pour le clic sur le bouton de like
    btn.addEventListener("click", function () {
      // Récupère l'élément de like correspondant à partir de son dataId
      const likeElement = document.querySelector(`[data-id="${dataId}"]`);

      // Si l'élément de like est trouvé
      if (likeElement) {
        const spanLike = likeElement.previousElementSibling;
        let likes = parseInt(spanLike.textContent, 10);

        // Si la conversion en nombre s'est bien déroulée
        if (!isNaN(likes)) {
          // Si le bouton de like a déjà la classe "liked"
          if (btn.classList.contains("liked")) {
            // Si déjà aimé et re-cliqué, diminuer le compteur et retirer l'ID
            likes -= 1;
            btn.classList.remove("liked");

            // Retirer l'ID de l'élément aimé de la liste dans localStorage
            const likedItems =
              JSON.parse(localStorage.getItem("likedItems")) || [];
            const index = likedItems.indexOf(dataId);
            if (index > -1) {
              likedItems.splice(index, 1);
              localStorage.setItem("likedItems", JSON.stringify(likedItems));
            }

            // Retirer le compteur de likes pour cet élément dans localStorage
            localStorage.removeItem(`likes_${dataId}`);
          } else {
            // Si non aimé, augmenter le compteur et ajouter l'ID
            likes += 1;
            btn.classList.add("liked");

            // Ajouter l'ID de l'élément aimé à la liste dans localStorage
            const likedItems =
              JSON.parse(localStorage.getItem("likedItems")) || [];
            likedItems.push(dataId);
            localStorage.setItem("likedItems", JSON.stringify(likedItems));

            // Ajouter le compteur de likes pour cet élément dans localStorage
            localStorage.setItem(`likes_${dataId}`, likes.toString());
          }

          // Mettre à jour le nombre de likes affiché
          spanLike.textContent = likes;

          // Mettre à jour le total des likes après avoir modifié un like
          updateTotalLikes();

          // Rétablir les likes depuis le localStorage après chaque clic
          restoreLikes();
        }
      }
    });
  });
}
