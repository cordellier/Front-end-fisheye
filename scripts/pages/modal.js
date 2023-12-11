import { validateName, validateEmail, validateMessage } from "./functions.js";

// Global DOM variables
const modal = document.getElementById("contact_modal");
const openModalBtn = document.querySelector(".contact_button");
const closeModalBtn = document.querySelector(".modal-close-btn");
const overlay = document.querySelector(".overlay");
const form = document.getElementById("contact-form");

// Event listeners
openModalBtn.addEventListener("click", displayModal);
closeModalBtn.addEventListener("click", closeModal);

// Launch modal function
function displayModal() {
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
  overlay.style.display = "block";
}

// Close modal function
function closeModal() {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
  overlay.style.display = "none";
}

// Close modal when the Escape key is pressed
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.style.display === "block") {
    closeModal();
  }
});

// Validate form on submit
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

// Fonction permettant de retourner sur l'accueil
function redirectToHome() {
  window.location.href = "index.html";
}

// Écouteur d'événement pour le clic sur la logo
document.querySelector(".logo").addEventListener("click", function () {
  redirectToHome();
});
