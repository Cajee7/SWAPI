import { IFilm } from "./Film";

export interface IFilmResponse {
    count: number;
    next: string;
    previous: string;
    results: IFilm[];
}