export function renderCard(data) {
  const { name, city, country, tagline, price, portrait, id } = data;

  return `
      <article>
        <a href="photographer.html?id=${id}" aria-label="View Photographer Profile: ${name}">
          <div class="card-container">
            <img src="assets/photographers/${portrait}" alt="Photos de ${name}">
          </div>
          <h2>${name}</h2>
          <h3>${city}, ${country}</h3>
          <p>${tagline}</p>
          <p>${price}€/jour</p>
        </a>
      </article>`;
}
