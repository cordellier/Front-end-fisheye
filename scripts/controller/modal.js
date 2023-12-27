// functionModal.js
import {
  validateName,
  validateEmail,
  validateMessage,
} from "./functionModal.js";

export function setupContactForm() {
  const openModalBtn = document.querySelector(".contact_button");
  const closeModalBtn = document.querySelector(".modal-close-btn");
  const overlay = document.querySelector(".overlay");
  const modal = document.getElementById("contact_modal");

  openModalBtn.addEventListener("click", displayModal);
  closeModalBtn.addEventListener("click", closeModal);

  function displayModal() {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
    overlay.style.display = "block";
  }

  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    overlay.style.display = "none";
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

  // FORM VALIDATION PROCESS
  const firstname = document.getElementById("first");
  const lastname = document.getElementById("last");
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  // EVENTS LISTENERS ON CHANGE
  firstname.addEventListener("input", () => validateName(firstname));
  lastname.addEventListener("input", () => validateName(lastname));
  email.addEventListener("input", () => validateEmail(email));
  message.addEventListener("input", () => validateMessage(message));

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
