//Import Class JS
import { renderCard } from "./view/carPhotographerUI.js";
import { getPhotographers } from "./utils/fetchJsonData.js";

async function displayData(photographers, photographersSection) {
  photographers.forEach((photographer) => {
    const photographerCard = renderCard(photographer);
    const photographerHtml = document.createElement("div");
    photographerHtml.innerHTML = photographerCard;
    photographersSection.appendChild(photographerHtml);
  });
}

async function init() {
  const { photographers } = await getPhotographers();
  const photographersSection = document.querySelector(".photographer_section");

  displayData(photographers, photographersSection);
}

//Init App
init();
