import {Component, Input, OnInit} from '@angular/core';
import {Movie, MoviesService} from '../service/movies.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  title: string;
  movies: Movie[];
  @Input()
  similar: boolean;
  @Input()
  person: boolean;
  genreId: string;
  currentPage: number;
  totalPages: number;
  pages: string[] = Array();
  active: boolean;
  routerLink: string;

  constructor(
    private moviesService: MoviesService,
    private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.movies = null;

    this.router.data.subscribe(data => {

      if (data.path === 'genres') {
        this.router.paramMap.subscribe((params) => {
          this.title = params.get('name');
          this.genreId = params.get('id');
          this.routerLink = '/genres/' + this.genreId + '/' + this.title + '/';
          this.router.queryParamMap.subscribe((qParams) => {
            this.moviesService.discoverMoviesByGenres(params.get('id'),
              (qParams.get('page') ? qParams.get('page') : '1')).subscribe(res => {
              this.movies = res.results;
              this.totalPages = res.total_pages;
              this.currentPage = res.page;
              this.updatePageLinks();
              this.active = this.currentPage === 1;
            });
          });
        });
      } else if (data.path === 'popular' || data.path === 'upcoming' || data.path === 'top') {
        this.title = data.path;
        this.routerLink = '/' + data.path;
        this.router.queryParamMap.subscribe((qParams) => {
          this.moviesService.getMovieList(data.path, (qParams.get('page') ? qParams.get('page') : '1')).subscribe(res => {
            this.movies = res.results;
            this.totalPages = res.total_pages;
            this.currentPage = res.page;
            this.updatePageLinks();
            this.active = this.currentPage === 1;
          });
        });
      } else if (data.path === 'search') {
        this.router.paramMap.subscribe((params) => {
          const searchStr = params.get('title');
          console.log(searchStr);
          this.routerLink = '/search/' + searchStr;
          this.router.queryParamMap.subscribe((qParams) => {
            this.moviesService.searchMovies(searchStr, (qParams.get('page') ? qParams.get('page') : '1')).subscribe(res => {
              console.log(res.total_pages);
              this.title = 'Search results';
              this.movies = res.results;
              this.totalPages = res.total_pages;
              this.currentPage = res.page;
              this.updatePageLinks();
              this.active = this.currentPage === 1;
            });
          });
        });
      } else if (this.similar) {
        this.router.paramMap.subscribe((params) => {
          this.routerLink = '/movie/' + params.get('id') + '/';
          this.router.queryParamMap.subscribe((qParams) => {
            this.moviesService.getRecommendedMovies(params.get('id'),
              (qParams.get('page') ? qParams.get('page') : '1')).subscribe(res => {
              this.title = 'Recommended';
              if (res.results.length > 0) {
                this.movies = res.results;
                this.totalPages = res.total_pages;
                this.currentPage = res.page;
                this.updatePageLinks();
                this.active = this.currentPage === 1;
              }
            });
          });
        });
      } else if (this.person) {
        this.router.paramMap.subscribe((params) => {
          this.routerLink = '/actor/' + params.get('id') + '/';
          this.router.queryParamMap.subscribe((qParams) => {
            this.moviesService.discoverMoviesByCast(params.get('id'),
              (qParams.get('page') ? qParams.get('page') : '1')).subscribe(res => {
              this.title = 'Filmography';
              if (res.results.length > 0) {
                this.movies = res.results;
                this.totalPages = res.total_pages;
                this.currentPage = res.page;
                this.updatePageLinks();
                this.active = this.currentPage === 1;
              }
            });
          });
        });

      }
    });
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
    console.log(i);
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
