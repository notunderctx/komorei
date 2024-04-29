import axios from "axios";
import { NextRequest, NextResponse as Response } from "next/server";

export async function GET(req: NextRequest) {
  const apiUrl = process.env.API_URL;
  try {
    const { data } = await axios.post("https://graphql.anilist.co", {
      query: `query ($page: Int, $perPage: Int) {
        Page (page: $page, perPage: $perPage) {
          pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
          }
          media (sort: POPULARITY_DESC, type: ANIME) {
            id
            idMal
            title {
              romaji
              english
              native
            }
            coverImage {
                              extraLarge
                              large
                              medium
                              color
                            } 
            averageScore
            description
            episodes
            status
            source
          }
        }
      }`,
      variables: {
        page: 1,
        perPage: 20,
      },
    });

    const media = data?.data?.Page?.media;

    return Response.json(media);
  } catch (err: any) {
    console.error("Error fetching anime:", err);
    return Response.json({
      error: "Error finding anime",
      message: err.message || "Unknown error occurred",
      // Optionally, include additional information if needed
    });
  }
}
