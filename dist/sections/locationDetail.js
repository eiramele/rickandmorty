var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { mainContainer } from "../variables/globalConst.js";
import { showCharacter } from "./episodeDetail.js";
import { characterListContainer } from "../variables/globalConst.js";
import { getLocation } from "../rmAPI.js";
export function showLocation(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const origin = yield getLocation(url);
        if (!origin)
            return;
        createLocationCard(origin);
        characterListContainer.textContent = "";
        if (mainContainer instanceof HTMLDivElement &&
            characterListContainer instanceof HTMLDivElement) {
            mainContainer.append(characterListContainer);
        }
        origin.residents.forEach((resident) => showCharacter(resident));
    });
}
export function createLocationCard(location) {
    const locationDetailName = document.createElement("h2");
    locationDetailName.className = "location-detail-name";
    locationDetailName.textContent = location.name;
    const locationMoreDetailsContainer = document.createElement("div");
    (locationMoreDetailsContainer.className = "location-more-details__container"),
        "preserve-spaces";
    const locationDetailType = document.createElement("span");
    locationDetailType.textContent = ` ${location.type} | `;
    const locationDetailDimension = document.createElement("span");
    locationDetailDimension.textContent = ` ${location.dimension}`;
    locationMoreDetailsContainer.append(locationDetailType, locationDetailDimension);
    if (mainContainer instanceof HTMLDivElement) {
        mainContainer.textContent = "";
        mainContainer.append(locationDetailName, locationMoreDetailsContainer);
    }
}
//# sourceMappingURL=locationDetail.js.map