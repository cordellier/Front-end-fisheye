// Dans utils/likes.js

/**
 * Calcule le nombre total de "likes" à partir des éléments avec la classe ".nLike".
 *
 * @returns {number} Le nombre total de "likes".
 */
export function calculateTotalLikes() {
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
  const totalLikes = calculateTotalLikes();
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
