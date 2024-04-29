"use client";

import { IAnimeResult } from "@consumet/extensions";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

interface FirstProps {
  data: any;
}
const First: React.FC<FirstProps> = ({ data }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [animeData, setAnimeData] = useState<IAnimeResult | null | any>(null);
  useEffect(() => {
    setAnimeData(data);
  }, [data]);

  return (
    <>
      <div className="p-[90px]">
        <div className="text-black hover:text-white">
          <picture
            className=" cursor-pointer"
            onClick={() => {
              window.open(`/streaming/${animeData[0]?.id}`);
            }}>
            <img
              src={animeData?.[0]?.bannerImage}
              alt="number 1 anime "
              className="w-[1190px] h-[358.34] hover:border hover:border-spacing-1 transition hover:opacity-5"
            />
          </picture>
          <p
            className="text-center cursor-pointer"
            onClick={() => {
              window.open(`/streaming/${animeData[0]?.id}`);
            }}>
            watch now
          </p>
        </div>
      </div>
    </>
  );
};

export default First;
