/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { useEffect, useRef, useState } from "react";
import translate from "translate";
import axios from "axios";
import { IAnimeResult } from "@consumet/extensions";
import Link from "next/link";
import { PlayIcon } from "lucide-react";
import Image from "next/image";
import {
  FaClock,
  FaCalendar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import Loading from "./Loading";
import { H } from "./hero.style";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper";
import "swiper/swiper-bundle.css";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);
function truncate(str: string, maxlength: number) {
  return str?.length > maxlength
    ? str.substring(0, maxlength - 1) + "..."
    : str;
}

export function BillBoard() {
  const [translation, setTranslation] = useState<string | null>(null);
  const [animeData, setAnimeData] = useState<IAnimeResult[] | any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`/api/anime/trending`);
        const animeData = response.data;
        setAnimeData(animeData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    }

    if (isLoading) {
      fetchData();
    }
  }, [isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!animeData || animeData.length === 0) {
    return <div>No anime data available.</div>;
  }

  return (
    <H.Swiper
      slidesPerView={1}
      pagination={{
        clickable: true,
      }}
      direction="horizontal"
      loop={true}
      autoplay={{ delay: 3000 }}
      modules={[Pagination]}
      className="swiper"
      navigation={{
        nextEl: ".btn-next",
        prevEl: ".btn-prev",
      }}>
      {animeData.map((anime, idx) => (
        <H.Slides key={idx}>
          <H.ImgContainer>
            <H.Img
              src={anime?.coverImage.extraLarge || anime?.coverImage.medium}
              alt={anime?.title?.romaji || "Anime "}
              data-sizes={JSON.stringify(anime?.coverImage)}
            />
          </H.ImgContainer>
          <H.Content>
            <H.Rank>
              <p>#{idx + 1} Spotlight</p>
            </H.Rank>
            <H.Title>
              <Link href={`/streaming/${anime.id}`}>
                <p className="title">
                  {truncate(anime?.title.english, 50) ||
                    truncate(anime?.title?.romaji, 50) ||
                    truncate(anime?.title?.native, 50) ||
                    truncate(anime.attributes.userPreferred, 50) ||
                    "No Name found"}
                </p>
              </Link>
            </H.Title>
            <H.Icons>
              <H.Icon>
                <PlayIcon size={12} />
                {anime?.format || ""}
              </H.Icon>
              <H.Icon>
                <FaClock size={12} /> {anime?.currentEpisode || "N/A"}
              </H.Icon>
              <H.Icon>
                <FaCalendar size={12} />
                {anime?.year || "N/A"}
              </H.Icon>
            </H.Icons>
            <H.Description className="text-slate-400">
              <p
                dangerouslySetInnerHTML={{
                  __html:
                    truncate(anime?.description, 105) || "No description found",
                }}
              />
            </H.Description>
            <H.WatchBtn>
              <div className="" style={{}}>
                <div className="button">Watch now</div>
              </div>
            </H.WatchBtn>
          </H.Content>
        </H.Slides>
      ))}
      <div className="btn-prev">
        <FaChevronLeft />
      </div>
      <div className="btn-next">
        <FaChevronRight />
      </div>
    </H.Swiper>
  );
}

export default BillBoard;
