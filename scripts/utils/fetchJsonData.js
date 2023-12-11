export async function getPhotographers() {
  try {
    const response = await fetch("data/photographers.json");

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching photographers data:", error);
  }
}
