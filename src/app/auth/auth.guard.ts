import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from './auth.service';
import {map, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth, private router: Router, private auth: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {

    if(this.auth.isLoggedIn !== true) {
      this.router.navigate(['/popular'])
    }
    return true;


    // return

    // if (!!this.auth.user$.getValue()) {
    //
    //   console.log('access denied');
    //         this.router.navigate(['/popular']);
    //         return false;
    // } else {
    //   return true;
    // }

    // return this.auth.user$.pipe(
    //   take(1),
    //   map(user => !!user),
    //   tap(loggedIn => {
    //     if (!loggedIn) {
    //       console.log('access denied');
    //       this.router.navigate(['/popular']);
    //     }
    //   })
    // );

    // return this.auth.userr$.pipe(
    //   take(1),
    //   map(user => !!user),
    //   tap(loggedIn => {
    //     if (!loggedIn) {
    //       console.log('access denied');
    //       this.router.navigate(['/popular']);
    //     }
    //   })
    // );
  }

}
