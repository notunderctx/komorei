/* eslint-disable @next/next/no-img-element */

import Relations from "@/components/Relations";
import BannerImage from "./BannerImg";
import Content from "./Content";
import EpisodeInfo from "./EpisodesInfo";
import Poster from "./Poster";

import PlayIcon from "./svg/PlayIcon";
import Characters from "./CharacterCard";
import Recomandations from "./Recomandations";
import MangaChapters from "./ChapterInfo";

function Banner({ data }: { data: any }) {
  return (
    <div className="w-screen min-h-screen relative flex flex-col items-center bg-background gap-5 overflow-x-hidden no-scrollbar">
      <BannerImage imageURL={data?.cover} />
      <div className="w-full lg:max-w-screen-lg xl:max-w-[1600px] z-30 flex flex-col gap-5">
        <div className="gap-6 w-full pt-4 md:pt-10 flex flex-col items-center justify-center">
          <div className="flex flex-col md:flex-row w-full items-center md:items-end gap-5 pt-12 px-3 xl:px-14">
            <Poster imageUrl={data?.image} />
            <Content data={data} />
          </div>
          <div className="hidden md:flex gap-5 items-center justify-start w-full px-3 xl:px-14 cursor-pointer">
            <button
              className={` ${
                data?.status == "NOT_YET_RELEASED" ? "opacity-30" : ""
              } pointer-events-none w-[180px] flex-center text-lg font-karla font-semibold gap-2 border-black border-opacity-10 text-black rounded-full py-1 px-4 bg-white hover:opacity-80 `}
              type="button">
              {data?.format === "MANGA" ? (
                <a
                  className="text-center flex-row"
                  href={`${data?.status == "NOT_YET_RELEASED" ? "" : `/read-online/Solo-Leveling-chapter-1`}`}>
                  Read
                </a>
              ) : (
                <a
                  className="text-center flex-row"
                  href={`${data?.status == "NOT_YET_RELEASED" ? "" : `/watch?a=${data?.title?.romaji || data?.title?.romanji || data?.title?.native || ""}&id=${data?.id}&ep=${1}&title=${JSON.stringify(data?.title)}&mall=&${Math.random() * 69}`}`}>
                  <PlayIcon className="" />
                  Watch now
                </a>
              )}
            </button>
          </div>
          {data?.rela || data?.relations === true ? (
            <Relations data={data} />
          ) : (
            ""
          )}
          {data?.format === "ANIME" ? (
            <EpisodeInfo data={data} />
          ) : (
            <div className="w-full">
              {" "}
              <MangaChapters data={data} />
            </div>
          )}
          <Characters info={data?.characters} />
          <Recomandations info={data?.recommendations} />
        </div>
      </div>
    </div>
  );
}

export default Banner;
