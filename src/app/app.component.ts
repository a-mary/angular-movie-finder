import {
  Component,
  ElementRef,
  HostListener,
  Injectable, OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {MoviesService} from './services/movies.service';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, take, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Genre, Movie} from './shared/interfaces';
import {Meta, Title} from '@angular/platform-browser';
import {MatDialog} from '@angular/material/dialog';
import {AuthModalComponent} from './auth-modal/auth-modal.component';
import {AuthService, User} from './services/auth.service';
import {log} from 'util';
import {errorComparator} from 'tslint/lib/verify/lintError';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MoviesService]
})
export class AppComponent  implements OnInit{
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
  // @ViewChild('dropbtn') dropbtn: ElementRef;
  // @ViewChild('userDropdownBtn') userDropdownBtn: ElementRef;
  currentFocus: number;
  isDropdownDisplay: boolean;
  dropdownDisplay: string;
  user: User;

  isLoading: boolean;

  // @HostListener('document:click', ['$event.target'])
  // clickout(event) {
  //   console.log('tt' + event.target === this.dropbtn.nativeElement)
  //   console.log('ttu' + this.dropbtn.nativeElement)
  //   // event.target;
  //   if (!this.dropbtn.nativeElement.contains(event)) {
  //     // this.changeDropdown();
  //     // this.dropdownDisplay = 'false'
  //     console.log('falseeee')
  //
  //   }
  // }

  // opened = true;

  // isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  //   .pipe(map(result => result.matches));
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(['(max-width: 600px)'])
    .pipe(map(result => result.matches));

  // isSmallScreen = this.breakpointObserver.isMatched('(max-width: 599px)');

  constructor(private moviesServices: MoviesService,
              private breakpointObserver: BreakpointObserver,
              private router: Router,
              public auth: AuthService,
              private meta: Meta,
              private docTitle: Title,
              public dialog: MatDialog,
              private renderer: Renderer2,
              private elRef: ElementRef,
              afuth: AngularFireAuth) {
    this.moviesServices.getGenres().subscribe(res => {
      // console.log('ggg ' + res.genres.length);
      this.genres = res.genres;
      this.meta.addTags([
        {name: 'keywords', content: 'angular,google,appcomponent'},
        {name: 'description', content: 'this is app component'},
      ]);
      // this.genres = res.genres.slice(0, 20);
    });
    this.isHide = true;

    // this.dropdownDisplay = 'none';
    // this.isDropdownDisplay = false;

    // this.renderer.listen('window', 'click', (e: Event) => {
    //   /**
    //    * Only run when toggleButton is not clicked
    //    * If we don't check this, all clicks (even on the toggle button) gets into this
    //    * section which in the result we might never see the menu open!
    //    * And the menu itself is checked here, and it's where we check just outside of
    //    * the menu and button the condition abbove must close the menu
    //    */
    //   console.log('nn')
    //   console.log('nn' + this.dropbtn.nativeElement)
    //
    //   if (e.target !== this.dropbtn.nativeElement) {
    //     if (this.dropdownDisplay === 'block') {
    //       console.log('nn')
    //       this.dropdownDisplay = 'none';
    //     }
    //   }
    // });

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

    // this.breakpointObserver.observe(['(min-width: 601px)']).subscribe((state: BreakpointState) => {
    //   if (state.matches) {
    //     this.transition = '.5s ease';
    //     this.width = event.target.value ? '280px' : '150px';
    //   } else {
    //     this.transition = 'none';
    //   }
    // });
  }

  onFocus() {
    this.display = 'block';
  }

  openDialog() {
    this.dialog.open(AuthModalComponent);
  }

  logout(event: Event) {
    event.preventDefault();
    // this.auth.logout();
    this.auth.signOut()
    // this.router.navigate(['']);
  }

  changeDropdown() {
    console.log('ddd')

    this.isDropdownDisplay = !this.isDropdownDisplay;

    this.dropdownDisplay = this.dropdownDisplay === 'none' ? 'block' : 'none';
  }


  ngOnInit(): void {
    this.isLoading = true;

    console.log("INIT ------------ App component");

    this.auth.user$.pipe(
    ).subscribe(user => {
      if (user) {
        this.user = user;
        console.log('user exist')

      } else {
        this.user = null;
        console.log('user is null')
      }
      this.isLoading = false;
      // console.log('user get ' )
      // console.log('user get ' + user.displayName)
    }, error => {
      console.log(error)
    }, () => console.log('obs completed')
 );
  }
}
