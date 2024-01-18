import { Episode } from "../interfaces/interfaces";

// async function allShoes() {
//     try{
//     const data = await fetch("../shoes.json")
//     const shoes:Shoe[] = await data.json()
//     console.log(shoes);
//     shoes.forEach(shoe => {

//         const html = `
//         <div>
//         <img src="${shoe.imagen}">
//         <h1>${shoe.marca}</h1>
//         <span>${shoe.precio}</span></div>
//         `
//         shoesContainer.innerHTML += html
//     })
//     }
//     catch(error){console.log(error);}
// }



const episodeContainer = document.querySelector(
  "[data-episodes-container]"
) as HTMLDivElement;

export async function callingEpisodes() {
  try {
    const episodeData = await fetch("https://rickandmortyapi.com/api/episode");
    const episodesList: Episode[] = await episodeData.json();
    console.log(episodesList);
  } catch (error) {
    console.error(error);
  }
}


