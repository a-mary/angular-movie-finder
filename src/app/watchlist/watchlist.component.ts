import { Component, OnInit } from '@angular/core';
import {DatabaseService, MovieDatabaseModel} from '../services/database.service';
import {AuthService} from '../services/auth.service';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {

  movies: MovieDatabaseModel[];

  constructor(private databaseService: DatabaseService, public auth: AuthService) { }

  ngOnInit(): void {


    this.auth.isLoading$.pipe(switchMap((isLoading) => {
      if (isLoading) {
        return of(null);
      } else {
        return this.databaseService.getWatchlistMovies();
      }
    })).subscribe((result) => {
      if (result) {
        this.movies = result.length == 0 ? null : result;

      }
    })

  }

}
