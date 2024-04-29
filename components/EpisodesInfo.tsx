import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import Image from "next/image";

function EpisodeInfo({ data }: { data: any }) {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(0);

  const pageCount = Math.ceil(
    (data?.episodes?.data[0]?.episodes.length || 0) / itemsPerPage
  );
  const currentChapter =
    data?.episodes?.data[0]?.episodes.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage
    ) || "no episodes";

  const currentEpisodes =
    data?.episodes?.data[0]?.episodes.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage
    ) || "no episodes";

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  return (
    <>
      {currentEpisodes === "no episodes" ? (
        <div className="h-[20vh] lg:w-full flex-center flex-col gap-5 px-3 xl:px-14">
          <p className="text-center font-karla font-bold lg:text-lg">
            Oops!
            <br /> It looks like this anime is not available.
          </p>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center px-3 xl:px-14">
            <div className="text-[20px] md:text-2xl font-bold font-karla p-6">
              Episodes
            </div>
          </div>
          <div className="p-[100px]">
            <div className="flex flex-row flex-wrap gap-3">
              {currentEpisodes?.map((episode: any, index: number) => (
                <a
                  className="transition-all duration-200 ease-out lg:hover:scale-105 hover:ring-1 hover:ring-white cursor-pointer bg-secondary shrink-0 relative h-[180px] sm:h-[130px] subpixel-antialiased rounded-md overflow-hidden "
                  key={index}
                  href={`/watch?a=${data?.title?.romaji || data?.title?.romanji || data?.title?.native || ""}&id=${data?.id}&ep=${episode?.number}&title=${JSON.stringify(data?.title)}&titleEp=${episode?.title || ""}`}>
                  <div className="absolute flex items-center justify-between w-full text-sm z-40 bottom-1 left-2 font-karla font-semibold text-white ">
                    Episode {episode?.number}
                  </div>
                  <div className="w-[484px] sm:w-[398px] h-[150px] sm:h-[100px] relative">
                    <Image
                      alt={`Episode ${episode?.number}`}
                      className="object-cover z-20 brightness-75"
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        inset: "0px",
                        color: "transparent",
                      }}
                      width={500}
                      height={500}
                      src={episode?.img || data?.image || ""}
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
          {/* Pagination */}
          <div className="isolate flex items-center -space-x-px rounded-md shadow-sm">
            <ReactPaginate
              pageCount={pageCount}
              pageRangeDisplayed={5}
              marginPagesDisplayed={2}
              previousLabel="<"
              nextLabel=">"
              breakLabel="..."
              className="gap-1"
              previousClassName=" relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 rounded hover:text-white hover:bg-secondary focus:z-20 focus:outline-offset-0"
              nextClassName="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 rounded hover:text-white hover:bg-secondary focus:z-20 focus:outline-offset-0"
              pageClassName="relative rounded inline-flex items-center px-4 py-2 text-sm font-semibold text-text hover:bg-secondary focus:z-20 focus:outline-offset-0  gap-1"
              breakClassName="relative rounded inline-flex items-center px-4 py-2 text-sm font-semibold text-text hover:bg-secondary focus:z-20 focus:outline-offset-0 "
              onPageChange={handlePageChange}
              containerClassName="pagination"
              activeClassName="active"
            />
          </div>
        </>
      )}
    </>
  );
}

export default EpisodeInfo;
