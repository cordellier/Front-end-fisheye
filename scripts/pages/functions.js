// Show error message
export const setErrorMessage = (element, message) => {
  const errorMessage =
    message && typeof message === "object" ? message.email : message;
  element.parentElement.setAttribute("data-error-visible", "true");
  element.parentElement.setAttribute("data-error", errorMessage);
};

// Hide error message
export const hideErrorMessage = (element) => {
  element.parentElement.removeAttribute("data-error-visible");
  element.parentElement.removeAttribute("data-error");
};

// Validate name input
export const validateName = (element) => {
  const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ]{2,}$/;
  if (!regex.test(element.value)) {
    setErrorMessage(
      element,
      "2 à 20 caractères, pas de chiffres ni de caractères spéciaux, sauf (-)"
    );
    return false;
  }
  hideErrorMessage(element);
  return true;
};

// Validate email input
export const validateEmail = (element) => {
  const emailRegex =
    /^[A-Za-z]{1,}[A-Za-z0-9._%+-]+@[A-Za-z.-]+\.[A-Za-z]{2,}$/;
  if (!emailRegex.test(element.value)) {
    setErrorMessage(element, "Veuillez renseigner une adresse mail valide.");
    return false;
  }
  hideErrorMessage(element);
  return true;
};

// Validate message input
export const validateMessage = (element) => {
  if (element.value === "") {
    setErrorMessage(element, "Ce champ ne peut pas être vide.");
    return false;
  }
  hideErrorMessage(element);
  return true;
};
