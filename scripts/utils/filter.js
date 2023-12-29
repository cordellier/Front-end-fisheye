export const openCloseFilterMenu = () => {
  const filterMenu = document.querySelector(".dropdown_content");
  const filterMenuButton = document.querySelector(".btn_drop");
  const filterButtons = document.querySelectorAll(".dropdown_content button");

  filterMenuButton.addEventListener("click", () => {
    const isExpanded =
      filterMenuButton.getAttribute("aria-expanded") === "true" || false;
    filterMenuButton.setAttribute("aria-expanded", !isExpanded);
    filterMenu.classList.toggle("curtain_effect");
    document.querySelector(".fa-chevron-up").classList.toggle("rotate");

    const newAriaHiddenValue = filterMenu.classList.contains("curtain_effect")
      ? "false"
      : "true";
    filterMenu.setAttribute("aria-hidden", newAriaHiddenValue);

    const newTabIndexValue = filterMenu.classList.contains("curtain_effect")
      ? "0"
      : "-1";
    filterButtons.forEach((button) =>
      button.setAttribute("tabindex", newTabIndexValue)
    );
  });
};

export const displayMediaWithFilter = (mediasTemplate) => {
  const currentFilter = document.querySelector("#current_filter");
  const allFilters = Array.from(
    document.querySelectorAll(".dropdown_content li button")
  );

  let filterAlreadySelected = allFilters.find(
    (filter) => filter.textContent == currentFilter.textContent
  );
  filterAlreadySelected.style.display = "none";

  allFilters.forEach((filter) => {
    filter.addEventListener("click", () => {
      currentFilter.textContent = filter.textContent;
      if (filterAlreadySelected) filterAlreadySelected.style.display = "block";

      filterAlreadySelected = filter;
      filterAlreadySelected.style.display = "none";

      sortByFilter(filter.textContent);
    });
  });

  const sortByFilter = (filterValue) => {
    switch (filterValue) {
      case "Titre":
        console.log("Tri par Titre");
        mediasTemplate.medias.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Popularité":
        console.log("Tri par Popularité");
        mediasTemplate.medias.sort((a, b) => b.likes - a.likes);
        break;
      case "Date":
        console.log("Tri par Date");
        mediasTemplate.medias.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        break;
      default:
        console.log("Aucun tri spécifié");
    }

    // Vérification de l'existence de la méthode avant de l'appeler
    if (typeof mediasTemplate.factoryMedia === "function") {
      mediasTemplate.factoryMedia();
    }

    const mediasfiltered = mediasTemplate;
    console.log("Médias filtrés:", mediasfiltered);

    const mediaElements = document.querySelectorAll(".gallery_card");
    mediaElements.forEach((media, index) => {
      setTimeout(() => {
        media.classList.add("animeCard");
      }, 100 * index);
    });
  };
};
