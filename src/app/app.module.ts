import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {MaterialModule} from './material/material.module';
import {AppComponent} from './app.component';
import {MoviesComponent} from './movies/movies.component';
import {MovieComponent} from './movie/movie.component';
import {MovieCardComponent} from './movie-card/movie-card.component';
import {ActorComponent} from './actor/actor.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {MinToHrAndMinPipe} from './pipes/min-to-hr-and-min.pipe';
import {SafePipe} from './pipes/SafePipe';
import {SharedModule} from './shared/shared.module';
import {AuthService} from './auth/auth.service';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {DatabaseService} from './services/database.service';
import {FavoritesComponent} from './favorites/favorites.component';
import {AuthGuard} from './auth/auth.guard';
import {WatchlistComponent} from './watchlist/watchlist.component';
import {StreamModule} from './stream/stream.module';
import {CoreModule} from './core/core.module';
import {AuthModule} from './auth/auth.module';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MovieComponent,
    MovieCardComponent,
    ActorComponent,
    SafePipe,
    MinToHrAndMinPipe,
    PageNotFoundComponent,
    FavoritesComponent,
    WatchlistComponent,
    HomeComponent

  ],
  imports: [
    // AuthModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    CoreModule
  ],
  providers: [
    AuthService,
    DatabaseService,
    AuthGuard
  ],
  exports: [
    SafePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
