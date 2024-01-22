import {
  Character,
  Episode,
} from "interfaces/interfaces.js";
import { callingOneEpisode } from "./characterDetail.js";
import {
  mainContainer,
  characterListContainer,
} from "../variables/globalConst.js";

import { showExtendedCharacterInfo } from "./characterDetail.js";
import { getCharacter, getEpisode } from "../rmAPI.js";

//Gets all characters that appear in a single episode and prints its details
export async function showCharactersbyEpisode(url: string) {

  const episode = await getEpisode(url);
  if (!episode) return 
  
  characterListContainer.textContent = "";
  
  if (
    mainContainer instanceof HTMLDivElement &&
    characterListContainer instanceof HTMLDivElement
  ) {
    mainContainer.append(characterListContainer);
  }
  console.log(episode.characters);
  episode.characters.forEach((character) => {
    showCharacter(character);
  });
}

//Gets episode Info and shows it
export async function showEpisodeInfo(url: string) {
  const episode = await getEpisode(url);
  if (!episode) return;

  createEpisodeCard(episode);
}

//Creates html elements to print episode ID, air date and code
export function createEpisodeCard(episode: Episode) {
  const episodeNumber = document.createElement("h2");
  episodeNumber.textContent = `Episode ${episode.id}`;

  const episodeDate = document.createElement("p");
  episodeDate.textContent = `${episode.air_date} | ${episode.episode}`;

  if (mainContainer instanceof HTMLDivElement) {
    mainContainer.append(episodeNumber, episodeDate);
  }
}

// Gets characther info and prints it
export async function showCharacter(url: string) {
  const character = await getCharacter(url);
  if (!character) return;
  createCharacterCard(character);
}

//Creates a card for each character including information such as name, image and gender
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
  characterGender.textContent = `${character.species} | ${character.status}`;

  characterItem.append(characterImg, characterName, characterGender);

  if (characterListContainer instanceof HTMLDivElement) {
    characterListContainer.append(characterItem);
  }
}



export function handleCharacterClick(event: MouseEvent, character: Character) {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  if (mainContainer instanceof HTMLDivElement) {
    mainContainer.textContent = "";
  }
  showExtendedCharacterInfo(character);
}
