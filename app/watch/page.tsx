"use client";

import Embed from "@/components/Embed";
import Head from "next/head";
import router, { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import WatchInfo from "@/components/WatchInfo";
import EpisodeSection from "@/components/EpisodesSection";

function Watch() {
  const searchParams = useSearchParams() || "";

  const a = searchParams.get("a") || "";
  const id = searchParams.get("id") || "";
  const ep = searchParams.get("ep") || "";
  const Eptitle = searchParams.get("titleEp") || "";
  const t: any = searchParams.get("type");
  const titleP = JSON.parse(searchParams.get("title") as string) || "";
  const [display, setDisplay] = useState("");
  const [data, setData] = useState<any>({});
  const [loading, SetLoading] = useState(true);
  const [loadingE, SetLoadingE] = useState(true);
  const [Error, setS] = useState(false);
  const [episodes, setEpisodes] = useState<any>([]);
  const [episodesC, setEpisodesC] = useState<any>([]);
  const [Dub, setDub] = useState<"sub" | "dub">(t);

  useEffect(() => {
    async function FetchEpisodes() {
      try {
        const res = await fetch("https://graphql.anilist.co", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            query: `query ($id: Int) { Media (id: $id, type: ANIME) { id streamingEpisodes {
  title
  thumbnail
  url
  site
  
} title { romaji english native } 
  coverImage {
    extraLarge
    large
    medium
    color
  }
  description
  synonyms
  status
  bannerImage
  status
  studios {
    edges {
      id
      node{
        name
        
        
      }
    }
  }
  
} }`,
            variables: {
              id: id,
            },
          }),
        });
        if (res.ok) {
          const jso = await res.json();
          setData(jso?.data?.Media);
          SetLoading(false);
        }
      } catch (error: any) {
        console.log(error);
        setS(true);
      }
    }
    async function FetchMetaData() {
      try {
        let ress = await fetch(`https://api.anify.tv/content-metadata/${id}`, {
          next: {
            revalidate: 86400,
          },
        });

        if (ress.ok) {
          let response = await ress.json();
          let ressdata = response?.[0].data;
          if (response?.length >= 2) {
            for (let i = 0; i < response.length; i++) {
              if (response[i]?.providerId === "tvdb") {
                setEpisodesC([response?.[i]]);
                setEpisodes(response?.[i]?.data);
                SetLoadingE(false);
              }
            }
          }
          if (response?.length === 1) {
            setEpisodesC(response);
            setEpisodes(ressdata);
            SetLoadingE(false);
          }
        } else {
          setEpisodes([]);
        }
      } catch (err: any) {
        console.log(err);
      }
    }
    if (loading && loadingE) {
      FetchEpisodes();
      FetchMetaData();
    }
  }, [id, loading, loadingE]);
  const base = `/watch?a=${a}&id=${id}&ep=${ep}&title=${JSON.stringify(titleP)}&titleEp=${Eptitle}`;
  const episodez = data?.streamingEpisodes;
  function findEpisodeByTitleStartingWithEpisode(number: any) {
    return episodez.find((episode: any) =>
      episode?.title?.startsWith(`Episode ${number}`)
    );
  }

  return (
    <>
      fallback=
      {
        <div className="h-screen flex items-center justify-center">
          <div className="loader">
            <label>Please wait...</label>
            <div className="loading"></div>
          </div>
        </div>
      }
      {!loading ? (
        <div className="w-screen h-full mb-10 no-scrollbar">
          <div className="lg:max-w-[1760px] lg:px-5 w-full flex flex-col lg:flex-row mx-auto">
            <div className="w-full">
              <div
                className="relative w-full flex-center lg:rounded-lg overflow-hidden aspect-auto  pt-2 "
                style={{
                  height: "488.13px",
                }}>
                <Embed anime={a} episodeNumber={ep} id={id} type={t || "sub"} />
              </div>
              <div
                className="rounded flex items-center justify-between px-2 py-2 w-full bg-red-500/20 font-karla text-sm text-white "
                style={{
                  display: `${display}`,
                }}>
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                    />
                  </svg>

                  <p>
                    If the player isn&rsquo;t working, refresh the page. If the
                    problem persists, please report it.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                    onClick={() => {
                      setDisplay("none");
                    }}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col px-3 lg:px-0 mt-2 text-white">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 bg-secondary px-2 rounded text-sm py-1">
                      <h3>{`episode ${ep}`}</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm *:bg-secondary">
                    <label htmlFor="sub/dub">sub/dub</label>
                    <div
                      data-name="sub/dub"
                      id="sub/dub"
                      className="flex flex-row">
                      <div
                        onClick={() => {
                          setDub("sub");
                        }}
                        className="btnm">
                        <a href={`${base}&type=sub`}>Sub</a>
                      </div>
                      <div
                        onClick={() => {
                          setDub("dub");
                        }}
                        className="btnm">
                        <a href={`${base}&type=dub`}>Dub</a>
                      </div>
                    </div>
                  </div>
                </div>
                <a
                  className="flex flex-col gap-2 font-karla pt-2 pb-3 w-full line-clamp-2 font-black hover:underline"
                  href={`/streaming/${id}`}>
                  {episodes?.[parseFloat(ep as string) - 1]?.title ||
                    Eptitle ||
                    findEpisodeByTitleStartingWithEpisode(ep)?.title}
                </a>

                <p
                  className="md:line-clamp-2 line-clamp-3 md:text-start text-center text-sm md:text-base  antialiased font-karla leading-6 font-medium"
                  {...(episodes?.[parseFloat(ep as string) - 1]?.description ||
                    "")}
                  href={`/streaming/${id}`}
                  dangerouslySetInnerHTML={{
                    __html:
                      episodes?.[parseFloat(ep as string) - 1]?.description ||
                      "",
                  }}
                />
              </div>
              <div className="h-[1px] w-full bg-secondary mt-2"></div>
              <WatchInfo data={data} id={id} />
            </div>
            <EpisodeSection
              data={episodesC}
              ep={ep}
              id={id}
              animeName={a}
              animeTtitles={JSON.stringify(titleP)}
            />
          </div>
        </div>
      ) : (
        "loading..."
      )}
    </>
  );
}

const SuspenseWrapperW = () => {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          <div className="loader">
            <label>Please wait...</label>
            <div className="loading"></div>
          </div>
        </div>
      }>
      <Watch />
    </Suspense>
  );
};

export default SuspenseWrapperW;
