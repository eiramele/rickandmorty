//DOM Elements
export const moreEpisodesButton = document.querySelector(
  "[data-episodes-button]"
);
export const episodeListContainer = document.querySelector(
  "[data-episodes-container]"
) as HTMLUListElement;
export const mainContainer = document.querySelector("[data-main-container]");
export const charactersContainer = document.querySelector(
  "[data-characters-container]"
);

export const characterListContainer = document.createElement("div");
characterListContainer.className = "characters__container";

export const characterDescription = document.createElement("div");
characterDescription.className = "character-detail-item";

export const allEpisodesContainer = document.createElement("div");
allEpisodesContainer.className = "all-episodes__container";

export const headerCharacters = document.querySelector("[data-all-characters]")

