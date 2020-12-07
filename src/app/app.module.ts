import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {MoviesComponent} from './movies/movies.component';
import {MoviesService} from './service/movies.service';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {MovieComponent} from './movie/movie.component';
import {MovieCardComponent} from './movie-card/movie-card.component';
import {ActorComponent} from './actor/actor.component';
import {SafePipe} from './pipes/SafePipe';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MovieComponent,
    MovieCardComponent,
    ActorComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    SafePipe
  ],
  providers: [MoviesService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
