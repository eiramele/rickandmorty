import {
  Character,
  ExtendedCharacter,
  Episode,
} from "interfaces/interfaces.js";
import { callingOneEpisode } from "./characterDetail.js";
import {
  mainContainer,
  characterListContainer,
} from "../variables/globalVariables.js";

import { showingExtendedCharacterInfo } from "./characterDetail.js";

export async function callingOneCharacter(character: string) {
  const responseCharacter = await fetch(character);
  const dataCharacter = await responseCharacter.json();
  const oneCharacter: Character = dataCharacter;
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
  characterName.className = "character-name";
  characterName.textContent = character.name;
  characterName.addEventListener("click", (event) =>
    handleCharacterClick(event, character)
  );

  const characterGender = document.createElement("p");
  characterGender.textContent = `${character.species} | ${character.status}`;

  characterItem.append(characterImg, characterName, characterGender);

  if (characterListContainer instanceof HTMLDivElement) {
    characterListContainer.append(characterItem);
  }
}

export async function showingEpisodeInfo(url: string) {
  //id: number,
  try {
    const response = await fetch(url);
    const data = await response.json();
    const episode: Episode = data;
    // if (!episodes) return;
    // console.log('eira');
    const episodeNumber = document.createElement("h2");
    episodeNumber.textContent = `Episode ${episode.id}`;

    const episodeDate = document.createElement("p");
    episodeDate.textContent = `${episode.air_date} | ${episode.episode}`;
    
    if (mainContainer instanceof HTMLDivElement){
    mainContainer.append(episodeNumber, episodeDate)};

    // episodes.forEach((episode) => {
    //   if (episode.id === id && mainContainer instanceof HTMLDivElement) {
    //     mainContainer.textContent = "";
    //

    //     const episodeDate = document.createElement("p");
    //     episodeDate.textContent = `${episode.air_date} | ${episode.episode}`;

    //     mainContainer.append(episodeNumber, episodeDate);
    //   }
    // });
  } catch (error) {
    console.log(error);
  }
}

export async function showingCharactersbyEpisode(url: string) {
  //id: number
  const response = await fetch(url);
  const data = await response.json();
  const episode: Episode = data;
  characterListContainer.textContent = "";
  if (
    mainContainer instanceof HTMLDivElement &&
    characterListContainer instanceof HTMLDivElement
  ) {
    mainContainer.append(characterListContainer);
  }
  console.log(episode.characters);
  episode.characters.forEach((character) => {
    callingOneCharacter(character);
  });

  // episodes.forEach((episode) => {
  //   if (episode.id === id) {
  //     episode.characters.forEach
  //     });
  //   }
  // });
}

export function handleCharacterClick(event: MouseEvent, character: Character) {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  if (mainContainer instanceof HTMLDivElement) {
    mainContainer.textContent = "";
  }
  showingExtendedCharacterInfo(character);
}

// <h2 data-episode-number></h2>
// <p data-episode-date-code></p>
// <div class="characters__container" data-characters-container>

// </div>
