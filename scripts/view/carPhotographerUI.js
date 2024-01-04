/**
 * Rend une carte de photographe avec les données fournies.
 *
 * @param {Object} data - Les données du photographe.
 * @param {string} data.name - Le nom du photographe.
 * @param {string} data.city - La ville du photographe.
 * @param {string} data.country - Le pays du photographe.
 * @param {string} data.tagline - La phrase d'accroche du photographe.
 * @param {number} data.price - Le prix du photographe par jour.
 * @param {string} data.portrait - Le chemin vers le portrait du photographe.
 * @param {number} data.id - L'identifiant unique du photographe.
 * @returns {string} - Le HTML de la carte du photographe.
 */
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
