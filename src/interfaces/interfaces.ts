export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  
}

export interface ExtendedCharacter extends Character{
  origin: Location;
  location: Location;
  episode: string[];
  gender: string;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
}

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: Date;
}
