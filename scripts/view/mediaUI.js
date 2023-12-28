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
                <button class="btn_like" type="button" arial-label="like">
                  <span class="fa-solid fa-heart" aria-hidden="true"></span>
                </button>
              </div>
          </figcaption>
        </section>`;
}

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
                <button class="btn_like" type="button" aria-label="like">
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
