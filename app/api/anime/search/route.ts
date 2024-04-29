import axios from "axios";
import { NextRequest, NextResponse as Response } from "next/server";

export interface SearchResult {
  id: string;
  slug: string;
  coverImage: string;
  bannerImage: string;
  trailer: string | null;
  status:
    | "FINISHED"
    | "RELEASING"
    | "NOT_YET_RELEASED"
    | "CANCELLED"
    | "HIATUS";
  season: "SUMMER" | "FALL" | "WINTER" | "SPRING";
  title: {
    native: string | null;
    romaji: string | null;
    english: string | null;
  };
  currentEpisode: number | null;
  mappings: Mapping[];
  synonyms: string[];
  countryOfOrigin: string;
  description: string;
  duration: number | null;
  color: string | null;
  year: number | null;
  rating: Rating;
  popularity: Popularity;
  type: "ANIME" | "MANGA";
  format:
    | "TV"
    | "TV_SHORT"
    | "MOVIE"
    | "SPECIAL"
    | "OVA"
    | "ONA"
    | "MUSIC"
    | "MANGA"
    | "NOVEL"
    | "ONE_SHOT"
    | "UNKNOWN";
  relations: Relation[];
  characters: Character[];
  totalEpisodes: number | null;
  totalVolumes: number | null;
  totalChapters: number | null;
  genres: string[];
  tags: string[];
  episodes: {
    latest: EpisodeInfo;
    data: EpisodeData[];
  };
  chapters: {
    latest: ChapterInfo;
    data: ChapterData[];
  };
  averageRating: number;
  averagePopularity: number;
  artwork: Artwork[];
}

interface Mapping {
  id: string;
  providerId: string;
  similarity: number;
  providerType: "ANIME" | "MANGA" | "META" | "INFORMATION";
}

interface Rating {
  mal: number | null;
  tvdb: number | null;
  kitsu: number | null;
  anilist: number | null;
  anidb: number | null;
  tmdb: number | null;
  comick: number | null;
  mangadex: number | null;
  novelupdates: number | null;
}

interface Popularity {
  mal: number | null;
  tvdb: number | null;
  kitsu: number | null;
  anilist: number | null;
  anidb: number | null;
  tmdb: number | null;
  comick: number | null;
  mangadex: number | null;
  novelupdates: number | null;
}

interface Relation {
  id: number;
  data: {
    id: number;
    type: "ANIME" | "MANGA";
    title: {
      userPreferred: string;
    };
    format:
      | "TV"
      | "TV_SHORT"
      | "MOVIE"
      | "SPECIAL"
      | "OVA"
      | "ONA"
      | "MUSIC"
      | "MANGA"
      | "NOVEL"
      | "ONE_SHOT"
      | "UNKNOWN";
    status:
      | "FINISHED"
      | "RELEASING"
      | "NOT_YET_RELEASED"
      | "CANCELLED"
      | "HIATUS";
    coverImage: {
      large: string;
    };
    bannerImage: string | null;
  };
  type:
    | "ADAPTATION"
    | "PREQUEL"
    | "SEQUEL"
    | "PARENT"
    | "SIDE_STORY"
    | "CHARACTER"
    | "SUMMARY"
    | "ALTERNATIVE"
    | "SPIN_OFF"
    | "OTHER"
    | "SOURCE"
    | "COMPILATION"
    | "CONTAINS";
}

interface Character {
  name: string;
  image: string;
  voiceActor: {
    name: string;
    image: string;
  };
}

interface EpisodeInfo {
  updatedAt: number;
  latestTitle: string;
  latestEpisode: number;
}

interface EpisodeData {
  episodes: Episode[];
  providerId: string;
}

interface Episode {
  id: string;
  img: string | null;
  title: string;
  hasDub: boolean;
  description: string | null;
  rating: number | null;
  number: number;
  isFiller: boolean;
  updatedAt: number;
}

interface ChapterInfo {
  updatedAt: number;
  latestTitle: string;
  latestChapter: number;
}

interface ChapterData {
  chapters: Chapter[];
  providerId: string;
}

interface Chapter {
  id: string;
  title: string;
  number: number;
  rating: number | null;
  updatedAt: number;
  mixdrop: string | null;
}

interface Artwork {
  img: string;
  type: "banner" | "poster" | "clear_logo" | "top_banner";
  providerId: string;
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("query");
  const apiUrl = process.env.API_URL;
  try {
    const res = await axios.get(`${apiUrl}search/anime/${query}/`);
    const _response: any | SearchResult = res.data;
    return Response.json(_response);
  } catch (err: any) {
    console.log(err);
    return Response.json({
      error: "err searching anime",
      message: `${err.message}`,
      full: `${err}`,
    });
  }
}
