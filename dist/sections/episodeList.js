var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { showCharactersbyEpisode, showEpisodeInfo, } from "./episodeDetail.js";
import { episode2URL, episode3URL } from "../variables/globalConst.js";
import { episodeListContainer, moreEpisodesButton, mainContainer, } from "../variables/domElements.js";
import { getEpisodes } from "../rmAPI.js";
export function showEpisodesList(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const episodes = yield getEpisodes(url);
        if (!episodes)
            return;
        createEpisodeListElement(episodes);
    });
}
function createEpisodeListElement(episodes) {
    episodes.forEach((episode) => {
        const li = document.createElement("li");
        li.className = "episode-item";
        li.id = `${episode.id}`;
        li.setAttribute("data-episode", "");
        li.textContent = `Episode ${episode.id}`;
        console.log(episode.url);
        li.addEventListener("click", (event) => handleEpisodeClick(event, episode.url));
        if (episodeListContainer instanceof HTMLUListElement) {
            episodeListContainer.appendChild(li);
        }
    });
}
export function handleEpisodeClick(event, url) {
    const target = event.target;
    if (!(target instanceof HTMLElement))
        return;
    if (mainContainer instanceof HTMLDivElement) {
        mainContainer.textContent = "";
    }
    showEpisodeInfo(url);
    showCharactersbyEpisode(url);
}
export function loadMoreEpisodes() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const lastElement = episodeListContainer.lastElementChild;
            if (lastElement instanceof HTMLLIElement && lastElement.id === "20") {
                showEpisodesList(episode2URL);
            }
            else if (lastElement instanceof HTMLLIElement &&
                lastElement.id === "40") {
                showEpisodesList(episode3URL);
                if (moreEpisodesButton instanceof HTMLButtonElement) {
                    moreEpisodesButton.className = "button-disabled";
                    moreEpisodesButton.disabled = true;
                }
            }
        }
        catch (error) {
            console.error(error);
        }
    });
}
if (moreEpisodesButton instanceof HTMLButtonElement) {
    moreEpisodesButton.addEventListener("click", loadMoreEpisodes);
}
;
//# sourceMappingURL=episodeList.js.map