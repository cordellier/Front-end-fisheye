import { createPhotographerCard } from "../templates/photographer.js";
import { getPhotographers } from "../utils/fetchJsonData.js";

async function displayData(photographers, photographersSection) {
  photographers.forEach((photographer) => {
    const photographerCard = createPhotographerCard(photographer);
    photographersSection.appendChild(photographerCard);
  });
}

async function init() {
  const { photographers } = await getPhotographers();
  const photographersSection = document.querySelector(".photographer_section");

  displayData(photographers, photographersSection);
  addKeyDownNavigation(photographersSection);
}

init();
