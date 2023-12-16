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
