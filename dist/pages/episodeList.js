var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { showingCharactersbyEpisode, showingEpisodeInfo, } from "../components/characterDetail.js";
const episode1UrL = "https://rickandmortyapi.com/api/episode";
const episode2UrL = "https://rickandmortyapi.com/api/episode?page=2";
const episode3UrL = "https://rickandmortyapi.com/api/episode?page=3";
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
            const episodeListContainer = document.querySelector("[data-episodes-container]");
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
        }
        catch (error) {
            console.log(error);
        }
    });
}
export function handleClick(event, url) {
    const target = event.target;
    if (!(target instanceof HTMLElement))
        return;
    const id = parseInt(target.id, 10);
    if (isNaN(id)) {
        console.error("Invalid ID");
        return;
    }
    showingEpisodeInfo(id, url);
    showingCharactersbyEpisode(id, url);
}
export function loadingMoreEpisodes() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const episodeListContainer = document.querySelector("[data-episodes-container]");
            const lastElement = episodeListContainer.lastElementChild;
            const moreEpisodesButton = document.querySelector("[data-episodes-button]");
            if (lastElement instanceof HTMLLIElement && lastElement.id === "20") {
                showingEpisodesList(episode2UrL);
            }
            else if (lastElement instanceof HTMLLIElement &&
                lastElement.id === "40") {
                showingEpisodesList(episode3UrL);
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