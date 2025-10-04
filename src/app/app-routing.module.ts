import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CharactersComponent } from './pages/characters/characters.component';
import { StarshipsComponent } from './pages/starships/starships.component';

const routes: Routes = [
  { path: 'Home', component: HomePageComponent },
  { path: '', redirectTo: 'Home', pathMatch: "full" },
  { path: 'characters', component: CharactersComponent },
  { path: 'starships', component: StarshipsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }