// functionModal.js
import {
  validateName,
  validateEmail,
  validateMessage,
} from "./functionModal.js";

/**
 * Configure le formulaire de contact.
 *
 * @returns {void}
 */
export function setupContactForm() {
  const openModalBtn = document.querySelector(".contact_button");
  const closeModalBtn = document.querySelector(".modal-close-btn");
  const overlay = document.querySelector(".overlay");
  const modal = document.getElementById("contact_modal");

  openModalBtn.addEventListener("click", displayModal);
  closeModalBtn.addEventListener("click", closeModal);

  /**
   * Affiche le modal de contact.
   *
   * @returns {void}
   */
  function displayModal() {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
    overlay.style.display = "block";

    // Focus sur le premier élément du modal
    const firstFocusableElement = modal.querySelector(
      "input, textarea, button"
    );
    if (firstFocusableElement) {
      firstFocusableElement.focus();
    }

    // Gestion du focus trap
    modal.addEventListener("keydown", trapFocus);
  }

  /**
   * Ferme le modal de contact.
   *
   * @returns {void}
   */
  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    overlay.style.display = "none";

    // Supprimez l'écouteur d'événements pour le focus trap
    modal.removeEventListener("keydown", trapFocus);
  }

  /**
   * Piège le focus à l'intérieur du modal de contact.
   *
   * @param {Event} e - L'événement de touche.
   * @returns {void}
   */
  function trapFocus(e) {
    const focusableElements = modal.querySelectorAll("input, textarea, button");
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement =
      focusableElements[focusableElements.length - 1];

    if (e.key === "Tab") {
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusableElement) {
          e.preventDefault();
          lastFocusableElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusableElement) {
          e.preventDefault();
          firstFocusableElement.focus();
        }
      }
    }
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "block") {
      closeModal();
    }
  });

  const form = document.getElementById("contact-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    validateForm();
  });

  const firstname = document.getElementById("first");
  const lastname = document.getElementById("last");
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  firstname.addEventListener("input", () => validateName(firstname));
  lastname.addEventListener("input", () => validateName(lastname));
  email.addEventListener("input", () => validateEmail(email));
  message.addEventListener("input", () => validateMessage(message));

  /**
   * Valide le formulaire de contact.
   *
   * @returns {void}
   */
  function validateForm() {
    const isFirstNameValid = validateName(firstname);
    const isLastNameValid = validateName(lastname);
    const isEmailValid = validateEmail(email);
    const isMessageValid = validateMessage(message);

    if (isFirstNameValid && isLastNameValid && isEmailValid && isMessageValid) {
      console.log(
        "Firstname: " +
          firstname.value +
          "\n" +
          "Lastname: " +
          lastname.value +
          "\n" +
          "Email: " +
          email.value +
          "\n" +
          "Message: " +
          message.value
      );
      form.reset();
      closeModal();
    }
  }
}
