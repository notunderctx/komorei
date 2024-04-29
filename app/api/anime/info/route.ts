import axios from "axios";
import { NextRequest, NextResponse as Response } from "next/server";

export type Data = {
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
  mappings: {
    id: string;
    providerId: string;
    similarity: number;
    providerType: "ANIME" | "MANGA" | "META" | "INFORMATION";
  }[];
  synonyms: string[];
  countryOfOrigin: string;
  description: string;
  duration: number | null;
  color: string | null;
  year: number | null;
  rating: {
    mal: number | null;
    tvdb: number | null;
    kitsu: number | null;
    anilist: number | null;
    anidb: number | null;
    tmdb: number | null;
    comick: number | null;
    mangadex: number | null;
    novelupdates: number | null;
  };
  popularity: {
    mal: number | null;
    tvdb: number | null;
    kitsu: number | null;
    anilist: number | null;
    anidb: number | null;
    tmdb: number | null;
    comick: number | null;
    mangadex: number | null;
    novelupdates: number | null;
  };
  type: "ANIME | MANGA";
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
  relations: [
    {
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
    },
  ];
  characters: [
    {
      name: string;
      image: string;
      voiceActor: {
        name: string;
        image: string;
      };
    },
  ];
  totalEpisodes: number | null;
  totalVolumes: number | null;
  totalChapters: number | null;
  genres: string[];
  tags: string[];
  episodes: {
    latest: {
      updatedAt: number;
      latestTitle: string;
      latestEpisode: number;
    };
    data: [
      {
        episodes: [
          {
            id: string;
            img: string | null;
            title: string;
            hasDub: boolean;
            description: string | null;
            rating: number | null;
            number: number;
            isFiller: boolean;
            updatedAt: number;
          },
        ];
        providerId: string;
      },
    ];
  };
  chapters: {
    latest: {
      updatedAt: number;
      latestTitle: string;
      latestChapter: number;
    };
    data: [
      {
        chapters: [
          {
            id: string;
            title: string;
            number: number;
            rating: number | null;
            updatedAt: number;
            mixdrop: string | null;
          },
        ];
        providerId: string;
      },
    ];
  };
  averageRating: number;
  averagePopularity: number;
  artwork: [
    {
      img: string;
      type: "banner" | "poster" | "clear_logo" | "top_banner";
      providerId: string;
    },
  ];
  relationType: string;
};

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const idparam = searchParams.get("id");
  const apiUrl = process.env.API_URL;

  try {
    const res = await axios.get(`${apiUrl}info/${idparam}`);
    const ress = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `query ($id: Int) { 
  Media (id: $id, type: ANIME) { 
    id
    title {
      romaji
      english
      native
    }
  
    relations {
      nodes {
        id
        title {
          romaji
          english
          native
          userPreferred
        }
        season
        type
        format
        coverImage {
          extraLarge
          large
          medium
          color
        }
        bannerImage
      }
    }
    
  
    recommendations {
      nodes {
        id
        media {
          title {
            romaji
            english
            native
            userPreferred
          }
          coverImage {
            extraLarge
            large
            medium
            color
          }
          bannerImage
          type
          format
        }
      }  
    }
  }
}

`,
        variables: {
          id: idparam,
        },
      }),
    });
    const jsonress = await ress.json();
    const recommendations: any = jsonress?.data?.Media?.recommendations || "";
    const AnilistRelations = jsonress?.data?.Media?.relations?.nodes || "";

    const _response: any = res.data;
    const {
      id,
      slug,
      coverImage,
      bannerImage,
      trailer,
      status,
      season,
      title,
      currentEpisode,
      synonyms,
      countryOfOrigin,
      description,
      duration,
      color,
      year,
      rating,
      format,
      type,
      relations,
      totalEpisodes,
      genres,
      tags,
      episodes,
      chapters,
      artwork,
      characters,
      popularity,
    } = _response;
    const rela = relations || AnilistRelations;

    let responseData: Data | any = {
      id: id,
      slug: slug,
      title,
      season: season,
      synonyms,
      isAdult: false,
      countryOfOrigin: countryOfOrigin,
      trailer,
      image: coverImage,
      cover: bannerImage,
      color: color,
      description: description,
      status: status,
      popularity,
      type: format,
      format: type,
      releaseDate: year,
      totalEpisodes: totalEpisodes,
      currentEpisode: currentEpisode,
      rating,
      duration: duration,
      genres,
      rela,
      relations,
      recommendations,
      characters,
      episodes,
      artwork,
      tags,
      chapters,
    };
    return Response.json(responseData);
  } catch (err: any) {
    return Response.json({
      error: "err finding anime",
      message: `${err.message}`,
      full: `${err}`,
    });
  }
}
