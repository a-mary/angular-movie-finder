import {Component, ElementRef, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Genre, Movie, MoviesService} from './service/movies.service';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MoviesService]
})
export class AppComponent {
  title = 'angular-movie-finder';
  genres: Array<Genre>;
  search: boolean;
  movies: Movie[];
  display: string;
  width: string;
  isHide: boolean;
  transition: string;
  @ViewChild('inputElement') input;
  @ViewChild('mtitle') mtitle;
  @ViewChildren('movieTitle') movieTitles: QueryList<ElementRef>;
  currentFocus: number;

  // opened = true;

  // isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  //   .pipe(map(result => result.matches));
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(['(max-width: 600px)'])
    .pipe(map(result => result.matches));

  // isSmallScreen = this.breakpointObserver.isMatched('(max-width: 599px)');

  constructor(private moviesServices: MoviesService, private breakpointObserver: BreakpointObserver,
              private router: Router) {
    this.moviesServices.getGenres().subscribe(res => {
      this.genres = res.genres.slice(0, 20);
    });
    this.isHide = true;
  }


  onSubmit(seartStr: string) {
    // console.log(this.currentFocus + 'submit');
    if (seartStr && this.currentFocus === -1) {
      this.router.navigate(['/search', seartStr]);
    } else {
      this.movieTitles.filter((element, i) => i === this.currentFocus)
        .map(title => title.nativeElement.click());
    }

    this.display = 'none';
    this.removeActive();
  }

  navigateToMovie(movieId: number) {
    this.currentFocus = -1;
    this.removeActive();
    this.router.navigate(['/movie', movieId]);
    this.display = 'none';
  }

  onKeyUpEvent(event: any) {
    this.moviesServices.searchMovies(event.target.value, '1').subscribe(res => {
      this.title = 'Search results';
      this.movies = res.results;
      console.log(event.key.toString());
      // console.log(this.currentFocus);

      if (event.key === 'ArrowDown') {
        if (this.currentFocus >= this.movieTitles.length - 1) {
          this.currentFocus = -1;
        } else {
          this.currentFocus++;
        }
        this.addActive();
      } else if (event.key === 'ArrowUp') {
        if (this.currentFocus < 0) {
          this.currentFocus = this.movieTitles.length - 1;
        } else {
          this.currentFocus--;
        }
        this.addActive();
      } else {
        this.currentFocus = -1;
      }

      console.log(this.currentFocus);

      if (event.key !== 'Enter') {
        this.display = 'block';
      }
    });
  }

  addActive() {
    this.removeActive();

    this.movieTitles.filter((element, i) => i === this.currentFocus)
      .map(title => title.nativeElement.classList.add('autocomplete-active'));

  }

  removeActive() {
    this.movieTitles.forEach(title => title.nativeElement.classList.remove('autocomplete-active'));
  }

  trackByFn(index) {
    return index;
  }



  onMouseOver(index: number) {
    this.currentFocus = index;
    this.addActive();
  }

  onFocusout(event: any) {
    if (this.isHide) {
      this.display = 'none';
      this.currentFocus = -1;
      this.removeActive();
    }

    this.breakpointObserver.observe(['(min-width: 601px)']).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.transition = '.5s ease';
        this.width = event.target.value ? '280px' : '150px';
      } else {
        this.transition = 'none';
      }
    });
  }

  onFocus() {
    this.display = 'block';
  }
}
