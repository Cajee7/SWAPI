import { IFilm } from "./Film";

export interface ICharacter {
    name: string;
    birth_year: string;
    eye_color: string;
    gender: string;
    hair_color: string;
    height: string;
    mass: string;
    skin_colour: string;
    homeworld: string;
    films: IFilm[];
    species: Array<string>;
    starships: Array<string>;
    vehicles: Array<string>;
    url: string;
    created: string;
    edited: string;
}