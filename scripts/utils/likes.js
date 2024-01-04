// Dans utils/likes.js

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
