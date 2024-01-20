import { showingEpisodesList, loadingMoreEpisodes, } from "./sections/episodeList.js";
import { episode1URL } from "./variables/globalVariables.js";
showingEpisodesList(episode1URL);
const moreEpisodesButton = document.querySelector("[data-episodes-button]");
moreEpisodesButton.addEventListener("click", loadingMoreEpisodes);
//# sourceMappingURL=main.js.map