import axios from "axios";

// Function to fetch manga ID
export async function fetchMangaId(romaji, english, native) {
  try {
    const { data: mangaResults } = await axios.get(
      `https://api.anify.tv/search-advanced?query=${english || romaji}&type=manga`
    );

    const foundManga = mangaResults?.results?.find(
      (manga) =>
        manga.title.romaji === romaji ||
        manga.title.english === english ||
        manga.title.native === native
    );

    if (!foundManga) {
      return null;
    }

    // Return manga ID
    return { id: foundManga.id };
  } catch (error) {
    console.error("Error fetching manga data:", error);
    return null;
  }
}

export async function getMangaId(romaji, english, native) {
  try {
    const mangaData = await fetchMangaId(romaji, english, native);

    if (mangaData) {
      return mangaData;
    } else {
      return { message: "Manga not found" };
    }
  } catch (error) {
    return { error };
  }
}

export default getMangaId;
