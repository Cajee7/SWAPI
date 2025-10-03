import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
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

  constructor(
    private _swapiService: SwapiService,
    private _toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.getAllCharacters();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private getAllCharacters(): void {
    this._swapiService.getAllCharacters()
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (res) => {
          this.characterData = res.results;
        },
        complete: () => {
          this._toastService.showSuccess("Successfully loaded Character Data", "");
          this.loading = false;
        },
        error: () => {
          this._toastService.showError("Error Occured", "Could not load Character data, please try again");
          this.loading = false;
        }
      })
  }
}
