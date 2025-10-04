import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbSidebarService } from '@nebular/theme';
import { MENU_ITEMS } from './models/MenuItems';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SWAPI';
  menu = MENU_ITEMS;
  year = new Date().getFullYear();

  constructor(
    private _router: Router,
    private _sidebarService: NbSidebarService
  ) { }

  ngOnInit(): void {
    this._router.navigate(['/']);
  }

  toggle() {
    this._sidebarService.toggle();
  }

}