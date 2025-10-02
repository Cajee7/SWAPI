import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFilmResponse } from '../models/FilmResponse';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {
  private _baseUrl = 'https://swapi.dev/api'

  constructor(private _http: HttpClient) { }

  public getAllFilms(): Observable<IFilmResponse> {
    return this._http.get<IFilmResponse>(`${this._baseUrl}/films`);
  }
}
