/* eslint-disable @next/next/no-img-element */
import { ChevronDownIcon, ChevronUpIcon, Home, Maximize2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { IoMdHome } from "react-icons/io";

interface Pages {
  url: string;
  index: number;
  headers: {
    [key: string]: string;
  };
}

const ChapterViewer: React.FC<{ data: any[] }> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") {
        goToPreviousPage();
      } else if (event.key === "ArrowDown") {
        goToNextPage();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(data.length - 1, prevPage + 1));
  };
  const back = () => {
    router.back();
  };

  const goToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(0, prevPage - 1));
  };

  return (
    <>
      <div
        className={`fixed flex px-2 justify-between items-center top-0 z-20 py-2 w-full bg-gradient-to-b from-black/30 to-transparent transform duration-300  ${
          showOptions ? "opacity-100" : "-translate-y-5 opacity-0"
        } ease-in-out`}>
        <div className="flex items-center gap-2">
          <button className="flex-center w-7 h-7 text-white" onClick={back}>
            <svg
              data-slot="icon"
              fill="none"
              strokeWidth={1.5}
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </button>
          <a href="/" className="flex items-center justify-center text-white">
            <IoMdHome size={30} />
          </a>
        </div>
        <div className="text-white flex-center cursor-pointer ">
          <Maximize2 />
        </div>
      </div>
      <div
        id="chp-v-r"
        onClick={() => setShowOptions(!showOptions)}
        className="text-white">
        <div className="min-w-0 relative max-w-screen-lg">
          <div className="flex items-center h-full">
            <div className="mx-auto h-full space-y-1">
              {data?.map((chapter: Pages, index: number) => (
                <div key={index} className={`relative`}>
                  <img
                    src={chapter.url}
                    alt={`Page ${index + 1}`}
                    className="w-full  transition-all duration-200 ease-in-out z-50"
                    height={3000}
                    width={3000}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4"></div>
          <div className="fixed bottom-0 left-0 w-full z-50 group  translate-all duration-300 ease-out">
            <div className="flex  gap-[1px] w-full">
              {data?.map((_: any, index: number) => (
                <div
                  className="relative flex w-full h-1 rounded bg-white/10 overflow-hidden "
                  key={index}>
                  <button
                    onClick={() => goToPage(index)}
                    className={`h-full rounded direction-reverse w-full bg-accent transform transition-all duration-300 ease-out ${
                      index === currentPage ? "bg-gray-800" : "bg-gray-800"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChapterViewer;
