import { isEmpty } from "lodash";
import Image from "next/image";
import { useEffect, useState } from "react";

function EpisodeSection({
  data,
  active,
  ep,
  id,
  animeName,
  animeTtitles,
}: {
  data: any;
  active?: any;
  ep: any;
  id: any;
  animeName: any;
  animeTtitles: any;
}) {
  const [nextEp, SetNextEp] = useState(false);
  useEffect(() => {
    if (parseFloat(ep) + 1 > data?.[0]?.data?.length) {
      SetNextEp(false);
    } else if (parseFloat(ep) + 1 < data?.[0]?.data?.length) {
      SetNextEp(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {isEmpty(data) ? (
        <div className=" flex flex-col w-screen lg:max-w-lg pt-5 lg:pt-0 h-screen items-center justify-center text-center">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-white "
            role="status">
            <span
              className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              Loading...
            </span>
          </div>
        </div>
      ) : (
        <div className="text-white flex flex-col w-screen lg:max-w-lg pt-5 lg:pt-0">
          <div className="flex gap-4 px-3 lg:pl-5 pb-5">
            <div className="text-xl font-karla font-semibold">Next Episode</div>
          </div>
          <div
            className="flex flex-col gap-5 lg:pl-5 py-2 px-2"
            style={{
              opacity: 1,
            }}>
            {nextEp && (
              <div className="border-b border-white/10 pb-5">
                <a
                  className="bg-secondary flex w-full h-[110px] rounded-lg scale-100 transition-all duration-300 ease-out cursor-pointer hover:scale-[1.02] ring-0 hover:ring-1 hover:shadow-lg ring-white"
                  href={`/watch?a=${animeName}&id=${id}&ep=${parseFloat(ep) + 1}&title=${animeTtitles}&titleEp=EP ${parseFloat(ep) + 1}`}>
                  <div className="w-[43%] lg:w-[42%] h-[110px] relative rounded-lg z-40 shrink-0 overflow-hidden shadow-[4px_0px_5px_0px_rgba(0,0,0,0.3)] transition-all duration-300 ease-out">
                    <Image
                      height={200}
                      width={200}
                      alt="Episode Cover"
                      src={data?.[0]?.data?.[parseFloat(ep) + 1 - 1]?.img}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-2 left-2 font-karla font-semibold text-sm bg-black/70 p-1 rounded">
                      {`ep ${parseFloat(ep) + 1}`}
                    </span>
                  </div>
                  <div className="w-full h-full overflow-x-hidden select-none px-4 py-2 flex flex-col justify-evenly">
                    <h1 className="font-karla font-bold italic line-clamp-1">
                      {data?.[0]?.data?.[parseFloat(ep) + 1 - 1]?.title ||
                        "N/A"}
                    </h1>
                    <p className="line-clamp-2 text-xs italic font-outfit font-extralight">
                      {data?.[0]?.data?.[parseFloat(ep) + 1 - 1]?.description}
                    </p>
                  </div>
                </a>
              </div>
            )}
            {data?.[0]?.data?.map((episode: any, index: number) => (
              <div
                key={index}
                style={{
                  opacity: 1,
                  transform: "none",
                }}>
                <a
                  className={`bg-secondary flex w-full h-[110px] rounded-lg scale-100 transition-all duration-300 ease-out cursor-pointer hover:scale-[1.02] ring-0 hover:ring-1 hover:shadow-lg ring-white ${episode?.number === parseFloat(ep) ? "opacity-40" : ""}`}
                  href={`/watch?a=${animeName}&id=${id}&ep=${episode?.number}&title=${animeTtitles}&titleEp=EP ${episode?.number}`}>
                  <div className="w-[43%] lg:w-[42%] h-[110px] relative rounded-lg z-40 shrink-0 overflow-hidden shadow-[4px_0px_5px_0px_rgba(0,0,0,0.3)]">
                    <Image
                      alt="anime episode cover"
                      src={episode?.img || ""}
                      height={200}
                      width={200}
                      className="w-full h-full object-cover"
                    />
                    <span
                      className="absolute bottom-2 left-2 font-karla font-semibold text-sm
                    bg-black/70 p-1 rounded">
                      {`ep ${episode?.number}`}
                    </span>
                  </div>
                  <div className="w-full h-full overflow-x-hidden select-none px-4 py-2 flex flex-col justify-evenly">
                    <h1 className="font-karla font-bold italic line-clamp-1">
                      {episode?.title || "N/A"}
                    </h1>
                    <p className="line-clamp-2 text-xs italic font-outfit font-extralight">
                      {episode?.description}
                    </p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default EpisodeSection;
