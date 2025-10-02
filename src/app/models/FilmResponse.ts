
export interface IFilmResponse<T> {
    count: number;
    next: string;
    previous: string;
    results: T[];
}