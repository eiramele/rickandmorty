interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
}

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
}

const episode1UrL = "https://rickandmortyapi.com/api/episode";
const episode2UrL = "https://rickandmortyapi.com/api/episode?page=2";
const episode3UrL = "https://rickandmortyapi.com/api/episode?page=3";

async function callingEpisodes(url: string) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const episodes: Episode[] = data.results;
    return episodes;
  } catch (error) {
    console.log(error);
  }
}

async function showingEpisodesList(url: string) {
  try {
    const episodes = await callingEpisodes(url);
    if (!episodes) return;
    const episodeListContainer = document.querySelector(
      "[data-episodes-container]"
    ); //as HTMLUListElement;
    episodes.forEach((episode) => {
      console.log(episode.id);
      const li = document.createElement("li");
      li.className = "episode-item";
      li.id = `${episode.id}`;
      li.setAttribute("data-episode", "");
      li.textContent = `Episode ${episode.id}`;
      li.addEventListener("click", (event) => handleClick(event, url));
      if (episodeListContainer instanceof HTMLUListElement) {
        episodeListContainer.appendChild(li);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

async function callingCharacters() {
  const response = await fetch("https://rickandmortyapi.com/api/character");
  const data = await response.json();
  const characters: Character[] = data.results;
  //console.log(characters);
  return characters;
}

async function callingOneCharacter(character: string) {
  const responseCharacter = await fetch(character);
  const dataCharacter = await responseCharacter.json();
  const oneCharacter: Character = dataCharacter;
  console.log(oneCharacter.name);
  showingCharacterInfo(oneCharacter);
}

function showingCharacterInfo(character: Character) {
  const charactersContainer = document.querySelector(
    "[data-characters-container]"
  );

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

async function showingCharactersbyEpisode(id: number, url: string) {
  //ho faig de moment amb només els primers 20 episodis, queda pendent ampliar-ho
  const response = await fetch(url);
  const data = await response.json();
  const episodes: Episode[] = data.results;
  const charactersContainer = document.querySelector(
    "[data-characters-container]"
  );
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

async function showingEpisodeInfo(id: number, url: string) {
  try {
    const episodes = await callingEpisodes(url);
    if (!episodes) return;
    const episodeNumber = document.querySelector("[data-episode-number]");
    const episodeDate = document.querySelector("[data-episode-date-code]");
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

function handleClick(event: MouseEvent, url: string) {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  const id = parseInt(target.id, 10);
  if (isNaN(id)) {
    console.error("Invalid ID");
    return;
  }

  showingEpisodeInfo(id, url);
  showingCharactersbyEpisode(id, url);
}

showingEpisodesList(episode1UrL);

async function loadingMoreEpisodes() {
  try {
    const episodeListContainer = document.querySelector(
      "[data-episodes-container]"
    ) as HTMLUListElement;

    const lastElement = episodeListContainer.lastElementChild;
    const moreEpisodesButton = document.querySelector("[data-episodes-button]");
    if (lastElement instanceof HTMLLIElement && lastElement.id === "20") {
      showingEpisodesList(episode2UrL);
    } else if (
      lastElement instanceof HTMLLIElement &&
      lastElement.id === "40"
    ) {
      showingEpisodesList(episode3UrL);
      if (moreEpisodesButton instanceof HTMLButtonElement) {
        moreEpisodesButton.disabled = true;
      }
    }
  } catch (error) {
    console.error(error);
  }
}

const moreEpisodesButton = document.querySelector(
  "[data-episodes-button]"
) as HTMLButtonElement;

moreEpisodesButton.addEventListener("click", loadingMoreEpisodes);
