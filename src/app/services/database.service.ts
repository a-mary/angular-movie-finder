import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import firebase from 'firebase';
import {Movie, MovieDetails} from '../shared/interfaces';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import Timestamp = firebase.firestore.Timestamp;
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;
import {ChatMessage} from '../stream/chat/services/chat.service';

export interface MovieDatabaseModel {
  movieId: number;
  posterPath: string;

  releaseDate: Timestamp;
  title: string;
  overview: string;
  userId: string;
  voteAvg: number;
}

@Injectable()
export class DatabaseService {

  uid = '';


  favoriteObservable = new BehaviorSubject<MovieDatabaseModel[]>(null)

  constructor(private afAuth: AngularFireAuth, private dbf: AngularFirestore, private auth: AuthService) {
    // this.uid = auth.isLoggedIn ? JSON.parse(localStorage.getItem('user')).uid : null;

    this.auth.user$.subscribe(value => {
      value ? this.uid = value.uid : this.uid = null;
      // if (value)
      console.log("USER **************** " + value + ' uid ' + this.uid + ' ')
      // this.getFavoriteMovies()
      //   this.uid = value.uid
    })

    // this.uid = auth.user.uid
    // this.auth.user$.subscribe(
    //   (user) => {
    //     // user ? this.uid = user.uid : this.uid = null;
    //     this.uid = user.uid
    //   }
    // )

    // this.uid = this.auth.fireAuthUser ? this.auth.fireAuthUser.uid : null;
    // this.auth.fireAuthUser.uid;
    // this.afAuth.authState.subscribe(auth => {
    //   // console.log("isAuth " + auth.uid)
    //   auth ? this.uid = auth.uid : this.uid = null;
    // });
  }

  addMovieToWatchlist(movie: MovieDetails | Movie, callback: any) {

    const movieDbModel = {
      movieId: movie.id,
      posterPath: movie.poster_path,
      releaseDate: movie.release_date,
      title: movie.title,
      overview: movie.overview.substring(0, 105),
      userId: this.auth.getCurrentUser().uid,
      voteAvg: movie.vote_average
    }

    this.dbf.doc(`watchlist/${this.auth.getCurrentUser().uid}_${movie.id}`)
      .set(movieDbModel)
      .then(success => callback())
      .catch(err => callback(err));

  }

  getMovieFromWatchlist(movieId: number): Observable<DocumentSnapshot<MovieDatabaseModel>> {
    // return this.dbf.doc<MovieDatabaseModel>(`favoriteMovies/${this.uid}_${movieId}`).valueChanges();
    // console.log("getFav userId " + this.uid + " movieId " + movieId);
    // console.log("getWL userId " + this.uid + " movieId " + movieId);
    // console.log("userId " + this.afAuth.currentUser.+" movieId "+movieId);
    // return this.dbf.doc<MovieDatabaseModel>(`favoriteMovies/${this.uid}_${movieId}`).get();
    return this.dbf.doc<MovieDatabaseModel>(`watchlist/${this.uid}_${movieId}`).get();
  }

  deleteMovieFromWatchlist(movieId: number, callback: any) {
    this.dbf.doc(`watchlist/${this.uid}_${movieId}`)
      .delete()
      .then(success => callback())
      .catch(err => callback(err));

  }

  addMovieToFavorite(movie: MovieDetails | Movie, callback: any) {

    const movieDbModel = {
      movieId: movie.id,
      posterPath: movie.poster_path,
      releaseDate: movie.release_date,
      title: movie.title,
      overview: movie.overview.substring(0, 105),
      userId: this.auth.getCurrentUser().uid,
      voteAvg: movie.vote_average
    }

    this.dbf.doc(`favoriteMovies/${this.uid}_${movie.id}`)
      .set(movieDbModel)
      .then(success => callback())
      .catch(err => callback(err));


  }

  deleteMovieFromFavorites(movieId: number, callback: any) {
    this.dbf.doc(`favoriteMovies/${this.uid}_${movieId}`)
      .delete()
      .then(success => callback())
      .catch(err => callback(err));

  }

  getWatchlistMovies(): Observable<MovieDatabaseModel[]> {
    return this.dbf.collection<MovieDatabaseModel>('watchlist', ref => ref
      .where('userId', '==', this.uid)).valueChanges();
  }

  getFavoriteMovie(movieId: number): Observable<DocumentSnapshot<MovieDatabaseModel>> {
    // return this.dbf.doc<MovieDatabaseModel>(`favoriteMovies/${this.uid}_${movieId}`).valueChanges();
    // console.log("getFav userId " + this.uid + " movieId " + movieId);
    // console.log("getFav userId " + this.uid + " movieId " + movieId);
    // console.log("userId " + this.afAuth.currentUser.+" movieId "+movieId);
    // return this.dbf.doc<MovieDatabaseModel>(`favoriteMovies/${this.uid}_${movieId}`).get();
    return this.dbf.doc<MovieDatabaseModel>(`favoriteMovies/${this.uid}_${movieId}`).get();
  }

  getFavoriteMovies(): Observable<MovieDatabaseModel[]> {
    console.log('getFavMovies UID: ' + this.uid)
    return this.dbf.collection<MovieDatabaseModel>('favoriteMovies', ref => ref
      .where('userId', '==', this.uid))
      .valueChanges();
    // this.dbf.collection<MovieDatabaseModel>('favoriteMovies', ref => ref
    //   .where('userId', '==', this.uid))
    //   .valueChanges().subscribe(value => this.favoriteObservable.next(value));
    // return this.favoriteObservable
  }


}
