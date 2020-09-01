import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MoviesComponent} from './movies/movies.component';
import {MovieComponent} from './movie/movie.component';
import {ActorComponent} from './actor/actor.component';


const routes: Routes = [
  // {path: 'films', component: MoviesComponent, data: {path: 'films'}},
  {path: 'movie/:id', component: MovieComponent},
  {path: 'actor/:id', component: ActorComponent},
  {path: '', redirectTo: 'popular', pathMatch: 'full' },
  {path: 'genres/:id/:name', component: MoviesComponent, data: {path: 'genres'}},
  {path: 'top', component: MoviesComponent, data: {path: 'top'}},
  {path: 'upcoming', component: MoviesComponent, data: {path: 'upcoming'}},
  {path: 'popular', component: MoviesComponent, data: {path: 'popular'}},
  {path: 'search/:title', component: MoviesComponent, data: {path: 'search'}},
  // {path: 'popular/series', component: PopularSeriesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
