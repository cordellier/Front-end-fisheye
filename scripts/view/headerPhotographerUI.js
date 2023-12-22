export function renderCard(data) {
  const { name, city, country, tagline, price, portrait, id } = data;

  return `
      <div class="header-container">
          <div class="photographer_card">
            <img src="assets/photographers/${portrait}" alt="Photos de ${name}">
          </div>
          <h2>${name}</h2>
          <h3>${city}, ${country}</h3>
          <p>${tagline}</p>
      </div>`;
}
