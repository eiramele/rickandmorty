import {
  Character,
  Episode,
  ExtendedCharacter,
  Gender,
  Status,
} from "../interfaces/interfaces.js";
import { getEpisode } from "../rmAPI.js";
import { mainContainer } from "../variables/domElements.js";
import { handleEpisodeClick } from "./episodeList.js";
import { showLocation } from "./locationDetail.js";

import {
  characterDescription,
  characterListContainer,
  allEpisodesContainer,
} from "../variables/domElements.js";



//Creates HTML elements to show extendended character information 
export function showExtendedCharacterInfo(character: Character) {
  const extendedCharacter = character as ExtendedCharacter;

  const characterDetailImg = document.createElement("img");
  characterDetailImg.className = "character-detail-image";
  characterDetailImg.src = extendedCharacter.image;

  const characterDescriptionDetails = document.createElement("div");
  characterDescriptionDetails.className = "character-description__container";

  const characterDetailName = document.createElement("h2");
  characterDetailName.className = "character-detail-name";
  characterDetailName.textContent = extendedCharacter.name;

  const characterMoreDetailsContainer = document.createElement("div");
  characterMoreDetailsContainer.className =
    "character-more-details__container preserve-spaces";

  const characterDetailSpecies = document.createElement("span");
  characterDetailSpecies.textContent = ` ${extendedCharacter.species} | `;

  const characterDetailStatus = document.createElement("span");
  characterDetailStatus.textContent = ` ${Status[extendedCharacter.status]} | `;

  const characterDetailGender = document.createElement("span");
  characterDetailGender.textContent = ` ${Gender[extendedCharacter.gender]} `;

  characterMoreDetailsContainer.append(
    characterDetailSpecies,
    characterDetailStatus,
    characterDetailGender
  );
  if (extendedCharacter.origin) {
    const characterDetailOrigin = document.createElement("span");

    characterDetailOrigin.textContent = `| ${extendedCharacter.origin.name}`;
    characterMoreDetailsContainer.appendChild(characterDetailOrigin);
    if (extendedCharacter.origin.name != "unknown") {
      characterDetailOrigin.className = "character-location";
      characterDetailOrigin.addEventListener("click", (event) => {
        characterListContainer.textContent = "";
        handleLocationClick(event, extendedCharacter.origin.url);
      });
    }
  }

  const characterEpisodes = extendedCharacter.episode;

  allEpisodesContainer.textContent = "";
  characterEpisodes.forEach((episode) => showEpisodesbyCharacter(episode));

  characterDescriptionDetails.append(
    characterDetailName,
    characterMoreDetailsContainer
  );

  characterDescription.textContent = "";
  characterDescription.append(characterDetailImg, characterDescriptionDetails);

  if (
    mainContainer instanceof HTMLDivElement &&
    characterDescription instanceof HTMLDivElement &&
    allEpisodesContainer instanceof HTMLDivElement
  ) {
    mainContainer.append(characterDescription);
  }
}

// Shows all episoded where that character appears on
export async function showEpisodesbyCharacter(url: string) {
  const episode = await getEpisode(url);
  if (!episode) return;
  showEpisodeInfo(episode);
}


//Create HTML elements to print episode number and code
export function showEpisodeInfo(episode: Episode) {
  const episodeDetailContainer = document.createElement("div");
  episodeDetailContainer.className = "episode-detail__container";
  episodeDetailContainer.id = `${episode.id}`;

  const episodeNumber = document.createElement("p");
  episodeNumber.className = "episode-name";
  episodeNumber.addEventListener("click", (event) => {
    handleEpisodeClick(event, episode.url);
  });
  episodeNumber.id = `${episode.id}`;
  episodeNumber.textContent = `Episode ${episode.id}`;

  const episodeCode = document.createElement("p");
  episodeCode.textContent = `${episode.episode}`;

  episodeDetailContainer.append(episodeNumber, episodeCode);

  allEpisodesContainer.append(episodeDetailContainer);
  if (mainContainer instanceof HTMLDivElement) {
    mainContainer.append(allEpisodesContainer);
  }
}

//Handles click to show location information
export function handleLocationClick(event: MouseEvent, url: string) {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  showLocation(url);
}
