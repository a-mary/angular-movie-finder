import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';

export interface Genre {
  id: number;
  name: string;
}

export interface Genres {
  genres: Genre[];
}

export interface ProdCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ProdCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  iso_639_1: string;
  name: string;
}

export interface MovieDetails {
  adult: false;
  backdrop_path: string;
  belongs_to_collection: string;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProdCompany[];
  production_countries: ProdCountry[];
  release_date: Date;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  video: boolean;
  title: string;
  vote_average: number;
  vote_count: number;
  videos: Videos;
}

export interface Videos {
  results: Video[];
}

export interface Video {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
}


export interface Movie {
  // Properties
  adult: false;
  backdrop_path: string;
  popularity: string;
  vote_count: number;
  video: boolean;
  poster_path: string;
  id: number;
  original_language: string;
  original_title: string;
  genre_ids: number[];
  title: string;
  vote_average: number;
  overview: string;
  release_date: Date;
}

export interface MoviePage {
  page: number;
  total_results: number;
  total_pages: number;
  results: Movie[];
}

export interface MoviesByGenre {
  id: number;
  page: number;
  results: Movie[];
}

export interface Reccomendations {
  page: number;
  results: Movie[];
}

export interface MovieCredits {
  id: number;
  cast: Cast[];
  crew: Crew[];
}

export interface PersonMovieCredits {
  cast: Movie[];
  crew: Movie[];
}

export interface Cast {
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  name: string;
  order: number;
  profile_path: string;
}

export interface Crew {
  credit_id: string;
  department: string;
  gender: number;
  id: number;
  job: string;
  name: string;
  profile_path: string;
}

export interface PersonDetail {
  birthday: string;
  known_for_department: string;
  deathday: string;
  id: number;
  name: string;
  also_known_as: string[];
  gender: number;
  biography: string;
  popularity: number;
  place_of_birth: string;
  profile_path: string;
  adult: boolean;
  imdb_id: string;
  homepage: string;
}

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  apikey: string;

  constructor(private http: HttpClient) {
    this.apikey = 'fed69657ba4cc6e1078d2a6a95f51c8c';
  }

  getMovieList(type: string, page: string) {
    return this.http.get<MoviePage>('https://api.themoviedb.org/3/movie/' + (type === 'top' ? 'top_rated' : type), {
      params: new HttpParams().set('api_key', this.apikey).set('page', page)
    });
    // catchError(error => throwError(error.message || error)));
  }

  getMovie(id: string) {
    return this.http.get<MovieDetails>('https://api.themoviedb.org/3/movie/' + id, {
      params: new HttpParams().set('api_key', this.apikey).set('append_to_response', 'videos')
    });
  }

  getGenres() {
    return this.http.get<Genres>('https://api.themoviedb.org/3/genre/movie/list', {
      params: new HttpParams().set('api_key', this.apikey)
    });
  }

  discoverMoviesByGenres(id: string, page: string) {
    return this.http.get<MoviePage>('https://api.themoviedb.org/3/discover/movie', {
      params: new HttpParams()
        .set('api_key', this.apikey)
        .set('sort_by', 'popularity.desc')
        .set('with_genres', id)
        .set('page', page)
    }).pipe(map(res => {
        return res;
      }
    ));
  }

  discoverMoviesByCast(id: string, page: string) {
    return this.http.get<MoviePage>('https://api.themoviedb.org/3/discover/movie', {
      params: new HttpParams()
        .set('api_key', this.apikey)
        .set('sort_by', 'popularity.desc')
        .set('with_cast', id)
        .set('page', page)
    }).pipe(map(res => {
        return res;
      }
    ));
  }

  getRecommendedMovies(id: string, page: string) {
    return this.http.get<MoviePage>('https://api.themoviedb.org/3/movie/' + id + '/recommendations', {
      params: new HttpParams().set('api_key', this.apikey).set('page', page)
    }).pipe(map(res => {
        return res;
      }
    ));
  }

  searchMovies(searchStr: string, page: string) {
    return this.http.get<MoviePage>('https://api.themoviedb.org/3/search/movie', {
      params: new HttpParams()
        .set('api_key', this.apikey)
        .set('sort_by', 'popularity.desc')
        .set('query', searchStr)
        .set('page', page)
    }).pipe(map(res => {
      return res;
    }));
  }

  getMovieCast(id: string) {
    return this.http.get<MovieCredits>('https://api.themoviedb.org/3/movie/' + id + '/credits', {
      params: new HttpParams().set('api_key', this.apikey)
    }).pipe(map(res => {
        return res.cast as Cast[];
      }
    ));
  }

  getPersonDetail(id: string) {
    return this.http.get<PersonDetail>('https://api.themoviedb.org/3/person/' + id, {
      params: new HttpParams().set('api_key', this.apikey)
    });
  }

  getMovieCredits(id: string, page: string) {
    return this.http.get<PersonMovieCredits>('https://api.themoviedb.org/3/person/' + id + '/movie_credits', {
      params: new HttpParams().set('api_key', this.apikey).set('page', page)
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
