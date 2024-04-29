import { useState } from "react";
import ReactPaginate from "react-paginate";

function MangaChapters({ data }: { data: any }) {
  const chaptersData = data?.chapters?.data;
  const datav =
    chaptersData?.[0]?.chapters ||
    chaptersData?.[1]?.chapters ||
    chaptersData?.[2]?.chapters ||
    chaptersData?.[3]?.chapters;
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(0);

  const pageCount = Math.ceil((datav?.length || 0) / itemsPerPage);
  const currentChapter =
    datav?.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage
    ) || "no episodes";

  const currentEpisodes =
    datav?.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage
    ) || "no chapters";

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };
  //p

  return (
    <>
      {currentEpisodes === "no chapters" ? (
        <div className="h-[20vh] lg:w-full flex-center flex-col gap-5 px-3 xl:px-14">
          <p className="text-center font-karla font-bold lg:text-lg">
            Oops!
            <br /> It looks like this manga is not available.
          </p>
        </div>
      ) : (
        <>
          <div
            className="flex flex-col px-3 xl:px-14 "
            style={{
              width: "100%",
            }}>
            {currentEpisodes?.map((chapter: any, index: number) => (
              <a
                key={index}
                className="flex gap-3 py-4 hover:bg-secondary odd:bg-secondary/30 even:bg-background "
                href={
                  `/read-online/${data?.slug}-chapter-${chapter?.number}?chapterID=${chapter?.id}&id=${data?.id}&provider=${chaptersData[0]?.providerId}&number=${chapter?.number}` ||
                  ""
                }
                {...chapter}>
                <div className="flex w-full">
                  <span className="shrink-0 px-4 text-center text-white/50">
                    {chapter?.number}
                  </span>
                  <p className="w-full line-clamp-1 text-white">
                    {chapter?.title}
                  </p>
                  <div className="flex-center capitalize text-sm text-white/50 px-4 shrink-0">
                    {chaptersData[0]?.providerId || ""}
                  </div>
                </div>
              </a>
            ))}
            {/* Pagination */}
            <div className="isolate flex items-center -space-x-px rounded-md shadow-sm mt-7">
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
          </div>
        </>
      )}
    </>
  );
}

export default MangaChapters;
