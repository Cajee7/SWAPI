import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private _snackbar: MatSnackBar
  ) { }

  showSuccess(message: string, action: string = '', duration: number = 3000): void {
    this._snackbar.open(message, action, {
      duration,
      panelClass: ['snackbar-success']
    });
  }

  showError(message: string, action: string = 'Ok', duration: number = 3000): void {
    this._snackbar.open(message, action, {
      duration,
      panelClass: ['snackbar-error']
    });
  }

}
