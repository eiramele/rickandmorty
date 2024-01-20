//API URL
export const episode1URL = "https://rickandmortyapi.com/api/episode";
export const episode2URL = "https://rickandmortyapi.com/api/episode?page=2";
export const episode3URL = "https://rickandmortyapi.com/api/episode?page=3";

//DOM Elements
export const moreEpisodesButton = document.querySelector("[data-episodes-button]");
export const episodeListContainer = document.querySelector(
  "[data-episodes-container]"
) as HTMLUListElement;
export const charactersContainer = document.querySelector(
  "[data-characters-container]"
);
export const episodeNumber = document.querySelector("[data-episode-number]");
export const episodeDate = document.querySelector("[data-episode-date-code]");
