import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter, Input, OnChanges,
  OnInit,
  Output,
  QueryList, SimpleChanges,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {Genre, Movie} from '../../shared/interfaces';
import {MatSidenav} from '@angular/material/sidenav';
import {AuthService, User} from '../../auth/auth.service';
import {Observable} from 'rxjs';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {AuthModalComponent} from '../../auth/auth-modal/auth-modal.component';
import {MoviesService} from '../../services/movies.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {SidenavService} from '../sidenav/sidenav.service';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, AfterViewInit, OnChanges {
  title = '';
  @Input()
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
  @ViewChild('sidenav') sidenav: MatSidenav;

  @Output() onLogout = new EventEmitter<void>();
  @Output() onSidenavToggle = new EventEmitter<void>();

  currentFocus: number;
  isDropdownDisplay: boolean;
  dropdownDisplay: string;

  user: User;
  @Input() inputUser: User;

  isLoading: boolean;


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(['(max-width: 600px)'])
    .pipe(map(result => result.matches));

  constructor( private router: Router, private breakpointObserver: BreakpointObserver,
              public dialog: MatDialog, private sidenavService: SidenavService, private moviesServices: MoviesService) {
    this.isHide = true;
  }


  ngOnInit(): void {

  }

  sidenavToggle(): void {
    this.sidenavService.toggle();
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.inputUser) {
      this.user = changes.inputUser.currentValue;
    }
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
      // console.log(event.key.toString());
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

      // console.log(this.currentFocus);

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

  logout(event: Event) {
    event.preventDefault();
    // this.auth.logout();
    this.onLogout.emit();
    // this.auth.signOut()
    // this.router.navigate(['']);
  }



  onFocus() {
    this.display = 'block';
  }

  openDialog() {
    this.dialog.open(AuthModalComponent);
  }

  changeDropdown() {
    console.log('ddd')

    this.isDropdownDisplay = !this.isDropdownDisplay;

    this.dropdownDisplay = this.dropdownDisplay === 'none' ? 'block' : 'none';
  }

  ngAfterViewInit() {
    this.isHandset$.subscribe((res) => {
      // if ()
      this.sidenavService.close();
    })
  }

}
