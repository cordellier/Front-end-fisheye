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
  const { photographerId, title, image, likes } = data;

  return `
        <section class="gallery">
          <article class="gallery_card">
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
  const { title, video, likes, photographerId } = data;
  return `
        <section class="gallery">
          <article class="gallery_card">
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
