/**
 * Ouvre le modal personnalisé de contact.
 *
 * @returns {void}
 */
export function openCustomModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

/**
 * Ferme le modal personnalisé de contact.
 *
 * @returns {void}
 */
export function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}
