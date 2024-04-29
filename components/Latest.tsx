/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import style from "styled-components";
import Loading from "./Loading";

export let Dot = style.p`
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(255, 255, 255, .3);
    display: inline-block;
    margin: 3px 6px;
    margin-top:15;
`;

interface LatestProps {
  data: string;
}

const LatestEpisodes: React.FC<LatestProps> = ({ data }) => {
  let x = "stop";
  const [animeData, setAnimeData] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  function truncate(str: string, maxlength: number) {
    return str?.length > maxlength
      ? str.substring(0, maxlength - 1) + "..."
      : str;
  }

  useEffect(() => {
    async function fetchData() {
      const url = "http://0.0.0.0:4000/";

      try {
        const response = await axios.get(`${url}${data}`);

        setAnimeData(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(true);
      }
    }
    if (isLoading) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [x]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="px-4 md:px-12 mt-4 space-y-8">
          <p className="text-md md:text-xl lg:text-2xl font-semibold mb-4 text-purple-500">
            Latest Episode
          </p>
          <div
            className=" flex flex-wrap gap-1"
            style={{
              margin: "-.75rem -.5rem",
              listStyle: "none",
            }}>
            {animeData?.map((anime: any, index: number) => (
              <>
                <div
                  key={index}
                  className="p-2 relative"
                  onClick={() => {
                    window.open(`/watch?_=${anime?.episodeId}`);
                  }}>
                  <picture>
                    <source
                      srcSet={`${anime?.image}?format=webp`}
                      type="image/webp"
                    />
                    <Image
                      src={anime?.image}
                      alt={
                        anime?.title?.romanji ||
                        anime?.title?.english ||
                        "anime episode cover"
                      }
                      height={650}
                      width={540}
                      className="h-[15vw] w-[12vw]"
                      hash={anime?.imageHash}
                      lang=""
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg-Kumo" />
                  <h3 className="text-white font-extrabold">
                    {truncate(anime?.title?.english, 15) ||
                      truncate(anime?.title?.romanji, 15) ||
                      truncate(anime?.title?.userPreferred, 15) ||
                      "N/A"}
                  </h3>
                  <span className="flex flex-row text-sm text-slate-500">
                    {anime?.type || "N/A"}
                    <Dot />
                    <p className="bg-purple-500 text-black p-1 rounded-md h-7 w-8 text-center ">
                      {anime?.episodeNumber || "N/A"}
                    </p>
                  </span>
                </div>
              </>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default LatestEpisodes;
