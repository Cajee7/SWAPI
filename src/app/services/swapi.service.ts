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
    const cache = localStorage.getItem(item);

    if (cache) {
      const parsed = JSON.parse(cache);

      if (Date.now() - parsed.timestamp < this.cacheTime) {
        console.log('Cache for:', item)
        return parsed.data;
      }
    }
    localStorage.removeItem(item);
  }

  private saveToStorage(item: string, data: any) {
    const cacheData = { data, timestamp: Date.now() };

    localStorage.setItem(item, JSON.stringify(cacheData));
    console.log('Cached:', item)
  }

  private getCache(key: string, url: string) {
    const cachedData = this.getFromStorage(key);

    //if cached get from cache
    if (cachedData) {
      return of(cachedData);
    }

    //if not cached, make api call
    return this._http.get(url).pipe(tap((data) => this.saveToStorage(key, data)));
  }

  public getAllFilms(): Observable<IFilmResponse<IFilm>> {
    return this.getCache('Films', `${this._baseUrl}/films`);
  }

  public getAllCharacters(): Observable<IFilmResponse<ICharacter>> {
    return this.getCache('Characters', `${this._baseUrl}/people`);
  }

  public getAllStartships(): Observable<IFilmResponse<IStarships>> {
    return this.getCache('Starships', `${this._baseUrl}/starships`);
  }
}
