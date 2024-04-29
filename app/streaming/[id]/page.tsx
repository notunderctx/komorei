"use client";

import Banner from "@/components/Banner";
import Header from "@/components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import ErrorC from "@/components/Error";
import Head from "next/head";

function Stream() {
  let x = "stop";
  const [animeData, setAnimeData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(false);
  const params = useParams<{ id: string }>();

  useEffect(() => {
    async function fetchData() {
      const data = params.id;

      try {
        const response = await axios.get(`/api/anime/info?id=${data}`);

        if (response.status === 200) {
          setAnimeData(response.data);
          setIsLoading(false);
          setData(true);
        }
      } catch (error) {
        console.log("Error fetching data:", error);

        setData(false);
        setIsLoading(true);
      }
    }
    if (isLoading) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [x]); //*/
  const info = animeData;
  return (
    <>
      {isLoading ? (
        <div>....</div>
      ) : (
        <>
          {data ? (
            <>
              <Head>
                <title>
                  {animeData
                    ? animeData?.title?.romaji || animeData?.title?.english
                    : "Retrieving Data..."}
                </title>
                <meta
                  name="title"
                  content={info?.title?.romaji}
                  data-title-romaji={info?.title?.romaji}
                  data-title-english={info?.title?.english}
                  data-title-native={info?.title?.native}
                />
                <meta name="description" content={info?.description} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta
                  name="twitter:title"
                  content={`Fifteen - ${info?.title?.romaji || info?.title?.english || info?.title?.native}`}
                />
                <meta
                  name="twitter:description"
                  content={`${info.description?.slice(0, 180)}...`}
                />
              </Head>
              <div
                className="text-white"
                style={{
                  background: "black",
                }}>
                <Banner data={animeData} />
              </div>
            </>
          ) : (
            <ErrorC />
          )}
        </>
      )}
    </>
  );
}

export default Stream;
