import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IStarships } from 'src/app/models/Starships';
import { SwapiService } from 'src/app/services/swapi.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.scss']
})
export class StarshipsComponent implements OnInit, OnDestroy {
  private _destroy$: Subject<void> = new Subject<void>();
  public loading: boolean = true;
  public starshipsData: IStarships[] = [];
  public filmTitles: Map<string, string> = new Map();

  public currentPage: number = 1;
  public totalPages: number = 1;
  public totalItems: number;

  constructor(
    private _toastService: ToastService,
    private _swapiService: SwapiService
  ) { }

  ngOnInit(): void {
    this.getAllFilms();
    this.getAllStarships();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private getAllStarships(): void {
    this._swapiService.getAllStartships(this.currentPage)
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (res) => {
          this.starshipsData = res.results;
          this.totalItems = res.count;
          this.totalPages = Math.ceil(res.count / 10);
        },
        complete: () => {
          this.loading = false;
        },
        error: () => {
          this._toastService.showError("Error Occured", "Could not load Starship data, please try again");
          this.loading = false;
        }
      })
  }

  private getAllFilms(): void {
    this._swapiService.getAllFilms()
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (res) => {
          res.results.forEach(x => {
            this.filmTitles.set(x.url, x.title);
          })
        },
        error: () => {
          this._toastService.showError("Error occured", "Failed to load film data, please try again");
        }
      })
  }

  getName(data: string[]): string[] {
    return data.map(url => this.filmTitles.get(url)).filter(name => name !== undefined) as string[];
  }

  public nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getAllStarships();
    }
  }

  public previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getAllStarships();
    }
  }
}
