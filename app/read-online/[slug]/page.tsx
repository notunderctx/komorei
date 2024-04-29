"use client";

import ChpaterViewer from "@/components/ChapterViewer";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function Read() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const ChapterId = searchParams.get("chapterID");
  const number: any = searchParams.get("number");
  const provider = searchParams.get("provider");
  const [loading, SetLoading] = useState(true);
  const [data, SetData] = useState([]);
  let x = "g";

  useEffect(() => {
    async function FetchChapters(): Promise<void> {
      try {
        let url = `https://api.anify.tv/pages/${id}/${number}/${provider}/${encodeURIComponent(ChapterId as string)}`;

        let res = await fetch(url, {
          next: {
            revalidate: 86400,
          },
        });
        let json = await res.json();
        console.log(json);
        if (res.ok) {
          SetLoading(false);
          SetData(json);
          console.log(data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    if (loading) FetchChapters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [x]);
  console.log("jhi");
  return (
    <div className="flex justify-center w-full h-full relative font-karla bg-black/20">
      {loading ? (
        <div className=" flex justify-center items-center h-screen">
          <div className="text-center loader"></div>
        </div>
      ) : (
        <div className="flex justify-center w-full h-full relative font-karla bg-black/20">
          <ChpaterViewer
            data={
              data || [
                {
                  url: "https://scans-hot.leanbox.us/manga/Chainsaw-Man/0163-001.png",
                  index: 1,
                  headers: {
                    Referer: "",
                  },
                },
                {
                  url: "https://scans-hot.leanbox.us/manga/Chainsaw-Man/0163-002.png",
                  index: 1,
                  headers: {
                    Referer: "",
                  },
                },
                {
                  url: "https://scans-hot.leanbox.us/manga/Chainsaw-Man/0163-003.png",
                  index: 1,
                  headers: {
                    Referer: "",
                  },
                },
              ]
            }
          />
        </div>
      )}
    </div>
  );
}

export default Read;
