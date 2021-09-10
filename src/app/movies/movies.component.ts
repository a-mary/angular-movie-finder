import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MoviesService} from '../services/movies.service';
import {ActivatedRoute, ParamMap, UrlSegment} from '@angular/router';
import {Genre, Movie, MoviePage, TvShow} from '../shared/interfaces';
import {combineLatest, Observable, Subscription} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy {

  title: string;
  movies: Movie[];
  tvShows: TvShow[];
  // @Input()
  // similar: boolean;
  // @Input()
  // person: boolean;
  genreId: string;
  currentPage: number;
  totalPages: number;
  pages: string[] = Array();
  active: boolean;
  routerLink: string;
  request: Observable<any>;


  constructor(private moviesService: MoviesService, private route: ActivatedRoute, public auth: AuthService) {
  }

  ngOnInit(): void {
    this.movies = null;

    combineLatest([this.route.queryParamMap, this.route.url]).subscribe(([qParams, urls]) => {
      // console.log(pParams.get('name'));
      // console.log(qParams);
      // console.log(urls);
      // console.log(this.tvShows + 'jjjj');

      this.getMovies(qParams.get('page') ? qParams.get('page') : '1', urls.map(segment => segment.path));
    }, error => console.log('error.msg'));
  }

  getMovies(currentPage: string, path: string[]) {
    if (path[0] === 'genres') {
      this.title = path[1];
      this.request = this.moviesService.getGenres().pipe(
        map(res => String(res.genres.find(genre => genre.name === path[1]).id)),
        switchMap((id: string) => {
          return this.moviesService.discoverMoviesByGenres(id, currentPage);
        }));
    } else if (path[0] === 'popular' || path[0] === 'upcoming' || path[0] === 'top') {
      this.title = path[0];
      this.request = this.moviesService.getMovieList(path[0], currentPage);
    } else if (path[0] === 'search') {
      this.title = 'Search results';
      this.request = this.moviesService.searchMovies(path[1], currentPage);
    } else if (path[0] === 'movie') {
      this.title = 'Recommended';
      this.request = this.moviesService.getRecommendedMovies(path[1], currentPage);
    } else if (path[0] === 'actor') {
      this.title = 'Filmography';
      this.request = this.moviesService.discoverMoviesByCast(path[1], currentPage);
    } else if (path[0] === 'tv' && path[1] === 'popular') {
      this.title = 'Popular TV Shows';
      console.log(path[0] + ' ' + path[1]);
      this.request = this.moviesService.getTvList(path[1], currentPage);
    } else if (path[0] === 'tv' && path[1] === 'top') {
      this.title = 'Popular TV Shows';
      this.request = this.moviesService.getTvList(path[1], currentPage);
    }

    if (this.request) {
      this.request.subscribe(response => {
        this.routerLink = `/${path.join('/')}/`;
        if (response.results.length > 0) {
          if (path[0] === 'tv') {
            this.tvShows = response.results;
          } else {
            this.movies = response.results;
          }

          this.totalPages = response.total_pages;
            this.currentPage = response.page;
            this.updatePageLinks();
            this.active = this.currentPage === 1;
          // console.log('request');
        }
      });
    }
  }



  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  updatePageLinks() {
    this.pages = [];
    const halfWay = Math.ceil(7 / 2);
    const pageLinks = this.totalPages < 7 ? this.totalPages : 7;

    for (let i = 1; i <= pageLinks; i++) {
      if ((i === 2 && (this.currentPage >= halfWay)) || (i === 6 && (this.totalPages - halfWay + 1 >= this.currentPage))) {
        this.pages.push('...');
        i++;
      }
      this.pages.push(String(this.calculatePageNumber(i, this.currentPage, 7, this.totalPages)));
    }
  }

  calculatePageNumber(i: number, currentPage: number, paginationRange: number, totalPages: number) {
    const halfWay = Math.ceil(paginationRange / 2);
    // console.log(i);
    if (i === paginationRange) {
      return totalPages;
    } else if (i === 1) {
      return i;
    } else if (paginationRange < totalPages) {
      if (totalPages - halfWay < currentPage) {
        return totalPages - paginationRange + i;
      } else if (halfWay < currentPage) {
        return currentPage - halfWay + i;
      } else {
        return i;
      }
    } else {
      return i;
    }
  }

}
