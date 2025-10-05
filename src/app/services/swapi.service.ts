import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IFilmResponse } from '../models/FilmResponse';
import { IFilm } from '../models/Film';
import { ICharacter } from '../models/Character';
import { IStarships } from '../models/Starships';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {
  private _baseUrl = 'https://swapi.dev/api';
  private cacheTime = 5 * 60 * 1000;

  constructor(private _http: HttpClient) { }

  private getFromStorage(item: string) {
    //get cahce item from local storage
    const cache = localStorage.getItem(item);

    if (cache) {
      //parse it into js object
      const parsed = JSON.parse(cache);

      //check if cache is still valid
      if (Date.now() - parsed.timestamp < this.cacheTime) {
        return parsed.data;
      }
    }

    //remove if no cache or cache expired
    localStorage.removeItem(item);
  }

  private saveToStorage(item: string, data: any) {
    //create object
    const cacheData = { data, timestamp: Date.now() };

    //save that object to local storage with key
    localStorage.setItem(item, JSON.stringify(cacheData));
  }

  private getCache(key: string, url: string) {
    //get data based on key
    const cachedData = this.getFromStorage(key);

    //null check 
    if (cachedData) {
      return of(cachedData); //create observable to emit value becase we need it to behave like observale
    }

    //if not cached, make api call
    return this._http.get(url).pipe(tap((data) => this.saveToStorage(key, data)));
  }

  public getAllFilms(page: number = 1): Observable<IFilmResponse<IFilm>> {
    return this.getCache(`Films_Page_${page}`, `${this._baseUrl}/films/?page=${page}`);
  }

  public getAllCharacters(page: number = 1): Observable<IFilmResponse<ICharacter>> {
    return this.getCache(`Characters_Page_${page}`, `${this._baseUrl}/people/?page=${page}`);
  }

  public getAllStartships(page: number = 1): Observable<IFilmResponse<IStarships>> {
    return this.getCache(`Starships_Page_${page}`, `${this._baseUrl}/starships/?page=${page}`);
  }

  public getAllPlanets(page: number = 1): Observable<IFilmResponse<{ url: string, name: string }>> {
    return this.getCache(`Plants_Page_${page}`, `${this._baseUrl}/planets/?page=${page}`)
  }
}
