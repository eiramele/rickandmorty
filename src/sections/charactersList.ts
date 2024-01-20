import { Character, Episode, Location } from "interfaces/interfaces.js";
import { callingEpisodes } from "./episodeList.js";
import { charactersContainer, episodeNumber, episodeDate } from "../variables/globalVariables.js";

export async function callingOneCharacter(character: string) {
  const responseCharacter = await fetch(character);
  const dataCharacter = await responseCharacter.json();
  const oneCharacter: Character = dataCharacter;
  console.log(oneCharacter.name);
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

  const characterGender = document.createElement("p");
  characterGender.textContent = `${character.species} | ${character.status}`;

  characterItem.append(characterImg, characterName, characterGender);

  if (charactersContainer instanceof HTMLDivElement) {
    charactersContainer.append(characterItem);
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
      //console.log(episode.characters);
      episode.characters.forEach((character) => {
        callingOneCharacter(character);
      });
    }
  });
}
