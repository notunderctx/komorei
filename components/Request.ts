const request = {
  Trending: "/api/anime/trending",
  Popular: "/api/anime/popular",
  RandomAnime: "meta/anilist/random-anime",
  AnimeAiring: "meta/anilist/airing-schedule",
  TrendingManga: "/api/manga/trending",
  RecentEpisodes: `meta/anilist/recent-episodes?page=1&perPage=20&provider=gogoanime`,
  PopularManga: "/api/manga/popular",
};

export default request;
