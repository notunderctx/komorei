import axios from "axios";

const BASE_URL = "/api";

export async function fetchTrending() {
  try {
    const response = await fetch(`${BASE_URL}/anime/trending`, {
      next: {
        revalidate: 86400,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error: any) {
    throw new Error(`Error fetching trending data: ${error.message}`);
  }
}

export async function fetchPopular() {
  try {
    const response = await fetch(`${BASE_URL}/anime/popular`, {
      next: {
        revalidate: 86400,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error: any) {
    throw new Error(`Error fetching popular data: ${error.message}`);
  }
}

export async function fetchPopularManga() {
  try {
    const response = await fetch(`${BASE_URL}/manga/popular`, {
      next: {
        revalidate: 86400,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error: any) {
    throw new Error(`Error fetching popular manga data: ${error.message}`);
  }
}

export async function fetchTrendingManga() {
  try {
    const response = await fetch(`${BASE_URL}/manga/trending`, {
      next: {
        revalidate: 86400,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error: any) {
    throw new Error(`Error fetching trending manga data: ${error.message}`);
  }
}

export async function fetchRecentEpisodes() {
  try {
    const response = await fetch(`${BASE_URL}/recentEpisodes`, {
      next: {
        revalidate: 86400,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error: any) {
    throw new Error(`Error fetching recent episodes data: ${error.message}`);
  }
}
