import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input, OnChanges,
  OnInit,
  Output,
  QueryList, SimpleChanges, TemplateRef,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {Genre, Movie} from '../../shared/interfaces';
import {MatSidenav} from '@angular/material/sidenav';
import {User} from '../../auth/auth.service';
import {SidenavService} from './sidenav.service';
import {AuthModalComponent} from '../../auth/auth-modal/auth-modal.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnChanges, AfterViewInit {

  @Input()
  genres: Array<Genre>;
  search: boolean;
  movies: Movie[];
  display: string;
  width: string;
  transition: string;
  @ViewChild('mtitle') mtitle;
  @ViewChildren('movieTitle') movieTitles: QueryList<ElementRef>;
  @ViewChild('sidenav') sidenav: MatSidenav;
  // @ViewChild(TemplateRef, { static: true }) sidenav!: TemplateRef;

  @Output() onLogout = new EventEmitter<void>();

  user: User;
  @Input() inputUser: User;


  panelOpenState = false;
  isLoading: boolean;


  constructor(private sidenavService: SidenavService, public dialog: MatDialog,) { }

  ngOnInit(): void {
    // this.sidenavService.setSidenav(this.sidenav);
  }



  openDialog(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.dialog.open(AuthModalComponent);
  }

  logout(event: Event) {
    event.preventDefault();
    this.onLogout.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.inputUser) {
      this.user = changes.inputUser.currentValue;
    }
  }

  ngAfterViewInit() {
    this.sidenavService.setSidenav(this.sidenav);

  }
    // this.isHandset$.subscribe((res) => {
    //   this.sidenavService.close();
    // }

}
