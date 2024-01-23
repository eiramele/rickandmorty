var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function getEpisodes(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url);
            const data = yield response.json();
            const episodes = data.results;
            return episodes;
        }
        catch (error) {
            console.error('Error loading content', error);
            return null;
        }
    });
}
export function getEpisode(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url);
            const data = yield response.json();
            const episode = data;
            return episode;
        }
        catch (error) {
            console.error('Error loading content', error);
            return null;
        }
    });
}
export function getCharacter(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const responseCharacter = yield fetch(url);
            const dataCharacter = yield responseCharacter.json();
            const character = dataCharacter;
            return character;
        }
        catch (error) {
            console.error('Error loading content', error);
            return null;
        }
    });
}
export function getLocation(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const responseLocation = yield fetch(url);
            const dataLocation = yield responseLocation.json();
            const origin = dataLocation;
            return origin;
        }
        catch (error) {
            console.error('Error loading content', error);
            return null;
        }
    });
}
export function getLocations(page) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://rickandmortyapi.com/api/location?page=${page}`);
            const data = yield response.json();
            const locations = data.results;
            return locations;
        }
        catch (error) {
            console.error('Error loading content', error);
            return null;
        }
    });
}
//# sourceMappingURL=rmAPI.js.map