import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Genre, Movie} from '../../shared/interfaces';
import {MatSidenav} from '@angular/material/sidenav';
import {AuthService, User} from '../../auth/auth.service';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MoviesService} from '../../services/movies.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  user: User;
  isLoading: boolean;
  genres: Array<Genre>;

  constructor(public auth: AuthService, private moviesServices: MoviesService) {
    this.moviesServices.getGenres().subscribe(res => {
      this.genres = res.genres;
    });
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.auth.user$.pipe().subscribe(user => {
        if (user) {
          this.user = user;
          console.log(`user ${user.displayName} exist`)
        } else {
          this.user = null;
          console.log('user is null')
        }
        this.isLoading = false;
      }, error => {
        console.log(error)
      }, () => console.log('obs completed')
    );
  }

  logout() {
    this.auth.signOut()
  }

}
