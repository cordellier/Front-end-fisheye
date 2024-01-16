import { BASE_PATH } from "../utils/constante.js";

/**
 * Rend une carte de média image avec les données fournies.
 *
 * @param {Object} data - Les données du média image.
 * @param {number} data.photographerId - L'identifiant du photographe associé au média.
 * @param {string} data.title - Le titre du média.
 * @param {string} data.image - Le chemin vers l'image.
 * @param {number} data.likes - Le nombre de likes du média.
 * @returns {string} - Le HTML de la carte du média image.
 */
function renderImage(data) {
  const { photographerId, title, image, likes, id } = data;

  return `
        <section class="gallery">
          <article class="gallery_card" data-media="${id}">
            <a href="#" role="link" aria-label="View media large">
              <img class="gallery-thumbnail" src="assets/images/${photographerId}/${image}" alt="Photos de ${title}">
            </a>
          </article>
          
          <figcaption>
            <h2>${title}</h2>
              <div role="group" aria-label="Like button and number of likes">
              <span class="nLike">${likes}</span>
              <button class="btn_like" type="button" data-id="${data.id}" aria-label="like">
                  <span class="fa-solid fa-heart" aria-hidden="true"></span>
                </button>
              </div>
          </figcaption>
        </section>`;
}

/**
 * Fabrique une carte de média en fonction des données fournies (image ou vidéo).
 *
 * @param {Object} data - Les données du média.
 * @param {string} data.image - Le chemin vers l'image.
 * @param {string} data.video - Le chemin vers la vidéo.
 * @returns {string} - Le HTML de la carte du média.
 */
function renderVideo(data) {
  const { title, video, likes, photographerId, id } = data;
  return `
        <section class="gallery">
          <article class="gallery_card" data-media="${id}">
            <video class="gallery-thumbnail" controls>
              <source src="assets/images/${photographerId}/${video}" type="video/mp4">
            </video>
          </article>
        
          <figcaption>
            <h2>${title}</h2>
              <div role="group" aria-label="Like button and number of likes">
                <span class="nLike">${likes}</span>
                <button class="btn_like" type="button" data-id="${data.id}" aria-label="like">
                  <span class="fa-solid fa-heart" aria-hidden="true"></span>
                </button>
              </div>
          </figcaption>
        </section>`;
}

export function factoryMedia(data) {
  const { image, video } = data;
  if (image) {
    return renderImage(data);
  } else if (video) {
    return renderVideo(data);
  } else {
    return "<p>Ce type de média n'est pas reconnue</p>";
  }
}

/**
 * Génère un nœud HTML simple pour le média, soit une image ou une vidéo, en fonction des données fournies.
 *
 * @param {Object} media - Les données du média.
 * @param {number} media.photographerId - L'identifiant du photographe associé au média.
 * @param {string} media.title - Le titre du média.
 * @param {string} media.image - Le chemin vers l'image.
 * @param {string} media.video - Le chemin vers la vidéo.
 * @returns {string} - Le HTML du nœud du média.
 */
export function simpleMediaNode(media) {
  const { photographerId, title } = media;
  const mediaType = media.image ? "image" : "video";
  const path = `${BASE_PATH}/${photographerId}/${media[mediaType]}`;
  let node = "";
  if (mediaType === "image") {
    node = `<img src="${path}" alt="${title}">`;
  } else if (mediaType === "video") {
    node = `<video tabindex="0" controls aria-label="${title}"><source src="${path}" type="video/mp4"></video>`;
  } else {
    node = "<span>Media inconnu</span>";
  }
  return `${node} <figcaption>${title}</figcaption>`;
}
