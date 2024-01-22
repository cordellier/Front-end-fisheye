// likes.js

/**
 * Rétablit les likes depuis le localStorage lors de l'initialisation de la page.
 *
 * @returns {void}
 */
export function restoreLikes() {
  const likeButtons = document.querySelectorAll(".btn_like");

  likeButtons.forEach((btn) => {
    const dataId = btn.getAttribute("data-id");
    const likesKey = `likes_${dataId}`;

    if (localStorage.getItem(likesKey)) {
      btn.classList.add("liked");

      const likeElement = document.querySelector(`[data-id="${dataId}"]`);
      const spanLike = likeElement.previousElementSibling;
      spanLike.textContent = localStorage.getItem(likesKey);
    }
    // Mettre à jour le total des likes après avoir restauré les likes depuis le localStorage
    updateTotalLikes();
  });
}

/**
 * Calcule le nombre total de "likes" à partir des éléments avec la classe ".nLike".
 *
 * @returns {number} Le nombre total de "likes".
 */
export function calculateLikes() {
  const likeElements = document.querySelectorAll(".nLike");
  let totalLikes = 0;

  likeElements.forEach((likeElement) => {
    const likes = parseInt(likeElement.textContent, 10);
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
  const totalLikes = calculateLikes();
  const totalLikesContainer = document.querySelector(".total-likes");

  if (totalLikesContainer) {
    const photographerLikesCount = totalLikesContainer.querySelector(
      ".photographer_likes_count"
    );
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
  const likeButtons = document.querySelectorAll(".btn_like");

  likeButtons.forEach((btn) => {
    const dataId = btn.getAttribute("data-id");

    btn.addEventListener("click", function () {
      const likeElement = document.querySelector(`[data-id="${dataId}"]`);

      if (likeElement) {
        const spanLike = likeElement.previousElementSibling;
        let likes = parseInt(spanLike.textContent, 10);

        if (!isNaN(likes)) {
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

            // Retirer le compteur de likes pour ce média dans localStorage
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

            // Ajouter le compteur de likes pour ce média dans localStorage
            localStorage.setItem(`likes_${dataId}`, likes.toString());
          }

          spanLike.textContent = likes;

          // Mettre à jour le total des likes après avoir modifié un like
          const totalLikes = calculateLikes();
          // Mettre à jour le total des likes après avoir modifié un like
          updateTotalLikes();

          // Rétablir les likes depuis le localStorage après chaque clic
          restoreLikes();
        }
      }
    });
  });
}
