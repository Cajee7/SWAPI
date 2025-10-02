import { Injectable } from '@angular/core';
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastrService: NbToastrService
  ) { }

  showSuccess(title: string, message: string, duration: number = 3000) {
    this.toastrService.show(message, title, { status: 'success', duration, position: NbGlobalPhysicalPosition.TOP_RIGHT });
  }

  showError(title: string, message: string, duration: number = 8000) {
    this.toastrService.show(message, title, { status: 'danger', duration, position: NbGlobalPhysicalPosition.TOP_RIGHT });
  }

  showWarning(title: string, message: string, duration: number = 8000) {
    this.toastrService.show(message, title, { status: 'warning', duration, position: NbGlobalPhysicalPosition.TOP_RIGHT });
  }
}