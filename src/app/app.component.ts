import {
  Component,
  OnInit,
} from '@angular/core';
import {MoviesService} from './services/movies.service';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {Router} from '@angular/router';
import {Meta, Title} from '@angular/platform-browser';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MoviesService]
})
export class AppComponent implements OnInit {
  title = 'angular-movie-finder';

  constructor(private moviesServices: MoviesService,
              private breakpointObserver: BreakpointObserver,
              private router: Router,
              public auth: AuthService,
              private meta: Meta,
              private docTitle: Title,
              public dialog: MatDialog) {

    this.meta.addTags([
      {name: 'keywords', content: 'angular,google,appcomponent'},
      {name: 'description', content: 'this is app component'},
    ]);
  }

  ngOnInit(): void {
  }

}
