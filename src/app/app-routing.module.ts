import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

import {MoviesComponent} from './movies/movies.component';
import {MovieComponent} from './movie/movie.component';
import {ActorComponent} from './actor/actor.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {FavoritesComponent} from './favorites/favorites.component';
import {AuthGuard} from './auth/auth.guard';
import {StreamListComponent} from './stream/stream-list/stream-list.component';
import {StreamPageComponent} from './stream/stream-page/stream-page.component';
import {WatchlistComponent} from './watchlist/watchlist.component';
import {HomeComponent} from './home/home.component';


const routes: Routes = [
  // {path: 'films', component: MoviesComponent, data: {path: 'films'}},
  {path: 'movie/:id', component: MovieComponent},
  {path: 'actor/:id', component: ActorComponent},
  {path: 'genres/:name', component: MoviesComponent},
  {path: 'top', component: MoviesComponent},
  {path: 'upcoming', component: MoviesComponent},
  {path: 'popular', component: MoviesComponent},
  {path: 'search/:title', component: MoviesComponent},
  {path: 'tv/popular', component: MoviesComponent},
  {path: 'tv/top', component: MoviesComponent},
  {path: 'streams', component: StreamListComponent},
  {path: 'stream', component: StreamPageComponent},
  {path: 'home', component: HomeComponent},
  {path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard]},
  {path: 'watchlist', component: WatchlistComponent, canActivate: [AuthGuard]},
  // {path: ':category/:name', component: MoviesComponent},
  // {path: ':category', component: MoviesComponent },
  // {path: ':category/:title', component: MoviesComponent},
  // {path: '', redirectTo: 'popular', pathMatch: 'full'},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'error', component: PageNotFoundComponent},
  {path: '**', redirectTo: 'error'},
  // {path: 'popular/series', component: PopularSeriesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled', preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
