import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteButtonComponent } from './buttons/favorite-button/favorite-button.component';
import {MaterialModule} from '../material/material.module';
import { WatchlistButtonComponent } from './buttons/watchlist-button/watchlist-button.component';

@NgModule({
  declarations: [FavoriteButtonComponent, WatchlistButtonComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    CommonModule,
    FavoriteButtonComponent,
    WatchlistButtonComponent,
    MaterialModule
  ]
})
export class SharedModule { }
