const episodeContainer = document.querySelector("[data-episodes-container]");
export async function callingEpisodes() {
    try {
        const episodeData = await fetch("https://rickandmortyapi.com/api/episode");
        const episodesList = await episodeData.json();
        console.log(episodesList);
    }
    catch (error) {
        console.error(error);
    }
}
//# sourceMappingURL=episodeList.js.map