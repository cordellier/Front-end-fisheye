/**
 * Récupère les données des photographes à partir d'un fichier JSON.
 *
 * @async
 * @returns {Promise<Object>} - Une promesse résolue avec les données des photographes.
 * @throws {Error} - Une erreur si la récupération des données échoue.
 */
export async function getPhotographers() {
  try {
    const response = await fetch("../../data/photographer.json");

    if (!response.ok) {
      throw new Error("Échec de la récupération des données");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données des photographes :",
      error
    );
  }
}
