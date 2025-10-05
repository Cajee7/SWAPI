import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ICharacter } from 'src/app/models/Character';
import { SwapiService } from 'src/app/services/swapi.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit, OnDestroy {
  private _destroy$: Subject<void> = new Subject<void>();
  public loading: boolean = true;
  public characterData: ICharacter[] = [];
  public filmMap: Map<string, string> = new Map();
  public planetMap: Map<string, string> = new Map();
  public starShipMap: Map<string, string> = new Map();

  public currentPage: number = 1;
  public totalPages: number = 1;
  public totalItems: number;

  constructor(
    private _swapiService: SwapiService,
    private _toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.getAllCharacters();
    this.getAllItems();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private getAllCharacters(): void {
    this._swapiService.getAllCharacters(this.currentPage)
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (res) => {
          this.characterData = res.results;
          this.totalItems = res.count;
          this.totalPages = Math.ceil(this.totalItems / 10);
        },
        complete: () => {
          this.loading = false;
        },
        error: () => {
          this._toastService.showError("Error Occured", "Could not load Character data, please try again");
          this.loading = false;
        }
      })
  }

  private getAllItems(): void {
    forkJoin({
      films: this._swapiService.getAllFilms(),
      planets: this._swapiService.getAllPlanets(),
      starships: this._swapiService.getAllStartships()
    }).pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (res) => {
          res.films.results.forEach(x => {
            this.filmMap.set(x.url, x.title);
          });

          res.planets.results.forEach(x => {
            this.planetMap.set(x.url, x.name);
          })

          res.starships.results.forEach(x => {
            this.starShipMap.set(x.url, x.name)
          })
        },
        complete: () => {
          this.loading = false;
        },
        error: () => {
          this._toastService.showError("Error Occured", "Could not load film data, please try again");
          this.loading = false;
        }
      })
  }

  getName(data: string[], name: string): string[] {
    switch (name) {
      case 'film': {
        return data.map(url => this.filmMap.get(url));
      }
      case 'planet': {
        return data.map(url => this.planetMap.get(url));
      }
      case 'starship': {
        return data.map(url => this.starShipMap.get(url)).filter(x => x !== undefined);
      }
    }
  }

  public nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getAllCharacters();
    }
  }

  public previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getAllCharacters();
    }
  }
}
