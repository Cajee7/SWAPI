import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFilm } from '../models/Film';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {
  private _baseUrl = 'https://swapi.dev/api'

  constructor(private _http: HttpClient) { }

  public getAllFilms(): Observable<IFilm[]> {
    return this._http.get<IFilm[]>(`${this._baseUrl}/films`);
  }
}
