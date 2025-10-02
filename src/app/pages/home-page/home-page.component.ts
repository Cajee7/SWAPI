import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SwapiService } from 'src/app/services/swapi.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
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

  constructor(
    private _swapiService: SwapiService,
    private _snackBarService: SnackbarService,
    private _toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.getAllFilms();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private getAllFilms(): void {
    this._swapiService.getAllFilms()
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (res) => {
          this.allFilmsData = res.results.sort((a, b) => a.episode_id - b.episode_id);
        },
        complete: () => {
          this._toastService.showSuccess("Successfully loaded Film Data", "");
          this.loading = false;
        },
        error: () => {
          this._toastService.showError("Error Occured", "Could not load film data, please try again");
          this.loading = false;
        }
      });
  }
}