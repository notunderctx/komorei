import Link from "next/link";
import Image from "next/image";

function WatchInfo({ data, id }: { data: any; id: any }) {
  return (
    <div className="pt-4 text-white ">
      <div className="flex flex-col gap-4">
        <div className="h-full flex">
          <div className="aspect-[9/12.5] h-[240px]">
            <Link href={`/streaming/${id}`}>
              <Image
                src={
                  data?.coverImage?.extraLarge ||
                  data?.coverImage?.large ||
                  data?.coverImage?.medium ||
                  data?.bannerImage
                }
                alt="anime cover"
                height={1000}
                width={1000}
              />
            </Link>
          </div>
          <div className="grid w-full pl-5 gap-3 h-[240px]">
            <div className="grid grid-cols-2 gap-1 items-center">
              <h2 className="text-sm font-light font-roboto text-[#878787]">
                Studios
              </h2>
              <div className="row-start-2">
                {data?.studios.edges[0]?.node.name || "N/A"}
              </div>
            </div>
            <div className="grid gap-1 items-center">
              <h2 className="text-sm font-light font-roboto text-[#878787]">
                Status
              </h2>
              {data?.status || "..."}
            </div>
            <div className="grid gap-1 items-center overflow-y-hidden">
              <h2 className="text-sm font-light font-roboto text-[#878787]">
                Other Names
              </h2>
              <div className="grid grid-flow-dense grid-cols-2 gap-2 h-full w-full">
                {data?.synonyms
                  ?.slice(0, 5)
                  ?.map((synonym: any, index: number) => (
                    <div className="title-rm line-clamp-3" key={index}>
                      {synonym}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WatchInfo;
