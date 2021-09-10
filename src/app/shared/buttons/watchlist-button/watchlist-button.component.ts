import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Movie, MovieDetails} from '../../interfaces';
import {User} from '../../../auth/auth.service';
import {DatabaseService} from '../../../services/database.service';

@Component({
  selector: 'app-watchlist-button',
  templateUrl: './watchlist-button.component.html',
  styleUrls: ['./watchlist-button.component.scss']
})
export class WatchlistButtonComponent implements OnInit {

  @Input() movie: MovieDetails | Movie;
  @Input() type: 'cardWatchlist' | 'pageWatchlist'
  @Input() icon: string;
  @Input() user: User;
  @Output() onLoad = new EventEmitter<boolean>();

  bookmarkIcon = 'bookmark_border';

  constructor(private databaseService: DatabaseService) { }

  ngOnInit(): void {
    if (this.user) {
      this.databaseService.getMovieFromWatchlist(this.movie.id).subscribe((favoriteMovie) => {
          this.toggleBookmarkIcon(favoriteMovie.exists)
          this.onLoad.emit(false);
        }, error => {
          console.error(error)
        }
      );
    }
  }

  toggleBookmarkIcon(bool: boolean) {
    this.bookmarkIcon = bool ? 'bookmark' : 'bookmark_border';

  }

  toggleBookmark() {
    if (this.bookmarkIcon == 'bookmark') {
      this.databaseService.deleteMovieFromWatchlist(this.movie.id, (error) => {
        if (error) {
          // this.snackBar.open(error, 'Hide', { duration: 5000 });
        } else {
          console.log('movie removed from watchlist!')
          this.bookmarkIcon = 'bookmark_border';
        }

        // this.translateService.get('Error.Movie-added').subscribe(results => this.snackBar.open(results, '', { duration: 2000 }));
      })
    } else if (this.bookmarkIcon == 'bookmark_border') {
      this.databaseService.addMovieToWatchlist(this.movie, (error) => {
          if (error) {
            console.log('favError ' + error)
            // this.snackBar.open(error, 'Hide', { duration: 5000 });
          } else {
            console.log('movie added to watchlist!')
            this.bookmarkIcon = 'bookmark';
          }
          // this.translateService.get('Error.Movie-added').subscribe(results => this.snackBar.open(results, '', { duration: 2000 }));
        }
      )
    }
  }

}
