var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Status } from "../interfaces/interfaces.js";
import { mainContainer, characterListContainer, } from "../variables/domElements.js";
import { showExtendedCharacterInfo } from "./characterDetail.js";
import { getCharacter, getEpisode } from "../rmAPI.js";
export function showEpisodeInfo(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const episode = yield getEpisode(url);
        if (!episode)
            return;
        createEpisodeCard(episode);
    });
}
export function createEpisodeCard(episode) {
    const episodeNumber = document.createElement("h2");
    episodeNumber.textContent = `Episode ${episode.id}: ${episode.name}`;
    const episodeDate = document.createElement("p");
    episodeDate.textContent = `${episode.air_date} | ${episode.episode}`;
    if (mainContainer instanceof HTMLDivElement) {
        mainContainer.append(episodeNumber, episodeDate);
    }
}
export function showCharactersbyEpisode(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const episode = yield getEpisode(url);
        if (!episode)
            return;
        characterListContainer.textContent = "";
        episode.characters.forEach((character) => {
            showCharacter(character);
        });
    });
}
export function showCharacter(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const character = yield getCharacter(url);
        if (!character)
            return;
        createCharacterCard(character);
    });
}
export function createCharacterCard(character) {
    const characterItem = document.createElement("div");
    characterItem.className = "character-item";
    const characterImg = document.createElement("img");
    characterImg.className = "character-image";
    characterImg.src = character.image;
    const characterName = document.createElement("h4");
    characterName.className = "character-name";
    characterName.textContent = character.name;
    characterName.addEventListener("click", (event) => handleCharacterClick(event, character));
    const characterGender = document.createElement("p");
    characterGender.className = "character-gender";
    characterGender.textContent = `${character.species} | ${Status[character.status]}`;
    characterItem.append(characterImg, characterName, characterGender);
    if (characterListContainer instanceof HTMLDivElement) {
        characterListContainer.append(characterItem);
    }
    if (mainContainer instanceof HTMLDivElement &&
        characterListContainer instanceof HTMLDivElement) {
        mainContainer.append(characterListContainer);
    }
}
export function handleCharacterClick(event, character) {
    const target = event.target;
    if (!(target instanceof HTMLElement))
        return;
    if (mainContainer instanceof HTMLDivElement) {
        mainContainer.textContent = "";
    }
    showExtendedCharacterInfo(character);
}
//# sourceMappingURL=episodeDetail.js.map