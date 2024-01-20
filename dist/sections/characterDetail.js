var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { mainContainer, characterListContainer, } from "../variables/globalVariables.js";
import { handleClick } from "./episodeList.js";
import { callingOneLocation } from "./locationDetail.js";
const characterDescription = document.createElement("div");
characterDescription.className = "character-detail-item";
const allEpisodesContainer = document.createElement("div");
allEpisodesContainer.className = "all-episodes__container";
export function showingExtendedCharacterInfo(character) {
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
        "character-more-details__container, preserve-spaces";
    const characterDetailSpecies = document.createElement("span");
    characterDetailSpecies.textContent = ` ${extendedCharacter.species} | `;
    const characterDetailStatus = document.createElement("span");
    characterDetailStatus.textContent = ` ${extendedCharacter.status} | `;
    const characterDetailGender = document.createElement("span");
    characterDetailGender.textContent = ` ${extendedCharacter.gender} `;
    characterMoreDetailsContainer.append(characterDetailSpecies, characterDetailStatus, characterDetailGender);
    if (extendedCharacter.origin) {
        const characterDetailOrigin = document.createElement("span");
        characterDetailOrigin.textContent = `| ${extendedCharacter.origin.name}`;
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
    characterEpisodes.forEach((episode) => callingOneEpisode(episode));
    characterDescriptionDetails.append(characterDetailName, characterMoreDetailsContainer);
    characterDescription.textContent = "";
    characterDescription.append(characterDetailImg, characterDescriptionDetails);
    if (mainContainer instanceof HTMLDivElement &&
        characterDescription instanceof HTMLDivElement &&
        allEpisodesContainer instanceof HTMLDivElement) {
        mainContainer.append(characterDescription);
    }
}
export function callingOneEpisode(episode) {
    return __awaiter(this, void 0, void 0, function* () {
        const responseEpisode = yield fetch(episode);
        const dataEpisode = yield responseEpisode.json();
        const oneEpisode = dataEpisode;
        showingEpisodesInfo(oneEpisode);
    });
}
export function showingEpisodesInfo(episode) {
    const episodeDetailContainer = document.createElement("div");
    episodeDetailContainer.className = "episode-detail__container";
    episodeDetailContainer.id = `${episode.id}`;
    const episodeNumber = document.createElement("p");
    episodeNumber.className = "episode-name";
    episodeNumber.addEventListener("click", (event) => {
        console.log('ariadna');
        handleClick(event, episode.url);
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
    callingOneLocation(url);
}
//# sourceMappingURL=characterDetail.js.map