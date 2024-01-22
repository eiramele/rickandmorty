import { Location } from "../interfaces/interfaces.js";
import { mainContainer } from "../variables/globalConst.js";
import { showCharacter } from "./episodeDetail.js";
import { characterListContainer } from "../variables/globalConst.js";
import { getLocation } from "../rmAPI.js";

export async function showLocation(url: string) {

  const origin = await getLocation(url);
  if (!origin) return;

  createLocationCard(origin);
  characterListContainer.textContent = "";
  if (
    mainContainer instanceof HTMLDivElement &&
    characterListContainer instanceof HTMLDivElement
  ) {
    mainContainer.append(characterListContainer);
  }
  origin.residents.forEach((resident) => showCharacter(resident));
}

export function createLocationCard(location: Location) {
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

  locationMoreDetailsContainer.append(
    locationDetailType,
    locationDetailDimension
  );

  if (mainContainer instanceof HTMLDivElement) {
    mainContainer.textContent = "";
    mainContainer.append(locationDetailName, locationMoreDetailsContainer);
  }
}
