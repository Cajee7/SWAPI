import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SwapiService } from 'src/app/services/swapi.service';
import { ToastService } from 'src/app/services/toast.service';
import { IFilm } from 'src/app/models/Film';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  private _destroy$: Subject<void> = new Subject<void>();
  public loading: boolean = true;
  public allFilmsData: IFilm[] = [];
  public characterMap: Map<string, string> = new Map();
  public starshipMap: Map<string, string> = new Map();
  public planetMap: Map<string, string> = new Map();

  public currentPage: number = 1;
  public totalPages: number = 1;
  public totalItems: number;

  constructor(
    private _swapiService: SwapiService,
    private _toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.getAllFilms();
    this.getAllItems();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private getAllFilms(): void {
    this._swapiService.getAllFilms(this.currentPage)
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (res) => {
          this.totalItems = res.count;
          this.totalPages = Math.ceil(this.totalItems / 10);
          this.allFilmsData = res.results.sort((a, b) => a.episode_id - b.episode_id);
        },
        complete: () => {
          this.loading = false;
        },
        error: () => {
          this._toastService.showError("Error Occured", "Could not load film data, please try again");
          this.loading = false;
        }
      });
  }

  private getAllItems(): void {
    forkJoin({
      characters: this._swapiService.getAllCharacters(),
      starships: this._swapiService.getAllStartships(),
      planets: this._swapiService.getAllPlanets()
    }).pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (res) => {
          res.characters.results.forEach(x => {
            this.characterMap.set(x.url, x.name);
          });

          res.starships.results.forEach(x => {
            this.starshipMap.set(x.url, x.name)
          })

          res.planets.results.forEach(x => {
            this.planetMap.set(x.url, x.name)
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
      case 'character': {
        return data.map(url => this.characterMap.get(url)).filter(name => name !== undefined);
      }
      case 'starship': {
        return data.map(url => this.starshipMap.get(url)).filter(name => name !== undefined);
      }
      case 'planet': {
        return data.map(url => this.planetMap.get(url)).filter(name => name !== undefined);
      }
    }
  }

  public nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getAllFilms();
    }
  }

  public previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getAllFilms();
    }
  }
}