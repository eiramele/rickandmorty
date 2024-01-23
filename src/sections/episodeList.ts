import {
  showCharactersbyEpisode,
  showEpisodeInfo,
} from "./episodeDetail.js";

import { episode2URL, episode3URL } from "../variables/globalConst.js";

import {
  episodeListContainer,
  moreEpisodesButton,
  mainContainer,
} from "../variables/domElements.js";

import { getEpisodes } from "../rmAPI.js";
import { Episode } from "../interfaces/interfaces.js";


//Function to calls all episodes and print a list with all episodes
export async function showEpisodesList(url: string) {
   const episodes = await getEpisodes(url);
    if (!episodes) return;
  
    createEpisodeListElement(episodes)

}


// Function to create an element list for each episode
function createEpisodeListElement(episodes: Episode[]  ){
  episodes.forEach((episode) => {
    const li = document.createElement("li");
    li.className = "episode-item";
    li.id = `${episode.id}`;
    li.setAttribute("data-episode", "");
    li.textContent = `Episode ${episode.id}`;
    
    li.addEventListener("click", (event) => handleEpisodeClick(event, episode.url)); //url
    if (episodeListContainer instanceof HTMLUListElement) {
      episodeListContainer.appendChild(li);
    }
  });

}

// Function to handle click on any episode from the list
export function handleEpisodeClick(event: MouseEvent, url: string) {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  if (mainContainer instanceof HTMLDivElement) {
    mainContainer.textContent = "";
  }

  showEpisodeInfo(url);
  showCharactersbyEpisode(url);
}

//Function to load more episodes when button is clicked
export async function loadMoreEpisodes() {
  try {
    const lastElement = episodeListContainer.lastElementChild;

    if (lastElement instanceof HTMLLIElement && lastElement.id === "20") {
      showEpisodesList(episode2URL);
    } else if (
      lastElement instanceof HTMLLIElement &&
      lastElement.id === "40"
    ) {
      showEpisodesList(episode3URL);
      if (moreEpisodesButton instanceof HTMLButtonElement) {
        moreEpisodesButton.className = "button-disabled";
        moreEpisodesButton.disabled = true;
      }
    }
  } catch (error) {
    console.error(error);
  }
}

if (moreEpisodesButton instanceof HTMLButtonElement) {
moreEpisodesButton.addEventListener("click", loadMoreEpisodes)};