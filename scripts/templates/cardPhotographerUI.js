// export const photographerCardModule = {
//   createPhotographerCard: (data) => {
//     const { name, portrait, city, country, tagline, price, id } = data;
//     const picturePath = `assets/photographers/${portrait}`;

//     const html = `
//       <article>
//         <a href="photographer.html?id=${id}" aria-label="View Photographer Profile: ${name}">
//           <div class="${ClassPhotographerCard}">
//             <img src="${picturePath}" alt="${name}">
//           </div>
//           <h2>${name}</h2>
//           <h3>${city}, ${country}</h3>
//           <p>${tagline}</p>
//           <p>${price}€/jour</p>
//         </a>
//       </article>
//     `;

//     const tempElement = document.createElement("div");
//     tempElement.innerHTML = html;

//     return tempElement.firstElementChild;
//   },
// };

import { DOMUtils } from "./photographer"; // Assurez-vous de spécifier le chemin correct

export const photographerCardModule = {
  createPhotographerCard: (data) => {
    const { name, portrait, city, country, tagline, price, id } = data;
    const picturePath = `assets/photographers/${portrait}`;

    const img = DOMUtils.createImage(picturePath, name);
    if (!img) {
      return null;
    }

    const h2 = DOMUtils.createHeading("h2", name);
    const h3 = DOMUtils.createHeading("h3", `${city}, ${country}`);
    const tag = DOMUtils.createParagraph(tagline);
    const prix = DOMUtils.createParagraph(`${price}€/jour`);
    const imgContainer = DOMUtils.createCardContainer([img]);

    const content = [imgContainer, h2, h3, tag, prix];

    const article = createArticleWithLink(id, content, name);

    return article;
  },
};

function createArticleWithLink(id, content, name) {
  const article = document.createElement("article");

  const link = DOMUtils.createLinkWithHref(`photographer.html?id=${id}`);
  const ariaLabel = `View Photographer Profile: ${name}`;
  link.setAttribute("aria-label", ariaLabel);

  content.forEach((element) => {
    link.appendChild(element);
  });

  article.appendChild(link);
  return article;
}
