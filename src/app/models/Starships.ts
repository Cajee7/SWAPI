import { IFilm } from "./Film";

export interface IStarships {
    name: string;
    model: string;
    starship_class: string;
    manfacturer: string;
    cost_in_credits: string;
    length: string;
    crew: string;
    passengers: string;
    max_atmosphering_speed: string;
    hyperdrive_rating: string;
    MGLT: string;
    cargo_capacity: string;
    consumables: string;
    films: Array<IFilm>
    pilots: Array<string>;
    url: string;
    created: string;
    edited: string;
}