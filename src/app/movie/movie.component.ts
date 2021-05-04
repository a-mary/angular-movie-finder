import {Component, OnInit} from '@angular/core';
import {MoviesService} from '../services/movies.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {Cast, MovieDetails} from '../shared/interfaces';
import {combineLatest, Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {AuthService, User} from '../services/auth.service';
import {DatabaseService} from '../services/database.service';
import firebase from 'firebase';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  baseUrl = 'https://www.youtube.com/embed/';
  video: string;
  movieDetails: MovieDetails;
  stars: string[] = Array();
  casts: Cast[];
  isLoading: boolean;
  backdropPath: string;
  defaultImgUrl = 'https://image.tmdb.org/t/p/w300/nmDqvEL5tqbjhbUEFSCQlZnXock.jpg';
  favoriteIcon = 'favorite_border';
  bookmarkIcon = 'bookmark_border';
  fireAuthUser: firebase.User;
  errorMsg: string;
  user: User;
  isUserLoading: boolean = true;
  isFavoriteLoading: boolean = true;
  isWatchlistLoading: boolean = true;
  isBackgroundLoading: boolean = true;


  constructor(
    public authService: AuthService,
    private moviesServices: MoviesService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private databaseService: DatabaseService) {
  }

  ngOnInit(): void {
    // this.user = null;
    this.isLoading = true;
    this.isBackgroundLoading = true;
    this.isUserLoading = true;
    this.isFavoriteLoading = true;
    this.isWatchlistLoading = true;

    this.isUserLoading = true
    console.log('INIT Movie Component')
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const id = params.get('id');
        return combineLatest([this.moviesServices.getMovieDetails(id), this.moviesServices.getMovieCast(id)]);
      })).subscribe(([movie, cast]) => {
      this.movieDetails = movie;
      // this.user = user ? user : null;
      // if (user !== null) {

      // this.user = user;
      // }
      // this.isUserLoading = false;
      // console.log('user LOADED ' + (user === null ? null : this.user.displayName));
      // console.log('user isNULL ' + (user === null));
      this.backdropPath = movie.backdrop_path === null ?
        this.defaultImgUrl : 'https://image.tmdb.org/t/p/w1280/'.concat(movie.backdrop_path);
      this.video = this.movieDetails.videos.results.length === 0 ? undefined : this.baseUrl + this.movieDetails.videos.results[0].key;
      this.stars = [];
      this.moviesServices.fillStarArr(movie.vote_average, this.stars);
      this.casts = cast;
      this.isUserLoading = false
    }, error => {

    }, () => {
      // this.isUserLoading = false
    });

    this.authService.user$.subscribe((user) => {

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
    if (this.user)
      this.isLoading = val;


  }

  // setBackgroundLoading() {
  //   this.isBackgroundLoading = false;
  // }
  //
  // setBackgroundLoading() {
  //   this.isBackgroundLoading = false;
  // }


  //region Methods
  // openDialog() {
  //   const dialogRef = this.dialog.open(DialogBodyComponent, {
  //     data: {
  //       poster: this.movieDetails.poster_path
  //     }
  //   });
  //
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }

  // ngAfterViewInit(): void {
  //   this.isLoading = false;
  //   console.log(this.isLoading + ' load after init');
  // }

  // ngDoCheck(): void {
  //   this.isLoading = false;
  //   console.log(this.isLoading + ' load do check');
  // }
  //endregion



  // showMovie() {
  //   this.isLoading = false;
  //   // console.log(this.isLoading + ' show movie');
  // }

  toggleBookmark() {
    this.bookmarkIcon = this.bookmarkIcon == 'bookmark_border' ? 'bookmark' : 'bookmark_border';
  }
}
