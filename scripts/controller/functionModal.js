/**
 * Affiche un message d'erreur pour un élément spécifié.
 *
 * @param {HTMLElement} element - L'élément HTML pour lequel afficher le message d'erreur.
 * @param {string|Object} message - Le message d'erreur à afficher.
 * @returns {void}
 */
export const setErrorMessage = (element, message) => {
  const errorMessage =
    message && typeof message === "object" ? message.email : message;
  element.parentElement.setAttribute("data-error-visible", "true");
  element.parentElement.setAttribute("data-error", errorMessage);
};

/**
 * Masque le message d'erreur d'un élément spécifié.
 *
 * @param {HTMLElement} element - L'élément HTML pour lequel masquer le message d'erreur.
 * @returns {void}
 */
export const hideErrorMessage = (element) => {
  element.parentElement.removeAttribute("data-error-visible");
  element.parentElement.removeAttribute("data-error");
};

/**
 * Valide le contenu d'un champ de nom.
 *
 * @param {HTMLInputElement} element - Le champ de nom à valider.
 * @returns {boolean} - Retourne true si le champ est valide, sinon false.
 */
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

/**
 * Valide le contenu d'un champ d'adresse e-mail.
 *
 * @param {HTMLInputElement} element - Le champ d'adresse e-mail à valider.
 * @returns {boolean} - Retourne true si le champ est valide, sinon false.
 */
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

/**
 * Valide le contenu d'un champ de message.
 *
 * @param {HTMLTextAreaElement} element - Le champ de message à valider.
 * @returns {boolean} - Retourne true si le champ est valide, sinon false.
 */
export const validateMessage = (element) => {
  if (element.value === "") {
    setErrorMessage(element, "Ce champ ne peut pas être vide.");
    return false;
  }
  hideErrorMessage(element);
  return true;
};
