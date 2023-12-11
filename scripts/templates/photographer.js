const ClassPhotographerCard = "photographer_picture";

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

function redirectToHome() {
  window.location.href = "index.html";
}

document.querySelector(".logo").addEventListener("click", function () {
  redirectToHome();
});

export function createCardContainer(children) {
  const imgcontainer = document.createElement("div");
  imgcontainer.classList.add("photographer_card");
  imgcontainer.setAttribute("tabindex", "0");
  children.forEach((child) => {
    imgcontainer.appendChild(child);
  });
  return imgcontainer;
}
