import { Location } from "../interfaces/interfaces.js";
import { mainContainer } from "../variables/globalVariables.js";
import { callingOneCharacter } from "./episodeDetail.js";
// import { showingCharactersbyEpisode } from "./episodeDetail.js";
import { characterListContainer } from "../variables/globalVariables.js";

export async function callingOneLocation(location: string) {
  const responseLocation = await fetch(location);
  const dataLocation = await responseLocation.json();
  const origin: Location = dataLocation;
  console.log(origin);
  showingLocationInfo(origin);
  characterListContainer.textContent = "";
  if (
    mainContainer instanceof HTMLDivElement &&
    characterListContainer instanceof HTMLDivElement
  ) {
    mainContainer.append(characterListContainer);
  }
  origin.residents.forEach((resident) => callingOneCharacter(resident));
}

export function showingLocationInfo(location: Location) {
  const locationDetailName = document.createElement("h2");
  locationDetailName.className = "location-detail-name";
  locationDetailName.textContent = location.name;

  const locationMoreDetailsContainer = document.createElement("div");
  locationMoreDetailsContainer.className = "location-more-details__container", "preserve-spaces";


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
