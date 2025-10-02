import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFilmResponse } from '../models/FilmResponse';
import { IFilm } from '../models/Film';
import { ICharacter } from '../models/Character';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {
  private _baseUrl = 'https://swapi.dev/api'

  constructor(private _http: HttpClient) { }

  public getAllFilms(): Observable<IFilmResponse<IFilm>> {
    return this._http.get<IFilmResponse<IFilm>>(`${this._baseUrl}/films`);
  }

  public getAllCharacters(): Observable<IFilmResponse<ICharacter>> {
    return this._http.get<IFilmResponse<ICharacter>>(`${this._baseUrl}/people`)
  }
}
