// Constante
const ClassPhotographerCard = "photographer_picture";

// Utiliser un objet pour regrouper les fonctions utilitaires
export const DOMUtils = {
  createImage: (src, alt) => {
    try {
      const img = document.createElement("img");
      img.setAttribute("src", src);
      img.setAttribute("alt", alt);
      return img;
    } catch (error) {
      console.error(
        `Erreur lors de la création de l'image. Détails : ${error}`
      );
      return null;
    }
  },

  createHeading: (headingType, text) => {
    const heading = document.createElement(headingType);
    heading.textContent = text;
    return heading;
  },

  createParagraph: (text) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    return paragraph;
  },

  createCardContainer: (children) => {
    const imgContainer = document.createElement("div");
    imgContainer.classList.add(ClassPhotographerCard);
    children.forEach((child) => {
      imgContainer.appendChild(child);
    });
    return imgContainer;
  },

  createLinkWithHref: (href) => {
    const link = document.createElement("a");
    link.setAttribute("href", href);
    return link;
  },
};

// Fonction principale pour créer la carte d'un photographe
export function createPhotographerCard(data) {
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
}

// Fonction utilitaire pour créer un article avec un lien
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

// Fonction pour créer le DOM d'une carte utilisateur (utilise la fonction principale)
export function createUserCardDOM(data) {
  return createPhotographerCard(data);
}

// Fonction permettant de retourner sur l'acceuil avec "Alt"
function redirectToHome() {
  window.location.href = "index.html";
}

document.addEventListener("keydown", function (event) {
  var altKeyPressed = event.altKey;

  if (altKeyPressed) {
    redirectToHome();

    document.querySelector(".logo").style.transform = "scale(1.1)";
  }
});
