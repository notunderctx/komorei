/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { Combobox } from "@headlessui/react";
import axios from "axios";
import { isEmpty } from "lodash";

function Search() {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [query, setQuery] = useState("");
  const [media, setMedia] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  var gquery = `
    query ($page: Int, $perPage: Int, $search: String) { Page (page: $page, perPage: $perPage) { pageInfo { total currentPage lastPage hasNextPage perPage } media (search: $search,type:ANIME) { id title { romaji english native userPreferred} coverImage {
  extraLarge
  large
  medium
  color
} startDate {
  year
  month
  day
}} } }
  `;

  useEffect(() => {
    async function fetchSearch() {
      try {
        const { data } = await axios.post("https://graphql.anilist.co", {
          query: gquery,
          variables: {
            // Include variables inside the hook
            search: query,
            page: 1,
            perPage: 2,
          },
        });
        const fetchedMedia = data?.data?.Page?.media || [];
        setMedia(fetchedMedia);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    if (query !== "") {
      fetchSearch();
    } else {
      setMedia([]);
    }
  }, [query]); // Include query in the dependency array

  return (
    <Combobox value={selectedMedia} onChange={setSelectedMedia}>
      <div className="flex items-center text-base font-medium rounded bg-secondary">
        <Combobox.Input
          onChange={(event) => setQuery(event.target.value)}
          className={`p-5 text-white w-full bg-transparent border-0 outline-none`}
          placeholder="Search for media"
          type="text"
          aria-controls="headlessui-combobox-options-:r30:"
        />
      </div>

      <Combobox.Options
        className={`bg-secondary rounded mt-2 max-h-[50dvh] overflow-y-auto flex flex-col scrollbar-thin scrollbar-thumb-background scrollbar-thumb-rounded text-white`}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {!isEmpty(media) &&
              media?.map((item) => (
                <Combobox.Option
                  key={item?.id}
                  value={item?.title?.romaji}
                  className={`flex items-center gap-3 p-5 `}>
                  <div className="shrink-0">
                    <img
                      alt={item?.title?.romaji}
                      src={
                        item.coverImage.extraLarge ||
                        item.coverImage.large ||
                        item.coverImage.medium
                      }
                      className="w-16 h-16 object-cover rounded"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="flex flex-col w-full h-full">
                    <div className="font-karla font-semibold">
                      <a href={`/streaming/${item?.id}`}>
                        {" "}
                        {item.title.romaji ||
                          item.title.userPreferred ||
                          item.title.english ||
                          item.title.native}
                      </a>
                    </div>
                    <div className="text-sm text-white/50" {...item.sartDate}>
                      {`${item?.sartDate?.day || ""}/${item?.sartDate?.month || ""}/${item?.startDate?.year || ""}` ||
                        `${item?.sartDate?.year || ""}`}
                    </div>
                  </div>
                </Combobox.Option>
              ))}
            {isEmpty(media) && (
              <div className="flex text-center items-center">not found</div>
            )}
          </>
        )}
      </Combobox.Options>
    </Combobox>
  );
}

export default Search;
