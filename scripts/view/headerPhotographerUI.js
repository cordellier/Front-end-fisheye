export function renderCard(data) {
  const { name, city, country, tagline, price, portrait, id } = data;

  // Création du contenu HTML
  const htmlContent = `
      <div class="header-container">
          <div class="photographer_card">
            <img src="assets/photographers/${portrait}" alt="Photos de ${name}">
          </div>
          <h2>${name}</h2>
          <h3>${city}, ${country}</h3>
          <p>${tagline}</p>
      </div>`;

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlContent;
  const photographerName = tempDiv.querySelector("h2").textContent;

  const formNameElement = document.querySelector(".modal_form_name");
  if (formNameElement) {
    formNameElement.textContent = photographerName;
  }

  return htmlContent;
}
