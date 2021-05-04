import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {
  Cast,
  Genres,
  MovieCredits,
  MovieDetails,
  MoviePage,
  PersonDetail,
  PersonMovieCredits, TVShowPage
} from '../shared/interfaces';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  apiKey = 'fed69657ba4cc6e1078d2a6a95f51c8c';
  baseUrl = 'https://api.themoviedb.org/3/';
  private genres: Observable<Genres>;

  constructor(private http: HttpClient) {
  }

  getMovieList(type: string, page: string): Observable<MoviePage> {
    return this.http.get<MoviePage>(this.baseUrl.concat('movie/', (type === 'top' ? 'top_rated' : type)), {
      params: new HttpParams().set('api_key', this.apiKey).set('page', page)
    });
    // .pipe(catchError(error => {console.log(error.message); return throwError(error.message || error);
    // )));
  }

  getTvList(type: string, page: string): Observable<TVShowPage> {
    return this.http.get<TVShowPage>(this.baseUrl.concat('tv/', (type === 'top' ? 'top_rated' : type)), {
      params: new HttpParams().set('api_key', this.apiKey).set('page', page)
    });

  }

  getMovieDetails(id: string): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(this.baseUrl.concat('movie/', id), {
      params: new HttpParams().set('api_key', this.apiKey).set('append_to_response', 'videos')
    }).pipe(distinctUntilChanged());
  }

  getGenres(): Observable<Genres> {
    if (this.genres === undefined) {
      this.genres = this.http.get<Genres>(this.baseUrl.concat('genre/movie/list'), {
        params: new HttpParams().set('api_key', this.apiKey)
      });
    }
    return this.genres;
  }

  discoverMoviesByGenres(id: string, page: string): Observable<MoviePage> {
    return this.http.get<MoviePage>(this.baseUrl.concat('discover/movie'), {
      params: new HttpParams()
        .set('api_key', this.apiKey)
        .set('sort_by', 'popularity.desc')
        .set('with_genres', id)
        .set('page', page)
    }).pipe(map(res => {
        return res;
      }
    ));
  }

  discoverMoviesByCast(id: string, page: string): Observable<MoviePage> {
    return this.http.get<MoviePage>(this.baseUrl.concat('discover/movie'), {
      params: new HttpParams()
        .set('api_key', this.apiKey)
        .set('sort_by', 'popularity.desc')
        .set('with_cast', id)
        .set('page', page)
    }).pipe(map(res => {
        return res;
      }
    ));
  }

  getRecommendedMovies(id: string, page: string) {
    return this.http.get<MoviePage>(this.baseUrl.concat('movie/', id, '/recommendations'), {
      params: new HttpParams().set('api_key', this.apiKey).set('page', page)
    }).pipe(map(res => {
        return res;
      }
    ));
  }

  searchMovies(searchStr: string, page: string): Observable<MoviePage> {
    return this.http.get<MoviePage>(this.baseUrl.concat('search/movie'), {
      params: new HttpParams()
        .set('api_key', this.apiKey)
        .set('sort_by', 'popularity.desc')
        .set('query', searchStr)
        .set('page', page)
    }).pipe(map(res => {
      return res;
    }));
  }

  getMovieCast(id: string): Observable<Cast[]> {
    return this.http.get<MovieCredits>(this.baseUrl.concat('movie/', id, '/credits'), {
      params: new HttpParams().set('api_key', this.apiKey)
    }).pipe(map(res => {
        return res.cast as Cast[];
      }
    ));
  }

  getPersonDetail(id: string):
    Observable<PersonDetail> {
    return this.http.get<PersonDetail>(this.baseUrl.concat('person/', id), {
      params: new HttpParams().set('api_key', this.apiKey)
    });
  }

  getMovieCredits(id: string, page: string):
    Observable<PersonMovieCredits> {
    return this.http.get<PersonMovieCredits>(this.baseUrl.concat('person/', id, '/movie_credits'), {
      params: new HttpParams().set('api_key', this.apiKey).set('page', page)
    });
  }


  fillStarArr(voteAvg: number, stars: string[]) {
    let remainder: number;
    let starCount: number;
    starCount = voteAvg / 2;

    for (let i = 0; i < 5; i++) {
      remainder = starCount - i;

      if (remainder >= 0.9) {
        stars.push('star');
      } else if (remainder > 0.15) {
        stars.push('star_half');
      } else {
        stars.push('star_border');
      }
    }
  }

}
