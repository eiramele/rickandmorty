var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { showingCharactersbyEpisode, showingEpisodeInfo, } from "./episodeDetail.js";
import { episode2URL, episode3URL, episodeListContainer, moreEpisodesButton, mainContainer, } from "../variables/globalVariables.js";
export function callingEpisodes(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url);
            const data = yield response.json();
            const episodes = data.results;
            return episodes;
        }
        catch (error) {
            console.log(error);
        }
    });
}
export function showingEpisodesList(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const episodes = yield callingEpisodes(url);
            if (!episodes)
                return;
            episodes.forEach((episode) => {
                const li = document.createElement("li");
                li.className = "episode-item";
                li.id = `${episode.id}`;
                li.setAttribute("data-episode", "");
                li.textContent = `Episode ${episode.id}`;
                console.log(episode.url);
                li.addEventListener("click", (event) => handleClick(event, episode.url));
                if (episodeListContainer instanceof HTMLUListElement) {
                    episodeListContainer.appendChild(li);
                }
            });
        }
        catch (error) {
            console.error(error);
        }
    });
}
export function handleClick(event, url) {
    const target = event.target;
    if (!(target instanceof HTMLElement))
        return;
    if (mainContainer instanceof HTMLDivElement) {
        mainContainer.textContent = "";
    }
    showingEpisodeInfo(url);
    showingCharactersbyEpisode(url);
}
export function loadingMoreEpisodes() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const lastElement = episodeListContainer.lastElementChild;
            if (lastElement instanceof HTMLLIElement && lastElement.id === "20") {
                showingEpisodesList(episode2URL);
            }
            else if (lastElement instanceof HTMLLIElement &&
                lastElement.id === "40") {
                showingEpisodesList(episode3URL);
                if (moreEpisodesButton instanceof HTMLButtonElement) {
                    moreEpisodesButton.disabled = true;
                }
            }
        }
        catch (error) {
            console.error(error);
        }
    });
}
//# sourceMappingURL=episodeList.js.map