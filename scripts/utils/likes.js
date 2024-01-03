export function calculateTotalLikes() {
  const likeElements = document.querySelectorAll(".nLike");
  let totalLikes = 0;

  likeElements.forEach((likeElement) => {
    const likes = parseInt(likeElement.textContent, 10);
    if (!isNaN(likes)) {
      totalLikes += likes;
    }
  });

  // Vérifier le calcul des likes
  console.log(`Total des likes calculé : ${totalLikes}`);

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
      console.log(
        "L'élément .photographer_likes_count est présent dans l'élément .total-likes"
      );
      photographerLikesCount.textContent = totalLikes;
    } else {
      console.log(
        "L'élément .photographer_likes_count n'est pas trouvé dans l'élément .total-likes"
      );
    }
  } else {
    console.log("L'élément .total-likes n'est pas trouvé");
  }
}
