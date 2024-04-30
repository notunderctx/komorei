"use client";

import AnimeList from "@/components/AnimeList";
import BillBoard from "@/components/BillBoard";
import First from "@/components/First";
import Header from "@/components/Header";
import LatestEpisodes from "@/components/Latest";
import devtools from "devtools-detect";

import {
  fetchTrending,
  fetchPopular,
  fetchPopularManga,
  fetchTrendingManga,
  fetchRecentEpisodes,
} from "@/components/api";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [popularManga, setPopularManga] = useState([]);
  const [trendingManga, setTrendingManga] = useState([]);
  const [data, setIt] = useState(true);
  const x = "d";
  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const trendingData = await fetchTrending();
        const popularData = await fetchPopular();
        const popularMangaData = await fetchPopularManga();
        const trendingMangaData = await fetchTrendingManga();

        setTrending(trendingData);
        setPopular(popularData);
        setPopularManga(popularMangaData);
        setTrendingManga(trendingMangaData);
        setIt(false);
      } catch (error) {
        // Handle error
        console.error("Error fetching data:", error);
        // You can set a flag to indicate the error, display an error message, or any other appropriate action
      }
    };
    if (data) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [x]);
  if (devtools.isOpen) {
    window.location.replace("https://screenmessage.com/syyu");
  }

  const request: any = {};
  request.Trending = trending;
  request.Popular = popular;
  request.PopularManga = popularManga;
  request.TrendingManga = trendingManga;
  request.RecentEpisodes = [];
  const url =
    typeof window !== "undefined" ? window.location.origin : "fallback-url";

  return (
    <div className={""}>
      <Head>
        <title>Komorei </title>
        <meta
          name="description"
          content="Watch anime online at Komorei. Explore a wide range of titles across genres. Start streaming now!"
        />
        <meta name="" />
        <meta name="twitter:title" content="Komorei - Free Anime and Manga " />
        <meta
          name="twitter:description"
          content="Discover the best anime streaming experience at fifteen. Dive into a diverse collection of titles and start watching now! 🎬 #Anime #Streaming"
        />

        <meta name="twitter:image" content="/preview.png" />
        <meta
          name="description"
          content="Discover the best anime streaming experience at fifteen. Dive into a diverse collection of titles and start watching now! 🎬 #Anime #Streaming"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${url}`} />
        <meta
          property="og:title"
          content={`Watch Anime Online, Free Anime Streaming Online on komorei Anime Website`}
        />
        <meta
          property="og:description"
          content="Watch anime online at Komorei. Explore a wide range of titles across genres. Start streaming now!"
        />
        <meta
          property="og:image"
          content="https://s4.anilist.co/file/anilistcdn/user/avatar/large/b6726615-thB9VtblIdpC.png"
        />
        <meta property="og:image:width" content="650" />
        <meta property="og:image:height" content="350" />
      </Head>
      <div>
        {data ? (
          "loading"
        ) : (
          <>
            <Header />
            <BillBoard />
            <AnimeList data={request.Trending} title="Trending" />
            <AnimeList data={request.Popular} title="Popular" />
            <First data={request.Trending} />
            <AnimeList data={request.PopularManga} title="Popular Manga" />
            <AnimeList data={request.TrendingManga} title="Trending Manga" />
          </>
        )}
      </div>
    </div>
  );
}
