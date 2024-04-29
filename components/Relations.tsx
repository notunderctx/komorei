import { useState } from "react";
import Image from "next/image";

function Relations({ data }: { data: any[] | [{}] | any }) {
  const [moreRelations, SetMore] = useState(false);
  const [slice, SetSlice] = useState(5);
  function More() {
    const length = data?.relations?.length;
    if (!moreRelations) {
      SetMore(true);
      SetSlice(length);
    }
    if (moreRelations) {
      SetMore(false);
      SetSlice(5);
    }
  }
  return (
    <div className="w-screen md:w-full">
      <div className="flex justify-between items-center px-3 xl:px-14">
        <div className="text-[20px] md:text-2xl font-bold font-karla">
          Relations
        </div>
        <div className="cursor-pointer font-karla" onClick={More}>
          {moreRelations ? "show less " : "show more"}
        </div>
      </div>
      <div className="px-3 xl:px-14 md:w-full flex gap-5  snap-x scroll-px-5 scrollbar-none md:grid md:grid-cols-3 justify-items-center md:pt-7 md:pb-5 md:px-4 pt-4 rounded-xl no-scrollbar">
        {(data?.rela || data?.relations)
          ?.slice(0, slice)
          .map((relation: any, index: number) => (
            <a
              className="md:hover:scale-[1.02] snap-start hover:shadow-lg scale-100 transition-transform duration-200 ease-out w-full block"
              key={index}
              href={`/streaming/${relation?.id}${relation.type === "MANGA" ? "&t=MANGA" : ""}`}>
              <div className="w-[400px] md:w-full h-[126px] bg-secondary flex rounded-md overflow-hidden">
                <div className="w-[90px] bg-image rounded-l-md overflow-hidden">
                  <Image
                    src={
                      relation?.coverImage?.extraLarge ||
                      relation?.coverImage?.medium ||
                      relation?.coverImage?.Large ||
                      relation?.image ||
                      relation?.img ||
                      data?.image ||
                      ""
                    }
                    alt="relation cover"
                    height={126}
                    width={90}
                    style={{
                      objectFit: "cover",
                    }}
                    className="h-full w-full"
                  />
                </div>
                <div className="flex flex-col justify-center px-3">
                  <div className="text-action font-outfit font-bold capitalize mb-1">
                    {relation?.format}
                  </div>
                  <div className="font-outfit line-clamp-2 text-white">
                    {relation?.title?.english ||
                      relation?.title?.romaji ||
                      relation?.title?.userPreferred ||
                      relation?.title?.native ||
                      "N/A"}
                  </div>
                  <div className="font-thin text-white">
                    {relation?.season || relation?.relationType || ""}
                  </div>
                </div>
              </div>
            </a>
          ))}
      </div>
    </div>
  );
}

export default Relations;
