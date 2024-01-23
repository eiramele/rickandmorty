var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Gender, Status, } from "../interfaces/interfaces.js";
import { getEpisode } from "../rmAPI.js";
import { mainContainer } from "../variables/domElements.js";
import { handleEpisodeClick } from "./episodeList.js";
import { showLocation } from "./locationDetail.js";
import { characterDescription, characterListContainer, allEpisodesContainer, } from "../variables/domElements.js";
export function showExtendedCharacterInfo(character) {
    const extendedCharacter = character;
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
    characterDetailSpecies.textContent = ` Species: ${extendedCharacter.species} | `;
    const characterDetailStatus = document.createElement("span");
    characterDetailStatus.textContent = ` Status: ${Status[extendedCharacter.status]} | `;
    const characterDetailGender = document.createElement("span");
    characterDetailGender.textContent = ` Gender: ${Gender[extendedCharacter.gender]} `;
    characterMoreDetailsContainer.append(characterDetailSpecies, characterDetailStatus, characterDetailGender);
    if (extendedCharacter.origin) {
        const characterDetailOrigin = document.createElement("span");
        characterDetailOrigin.textContent = `| Origin: ${extendedCharacter.origin.name}`;
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
    characterDescriptionDetails.append(characterDetailName, characterMoreDetailsContainer);
    characterDescription.textContent = "";
    characterDescription.append(characterDetailImg, characterDescriptionDetails);
    if (mainContainer instanceof HTMLDivElement &&
        characterDescription instanceof HTMLDivElement &&
        allEpisodesContainer instanceof HTMLDivElement) {
        mainContainer.append(characterDescription);
    }
}
export function showEpisodesbyCharacter(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const episode = yield getEpisode(url);
        if (!episode)
            return;
        showEpisodeInfo(episode);
    });
}
export function showEpisodeInfo(episode) {
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
export function handleLocationClick(event, url) {
    const target = event.target;
    if (!(target instanceof HTMLElement))
        return;
    showLocation(url);
}
//# sourceMappingURL=characterDetail.js.map