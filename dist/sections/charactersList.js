var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { callingEpisodes } from "./episodeList.js";
import { charactersContainer, episodeNumber, episodeDate, } from "../variables/globalVariables.js";
import { showingExtendedCharacterInfo } from "./characterDetail.js";
export function callingOneCharacter(character) {
    return __awaiter(this, void 0, void 0, function* () {
        const responseCharacter = yield fetch(character);
        const dataCharacter = yield responseCharacter.json();
        const oneCharacter = dataCharacter;
        showingCharacterInfo(oneCharacter);
    });
}
export function showingCharacterInfo(character) {
    const characterItem = document.createElement("div");
    characterItem.className = "character-item";
    const characterImg = document.createElement("img");
    characterImg.className = "character-image";
    characterImg.src = character.image;
    const characterName = document.createElement("h4");
    characterName.textContent = character.name;
    characterName.addEventListener("click", (event) => handleCharacterClick(event, character));
    const characterGender = document.createElement("p");
    characterGender.textContent = `${character.species} | ${character.status}`;
    characterItem.append(characterImg, characterName, characterGender);
    if (charactersContainer instanceof HTMLDivElement) {
        charactersContainer.append(characterItem);
    }
}
export function showingEpisodeInfo(id, url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const episodes = yield callingEpisodes(url);
            if (!episodes)
                return;
            episodes.forEach((episode) => {
                if (episode.id === id &&
                    episodeNumber instanceof HTMLHeadingElement &&
                    episodeDate instanceof HTMLParagraphElement) {
                    episodeNumber.textContent = `Episode ${episode.id}`;
                    episodeDate.textContent = `${episode.air_date} | ${episode.episode}`;
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
export function showingCharactersbyEpisode(id, url) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(url);
        const data = yield response.json();
        const episodes = data.results;
        if (charactersContainer instanceof HTMLDivElement) {
            charactersContainer.textContent = "";
        }
        episodes.forEach((episode) => {
            if (episode.id === id) {
                episode.characters.forEach((character) => {
                    callingOneCharacter(character);
                });
            }
        });
    });
}
export function handleCharacterClick(event, character) {
    const target = event.target;
    if (!(target instanceof HTMLElement))
        return;
    showingExtendedCharacterInfo(character);
}
//# sourceMappingURL=charactersList.js.map