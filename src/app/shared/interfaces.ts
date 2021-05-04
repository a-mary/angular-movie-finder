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
  adult?: false;
  backdrop_path?: string;
  popularity?: string;
  vote_count?: number;
  video?: boolean;
  poster_path: string;
  id: number;
  original_language?: string;
  original_title?: string;
  genre_ids?: number[];
  title: string;
  vote_average: number;
  overview: string;
  release_date: Date;
}

export interface TvShow {
  poster_path: string;
  popularity: number;
  id: number;
  backdrop_path: string;
  vote_average: number;
  overview: string;
  first_air_date: string;
  origin_country: string[];
  genre_ids: number[];
  original_language: string;
  vote_count: number;
  original_name: string;
  name: string;
}

export interface TVShowPage {
  page: number;
  total_results: number;
  total_pages: number;
  results: TvShow[];
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
