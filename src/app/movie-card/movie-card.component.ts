import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {MoviesService} from '../services/movies.service';
import {Movie, TvShow} from '../shared/interfaces';
import {DatabaseService, MovieDatabaseModel} from '../services/database.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {AuthService, User} from '../services/auth.service';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  animations: [
    trigger('movieCardContent', [
      state('mouseenter', style({top: 'movieCardContent.'})),
      state('mouseleave', style({top: '*'})),
      transition('mouseenter <=> mouseleave', animate('0.5s')),
    ]),
  ],
})
export class MovieCardComponent implements OnInit {

  @Input()
  movie: Movie;
  @Input()
  tvShow: TvShow;
  @Input()
  favMovie: MovieDatabaseModel;
  stars: string[] = Array();
  poster: string;
  colorStop1 = '0%';
  colorStop2 = '40%'
  // fAUser = this.auth.fireAuthUser;
  isAuth = false;
  load = false;
  movieId: number;
  favoriteIcon = 'favorite_border';
  isLoading: boolean;
  isFavoriteLoading: boolean = true;
  isWatchlistLoading: boolean = true;
  // releaseDate: Date;
  // overview: string;
  // title: string;
  user: User;


  @ViewChild('movieCardContent') movieCardContent: ElementRef;
  @ViewChild('authCardContent') authCardContent: ElementRef;
  contentHeight: number;
  authContentHeight: number;
  movieCardstate: string = 'mouseleave';
  // top: string = '290px';

  top: string = '250px';

  constructor(private moviesService: MoviesService, public auth: AuthService, private databaseService: DatabaseService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.isFavoriteLoading = true;
    this.isWatchlistLoading = true;

    if (this.tvShow) {
      this.moviesService.fillStarArr(this.tvShow.vote_average, this.stars);
      this.poster = this.tvShow.poster_path ? this.tvShow.poster_path : 'nmDqvEL5tqbjhbUEFSCQlZnXock.jpg';
    } else if (this.movie) {
      // this.title = this.movie.title;
      this.moviesService.fillStarArr(this.movie.vote_average, this.stars);
      // this.movieId = this.movie.id;
      // this.overview = this.movie.overview;
      // this.releaseDate = this.movie.release_date;
      this.poster = this.movie.poster_path ? this.movie.poster_path : 'nmDqvEL5tqbjhbUEFSCQlZnXock.jpg';
    } else if (this.favMovie) {
      this.moviesService.fillStarArr(this.favMovie.voteAvg, this.stars);
      this.poster = this.favMovie.posterPath ? this.favMovie.posterPath : 'nmDqvEL5tqbjhbUEFSCQlZnXock.jpg';
      // if ()
      this.movie = {
        id: this.favMovie.movieId,
        title: this.favMovie.title,
        release_date: new Date(this.favMovie.releaseDate.valueOf()),
        overview: this.favMovie.overview,
        poster_path: this.poster,
        vote_average: this.favMovie.voteAvg
      }
    }


    this.auth.user$.subscribe((user) => {

      // if (user !== null) {
      //
      // this.user = user;
      // }
      this.user = user;
      // this.isUserLoading = false;
      console.log('Movie User is ' + (user === null ? null : this.user.displayName));
    });
  }

  setLoading(val: boolean) {
    this.isLoading = val;
  }

  onMouseEnter(): void {

    // if (!this.isLoading) {
    //   this.top = 290 - (this.movieCardContent.nativeElement.offsetHeight - 92) + 'px';
      this.top = 250 - (this.movieCardContent.nativeElement.offsetHeight - 92) + 'px';
    // }
  }

  // ngAfterViewInit(): void {
  //   this.contentHeight = this.movieCardContent.nativeElement.offsetHeight - 92;
  //   // if (this.isAuth) {
  //   //
  //   //   this.authContentHeight = this.authCardContent.nativeElement.offsetHeight - 92;
  //   // }
  // }
}
