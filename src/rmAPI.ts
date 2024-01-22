//Functions calling API

import { Character, Episode, Location } from "./interfaces/interfaces";

export async function getEpisodes(url: string) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const episodes: Episode[] = data.results;
    return episodes;
  } catch (error) {
    console.error(error);
    return null
  }
}

export async function getEpisode(url: string) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const episode: Episode = data;
    return episode;
  } catch (error) {
    console.error(error);
    return null
  }
}

export async function getCharacter(url: string) {
  try {
    const responseCharacter = await fetch(url);
    const dataCharacter = await responseCharacter.json();
    const character: Character = dataCharacter;
    //console.log(oneCharacter.name);
    //showingCharacterInfo(oneCharacter);
    return character
  } catch (error) {
    console.error(error);
    return null
  }
}

export async function getLocation(url: string) {
  try {
    const responseLocation = await fetch(url);
    const dataLocation = await responseLocation.json();
    const origin: Location = dataLocation;
    return origin
  } catch (error) {
    console.error(error);
    return null
  }
}
