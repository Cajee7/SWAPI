import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { NbThemeModule, NbLayoutModule, NbToastrModule, NbCardModule, NbSpinnerModule, NbIconModule, NbMenuModule, NbSidebarModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { StarshipsComponent } from './pages/starships/starships.component';
import { CharactersComponent } from './pages/characters/characters.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CharactersComponent,
    StarshipsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatCardModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbToastrModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbLayoutModule,
    NbMenuModule,
    NbSidebarModule,
    NbEvaIconsModule,
    NbCardModule,
    NbSpinnerModule,
    NbIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }