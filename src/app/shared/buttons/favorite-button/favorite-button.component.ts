import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService, User} from '../../../services/auth.service';
import {MoviesService} from '../../../services/movies.service';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DatabaseService} from '../../../services/database.service';
import {Movie, MovieDetails} from '../../interfaces';
import {switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import firebase from 'firebase';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.scss']
})
export class FavoriteButtonComponent implements OnInit {

  @Input() movie: MovieDetails | Movie;
  @Input() type: 'card' | 'page'
  @Input() icon: string;
  // @Input() user: firebase.User;
  @Input() user: User;
  @Output() onLoad = new EventEmitter<boolean>();


  favoriteIcon = 'favorite_border';
  // request: Observable<any>;


  constructor(public auth: AuthService,
              private databaseService: DatabaseService) { }

  ngOnInit(): void {

    if (this.user) {
      this.databaseService.getFavoriteMovie(this.movie.id).subscribe((favoriteMovie) => {
          this.toggleFavoriteIcon(favoriteMovie.exists)
        this.onLoad.emit(false);
        }, error => {
          // this.errorMsg = error.error.status_message ;
          console.error(error)
        }
      );
    }
  }

  toggleFavoriteIcon(bool: boolean) {
    // this.favoriteIcon = this.favoriteIcon == 'favorite_border' ? 'favorite' : 'favorite_border';
    this.favoriteIcon = bool ? 'favorite' : 'favorite_border';

  }

  toggleFavorite() {
    if (this.favoriteIcon == 'favorite') {
      this.databaseService.deleteMovieFromFavorites(this.movie.id, (error) => {
        if (error) {
          // this.snackBar.open(error, 'Hide', { duration: 5000 });
        } else {
          console.log('movie removed from fav!')
          this.favoriteIcon = 'favorite_border';
        }

        // this.translateService.get('Error.Movie-added').subscribe(results => this.snackBar.open(results, '', { duration: 2000 }));
      })
    } else if (this.favoriteIcon == 'favorite_border') {
      this.databaseService.addMovieToFavorite(this.movie, (error) => {
          if (error) {
            console.log('favError ' + error)
            // this.snackBar.open(error, 'Hide', { duration: 5000 });
          } else {
            console.log('movie added to fav!')
            this.favoriteIcon = 'favorite';
          }
          // this.translateService.get('Error.Movie-added').subscribe(results => this.snackBar.open(results, '', { duration: 2000 }));
        }
      )
    }
  }
}
