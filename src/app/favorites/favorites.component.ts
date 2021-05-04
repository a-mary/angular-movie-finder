import {Component, OnInit} from '@angular/core';
import {DatabaseService, MovieDatabaseModel} from '../services/database.service';
import {MoviesService} from '../services/movies.service';
import {AuthService} from '../services/auth.service';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  movies: MovieDatabaseModel[];

  constructor(public databaseService: DatabaseService, public auth: AuthService, public moviesService: MoviesService) {
  }

  ngOnInit(): void {

    console.log('FAV INIT')
    this.auth.isLoading$.pipe(switchMap((isLoading) => {
      if (isLoading) {
        return of(null);
      } else {
        return this.databaseService.getFavoriteMovies();
      }
    })).subscribe((result) => {
      if (result) {
        this.movies = result.length == 0 ? null : result;

      }
    })


    // this.databaseService.getFavoriteMovies().subscribe((response) => {
    //   // console.log('length equal 0' + (response.length == 0))
    //   // console.log('response Fav '+ response )
    //   if (response)
    //     this.movies = response.length == 0 ? null : response;
    // })

    // this.databaseService.getFavoriteMovies().pipe(map(mergeMap((response:MovieDatabaseModel[]) => {
    //   return response.length == 0 ? of(null) : forkJoin()
    // }));
    // this.movies = null;

  }

}
