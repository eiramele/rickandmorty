//Functions calling API

import { Character, Episode, Location } from "./interfaces/interfaces";

export async function getEpisodes(url: string) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const episodes: Episode[] = data.results;
    return episodes;
  } catch (error) {
    console.error('Error loading content', error);
    return null;
  }
}

export async function getEpisode(url: string) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const episode: Episode = data;
    return episode;
  } catch (error) {
    console.error('Error loading content', error);
    return null;
  }
}

export async function getCharacter(url: string) {
  try {
    const responseCharacter = await fetch(url);
    const dataCharacter = await responseCharacter.json();
    const character: Character = dataCharacter;

    return character;
  } catch (error) {
    console.error('Error loading content', error);
    return null;
  }
}

export async function getLocation(url: string) {
  try {
    const responseLocation = await fetch(url);
    const dataLocation = await responseLocation.json();
    const origin: Location = dataLocation;
    return origin;
  } catch (error) {
    console.error('Error loading content', error);
    return null;
  }
}



export async function getLocations(page: string) {
  try {
    const response = await fetch(`https://rickandmortyapi.com/api/location?page=${page}`);
    const data = await response.json();
    const locations: Location[] = data.results;
    return locations;
  } catch (error) {
    console.error('Error loading content', error);
    return null;
  }
}
