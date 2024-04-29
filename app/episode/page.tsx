"use client";

import Loading from "@/components/Loading";
import Player from "@/components/player/Video";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { API_URL } from "../Constants";

const SBS = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sub, setSub] = useState("");
  const [dub, setDub] = useState("");
  const [isSubLoaded, setIsSubLoaded] = useState(false);
  const searchParams = useSearchParams();
  const anime = searchParams.get("anime") || "";
  const episode = searchParams.get("episode") || "";
  const type = searchParams.get("type") || "";

  const slugify = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dubSlug = " dub ";
        const [dubResponse, subResponse] = await Promise.all([
          fetch(
            `${API_URL}/anime/gogoanime/watch/${slugify(`${anime}${dubSlug} episode ${episode}`)}`
          ),
          fetch(
            `${API_URL}/anime/gogoanime/watch/${slugify(`${anime} episode ${episode}`)}`
          ),
        ]);

        if (subResponse.ok) {
          const subJson = await subResponse.json();
          const subFirstSourceUrl =
            subJson.sources.find((source) => source.url)?.url || "";
          setSub(subFirstSourceUrl);
          setIsSubLoaded(true);
        }

        if (dubResponse.ok && isSubLoaded) {
          const dubJson = await dubResponse.json();
          const dubFirstSourceUrl =
            dubJson.sources.find((source) => source.url)?.url || "";
          setDub(dubFirstSourceUrl);
        } else {
          console.log("No sub found.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [anime, episode, isSubLoaded]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error occurred while fetching data.</div>;
  }

  return (
    <Player
      sub={sub}
      dub={dub || sub || ""}
      option={{
        autoOrientation: true,
        url: `${type === "dub" ? dub : sub || sub}`,
        hotkey: true,
        pip: true,
        airplay: true,
        lock: true,
        crossorigin: "anonymous",
      }}
      getInstance={(art: any) => console.info(art)}
    />
  );
};

export default SBS;
