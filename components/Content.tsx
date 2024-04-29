import { title } from "process";

function Content({ data }: { data: any }) {
  return (
    <div className="flex flex-col md:flex-row w-full items-center md:items-end gap-5 pt-12 px-3 xl:px-14">
      <div className="flex flex-col gap-1 text-center md:text-start w-full">
        <h3 className="font-karla text-lg capitalize leading-none">
          since {data?.releaseDate || data?.year}
        </h3>
        <h1
          className="font-outfit font-extrabold text-2xl md:text-4xl line-clamp-2 text-white"
          style={{
            background: `${data?.color != null ? `linear-gradient(to right, ${data?.color}, #ffffff)` : ""}`,
            WebkitTextFillColor: `${data?.color != null ? "transparent" : ""}`,
            WebkitBackgroundClip: "text",
          }}>
          {data?.title?.english ||
            data?.title?.romaji ||
            data?.title?.native ||
            "N/A"}
        </h1>
        <h2 className="font-karla line-clamp-1 text-sm md:text-lg md:pb-2 font-light text-white/70">
          {data?.title?.romaji ||
            data?.title?.native ||
            data?.title?.english ||
            ""}
        </h2>
        <div className="flex-wrap w-full justify-start md:pt-1 gap-4 hidden md:flex">
          <div
            className="dynamic-text rounded-md px-2 font-karla font-bold"
            style={{
              backgroundColor: "yellow",
              color: "black",
            }}>
            {data?.status || "unknown"}
          </div>
        </div>
        <div className="md:block hidden relative md:py-2 z-40 cust-scroll">
          <p
            className="md:line-clamp-2 line-clamp-3 md:text-start text-center text-sm md:text-base font-light antialiased font-karla leading-6"
            dangerouslySetInnerHTML={{
              __html: data?.description,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Content;
