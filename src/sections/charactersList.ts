import {
  Character,
  ExtendedCharacter,
  Episode,
} from "interfaces/interfaces.js";
import { callingEpisodes } from "./episodeList.js";
import {
  charactersContainer,
  episodeNumber,
  episodeDate,
} from "../variables/globalVariables.js";

export async function callingOneCharacter(character: string) {
  const responseCharacter = await fetch(character);
  const dataCharacter = await responseCharacter.json();
  const oneCharacter: ExtendedCharacter = dataCharacter;
  //console.log(oneCharacter.name);
  showingCharacterInfo(oneCharacter);
}

export function showingCharacterInfo(character: Character) {
  const characterItem = document.createElement("div");
  characterItem.className = "character-item";

  const characterImg = document.createElement("img");
  characterImg.className = "character-image";
  characterImg.src = character.image;

  const characterName = document.createElement("h4");
  characterName.textContent = character.name;
  characterName.addEventListener("click", (event) =>
    handleCharacterClick(event, character)
  );

  const characterGender = document.createElement("p");
  characterGender.textContent = `${character.species} | ${character.status}`;

  characterItem.append(characterImg, characterName, characterGender);

  if (charactersContainer instanceof HTMLDivElement) {
    charactersContainer.append(characterItem);
  }
}

export function showingExtendedCharacterInfo(character: Character) {
  const extendedCharacter = character as ExtendedCharacter;

  if (charactersContainer instanceof HTMLDivElement) {
    charactersContainer.textContent = "";
  }
  const characterDescription = document.createElement("div");
  characterDescription.className = "character-detail-item";

  const characterDetailImg = document.createElement("img");
  characterDetailImg.className = "character-detail-image";
  characterDetailImg.src = extendedCharacter.image;

  const characterDescriptionDetails = document.createElement("div");
  characterDescriptionDetails.className = "character-description__container";

  const characterDetailName = document.createElement("h2");
  characterDetailName.className = "character-detail-name";
  characterDetailName.textContent = extendedCharacter.name;

  const characterMoreDetailsContainer = document.createElement("div");
  characterMoreDetailsContainer.className = "character-more-details__container, preserve-spaces";
  

  const characterDetailSpecies = document.createElement("span");
  characterDetailSpecies.textContent = ` ${extendedCharacter.species} | `;

  const characterDetailStatus = document.createElement("span");
  characterDetailStatus.textContent = ` ${extendedCharacter.status} | `;

  const characterDetailGender = document.createElement("span");
  characterDetailGender.textContent = ` ${extendedCharacter.gender} | `;

  const characterDetailOrigin = document.createElement("span");
  characterDetailOrigin.textContent = ` ${extendedCharacter.origin.name}`;
  
  const characterEpisodes = extendedCharacter.episode;
  console.log(characterEpisodes);

  characterMoreDetailsContainer.append(
    characterDetailSpecies,
    characterDetailStatus,
    characterDetailGender,
    characterDetailOrigin
  );
  characterDescriptionDetails.append(
    characterDetailName,
    characterMoreDetailsContainer
  );

  characterDescription.append(characterDetailImg, characterDescriptionDetails);

  if (charactersContainer instanceof HTMLDivElement) {
    charactersContainer.append(characterDescription);
  }
}

export async function showingEpisodeInfo(id: number, url: string) {
  try {
    const episodes = await callingEpisodes(url);
    if (!episodes) return;

    episodes.forEach((episode) => {
      if (
        episode.id === id &&
        episodeNumber instanceof HTMLHeadingElement &&
        episodeDate instanceof HTMLParagraphElement
      ) {
        episodeNumber.textContent = `Episode ${episode.id}`;
        episodeDate.textContent = `${episode.air_date} | ${episode.episode}`;
      }
    });
  } catch (error) {
    console.log(error);
  }
}

export async function showingCharactersbyEpisode(id: number, url: string) {
  const response = await fetch(url);
  const data = await response.json();
  const episodes: Episode[] = data.results;

  if (charactersContainer instanceof HTMLDivElement) {
    charactersContainer.textContent = "";
  }
  episodes.forEach((episode) => {
    if (episode.id === id) {
     
      episode.characters.forEach((character) => {
        callingOneCharacter(character);
      });
    }
  });
}

export function handleCharacterClick(event: MouseEvent, character: Character) {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  showingExtendedCharacterInfo(character);
}
