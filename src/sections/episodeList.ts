import { Episode } from "../interfaces/interfaces.js";
import {
  showingCharactersbyEpisode,
  showingEpisodeInfo,
} from "./episodeDetail.js";

import {
  episode2URL,
  episode3URL,
  episodeListContainer,
  moreEpisodesButton,
  mainContainer,
} from "../variables/globalVariables.js";

export async function callingEpisodes(url: string) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const episodes: Episode[] = data.results;
    return episodes;
  } catch (error) {
    console.log(error);
  }
}

export async function showingEpisodesList(url: string) {
  try {
    const episodes = await callingEpisodes(url);
    if (!episodes) return;

    episodes.forEach((episode) => {
      const li = document.createElement("li");
      li.className = "episode-item";
      li.id = `${episode.id}`;
      li.setAttribute("data-episode", "");
      li.textContent = `Episode ${episode.id}`;
      console.log(episode.url);
      li.addEventListener("click", (event) => handleClick(event, episode.url)); //url
      if (episodeListContainer instanceof HTMLUListElement) {
        episodeListContainer.appendChild(li);
      }
    });
  } catch (error) {
    console.error(error);
  }
}

export function handleClick(event: MouseEvent, url: string) {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  if (mainContainer instanceof HTMLDivElement) {
    mainContainer.textContent = "";
  }

  showingEpisodeInfo(url);
  showingCharactersbyEpisode(url);
}

export async function loadingMoreEpisodes() {
  try {
    const lastElement = episodeListContainer.lastElementChild;

    if (lastElement instanceof HTMLLIElement && lastElement.id === "20") {
      showingEpisodesList(episode2URL);
    } else if (
      lastElement instanceof HTMLLIElement &&
      lastElement.id === "40"
    ) {
      showingEpisodesList(episode3URL);
      if (moreEpisodesButton instanceof HTMLButtonElement) {
        moreEpisodesButton.disabled = true;
      }
    }
  } catch (error) {
    console.error(error);
  }
}
