import { Character, Episode, Status } from "../interfaces/interfaces.js";

import {
  mainContainer,
  characterListContainer,
} from "../variables/domElements.js";

import { showExtendedCharacterInfo } from "./characterDetail.js";
import { getCharacter, getEpisode } from "../rmAPI.js";

//Function to get episode info and show it
export async function showEpisodeInfo(url: string) {
  const episode = await getEpisode(url);
  if (!episode) return;

  createEpisodeCard(episode);
}

//Function to create HTML elements to print episode ID, air date and code
export function createEpisodeCard(episode: Episode) {
  const episodeNumber = document.createElement("h2");
  episodeNumber.textContent = `Episode ${episode.id}: ${episode.name}`;

  const episodeDate = document.createElement("p");
  episodeDate.textContent = `${episode.air_date} | ${episode.episode}`;

  if (mainContainer instanceof HTMLDivElement) {
    mainContainer.append(episodeNumber, episodeDate);
  }
}

//Function to get all characters that appear in a single episode and print its details
export async function showCharactersbyEpisode(url: string) {
  const episode = await getEpisode(url);
  if (!episode) return;

  characterListContainer.textContent = "";

  episode.characters.forEach((character) => {
    showCharacter(character);
  });
}

// Function to get one single characther info and print it
export async function showCharacter(url: string) {
  const character = await getCharacter(url);
  if (!character) return;
  createCharacterCard(character);
}

//Function to create a card for each character including information such as name, image and gender
export function createCharacterCard(character: Character) {
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
  characterGender.className = "character-gender";
  characterGender.textContent = `${character.species} | ${
    Status[character.status]
  }`;

  characterItem.append(characterImg, characterName, characterGender);

  if (characterListContainer instanceof HTMLDivElement) {
    characterListContainer.append(characterItem);
  }

  if (
    mainContainer instanceof HTMLDivElement &&
    characterListContainer instanceof HTMLDivElement
  ) {
    mainContainer.append(characterListContainer);
  }
}

//Function to handle click on character name to show character info
export function handleCharacterClick(event: MouseEvent, character: Character) {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  if (mainContainer instanceof HTMLDivElement) {
    mainContainer.textContent = "";
  }
  showExtendedCharacterInfo(character);
}
