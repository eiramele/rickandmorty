
export enum Status {
  Alive = "Alive",
  Dead = "Dead",
  unknown = "unknown",
}

export enum Gender {
  Male = "Male",
  Female = "Female",
  unknown = "unknown",
}

export interface Character {
  id: number;
  name: string;
  status: Status;
  species: string;
  image: string;
}

export interface ExtendedCharacter extends Character {
  origin: Location;
  location: Location;
  episode: string[];
  gender: Gender;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
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
