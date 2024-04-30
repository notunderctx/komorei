/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import Image from "next/image";
import { IAnimeResult } from "@consumet/extensions";
import axios from "axios";
import PlayIcon from "@heroicons/react/24/outline/PlayIcon";
import Link from "next/link";
import getMangaId from "@/app/utils/GetMangaId";

interface MovieListProps {
  data: any;
  title: string;
}

const AnimeList: React.FC<MovieListProps> = ({ data, title }) => {
  const [animeData, setAnimeData] = useState<IAnimeResult[] | null | any[]>(
    null
  );
  const [id, setId] = useState("...");
  function getId(idv: any, anime: any) {
    const title = anime?.title;

    async function ss() {
      if (anime?.format === "MANGA") {
        const id: any = await getMangaId(
          title?.romaji,
          title?.english,
          title?.native
        );

        if (id.id === undefined) return idv;
        if (id.id) return id?.id;
      }
    }
    let t = ss().then((r) => {
      console.log(r);

      return r;
    });

    return t;
  }
  async function MId(idv: any, anime: any) {
    let re = await getId(idv, anime);
    console.log(re);
    return re;
  }
  async function IdsManga() {
    await Promise.all(
      animeData?.map(async (anime) => {
        if (anime?.format === "MANGA") {
          const originalId = anime?.id;

          anime.id = (await MId(originalId, anime)) || originalId;
        }
      }) as any
    );
  }
  IdsManga();

  function truncate(str: string, maxlength: number) {
    return str?.length > maxlength
      ? str.substring(0, maxlength - 1) + "..."
      : str;
  }
  const generateStarIcons = (rating: number) => {
    const fullStars = Math.floor(rating / 20);
    const halfStar = Math.round(rating / 20) % 2 === 1;

    let starIcons = "";

    for (let i = 0; i < fullStars; i++) {
      starIcons += '<span class="star">&#9733;</span>';
    }

    if (halfStar) {
      starIcons += '<span class="star">&#9734;</span>';
    }

    return starIcons;
  };

  useEffect(() => {
    setAnimeData(data);
  }, [data]);
  if (isEmpty(data)) {
    return null;
  }

  return (
    <>
      <div className="px-4 md:px-12 mt-4 space-y-8">
        <p className="text-md md:text-xl lg:text-2xl font-semibold mb-4 text-white">
          {title} this Season
        </p>
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex gap-1 flex-no-wrap">
            {animeData?.map((anime: any, index: number) => (
              <div key={index + `${anime?.id}`} className="p-2 group">
                <div
                  className=" h-[190px] w-[135px] xl:h-[265px] xl:w-[185px] rounded-md z-30 overflow-hidden relative"
                  onClick={() => {
                    window.open(
                      `/streaming/${
                        anime.type === "MANGA" ? `${anime?.id}` : `${anime?.id}`
                      }`
                    ); //href={`/streaming?an=${anime?.id}`}
                  }}>
                  <Image
                    height={650}
                    width={540}
                    src={
                      anime?.coverImage?.extraLarge ||
                      anime?.coverImage?.extraLarge
                    }
                    alt={
                      anime?.title?.english ||
                      anime?.title?.romaji ||
                      "anime image"
                    }
                    draggable={false}
                    className="cursor-pointer object-cover transition duration shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300"
                  />
                  <div className="opacity-0 absolute top-0 transition duration-200 z-10 invisible sm:visible delay-300 w-full scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw] group-hover:opacity-100">
                    <Image
                      height={650}
                      width={540}
                      src={anime?.coverImage?.large}
                      alt={
                        anime?.title?.english ||
                        anime?.title?.romaji ||
                        "anime image"
                      }
                      draggable={false}
                      className="h-[190px] w-[135px] scale-0.5
"
                    />
                    <div className="z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md">
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-row items-center gap-3">
                          <div className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300">
                            <PlayIcon
                              className=" w-4 lg:w-10 text-center bg-purple-400 rounded-3xl"
                              onClick={() => {
                                window.open(
                                  `${anime?.type === "MANGA" ? `${anime?.id}` : `${data?.status == "NOT_YET_RELEASED" ? "" : `/watch?a=${data?.title?.romaji || data?.title?.romanji || data?.title?.native || ""}&id=${data?.id}&ep=${1}&title=${JSON.stringify(data?.title)}&mall=&${Math.random() * 69}`}`}`
                                ); //href={`/streaming?an=${anime?.id}`}
                                //href={`${data?.status == "NOT_YET_RELEASED" ? "" : `/watch?a=${anime?.title?.romaji || anime?.title?.romanji || anime?.title?.native || ""}&id=${anime?.id}&ep=${1}&title=${JSON.stringify(anime?.title)}&mall=&${Math.random() * 69}`}`}
                              }}
                            />
                          </div>
                          <div className="text-white text-sm">
                            <h2
                              className="text-base font-extrabold cursor-pointer mt-5"
                              onClick={() => {
                                window.open(
                                  `/streaming?an=${anime?.id}${anime?.type === "MANGA" ? "&t=MANGA" : ""}`
                                ); //href={`/streaming?an=${anime?.id}`}
                              }}>
                              {truncate(anime?.title?.english, 50) ||
                                truncate(anime?.title?.romanji, 50) ||
                                truncate(anime?.title?.userPreferred, 50) ||
                                "N/A"}
                            </h2>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: truncate(anime?.description, 105) || "",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AnimeList;
