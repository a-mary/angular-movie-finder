import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of, ReplaySubject} from 'rxjs';
import {environment} from '../../environments/environment';
import {distinctUntilChanged, first, switchMap, tap} from 'rxjs/operators';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase';
import auth = firebase.auth;
import UserCredential = firebase.auth.UserCredential;

export interface User {
  uid?: string;
  email?: string;
  password?: string;
  returnSecureToken?: boolean;
  photoUrl?: string;
  displayName?: string;
  // phoneNumber?: string;
  // pseudo?: string;
}

export interface FbAuthResponse {
  idToken: string;
  expiresIn: string;
}

@Injectable()
export class AuthService {


  // subscriber: Subscriber<User>
  // user$: Observable<User>;
  // user: User;
  // test$: Observable<any>;
  // isLoggedIn = false;
  // fireAuthUser$: Observable<firebase.User>;
  // fireAuthUser: firebase.User = null;

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  private userBehaviorSubject = new BehaviorSubject<User>(null);
  public user$ = this.userBehaviorSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  // private isLoadingSubject = new ReplaySubject<boolean>(1);
  // public isLoading = this.isLoadingSubject.asObservable();


  // user$: BehaviorSubject<User>
  // uid = this.afAuth.authState.pipe(map(authState))

  // refreshUser(): Observable<User> {
  //   this.afAuth.authState.pipe(
  //     flatMap(user => {
  //       if (user) {
  //         // let observable = this.afs.collection(`users/${user.uid}/favorites`).doc("favorite").get();
  //         // observable.subscribe(value => {
  //         //   let toString = value.get("movieId");
  //         //   // console.log("MovieId: "+toString);
  //         // })
  //         // this.test$ = observable;
  //
  //         // this.uid = user.uid
  //         return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
  //
  //       } else {
  //         return of(null);
  //       }
  //     })
  //   ).subscribe(value => this.user$.next(value))
  //   return this.user$
  // }

  constructor(private http: HttpClient,
              private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {

    // this.isLoading$.next(true);
    // this.refreshUser()
    // this.user$ = new BehaviorSubject<User>(this.user)


    // console.log('isUserUndefined '+ (item === null));
    // if (localStorage.getItem("user") === null) {
    let item = localStorage.getItem("user");

    if (item) {
      // this.afs.doc<User>(`users/${user.uid}`).valueChanges()
    }

    this.afAuth.authState.pipe(switchMap(user => {
      console.log("authState")
        if (user) {
          console.log('user is signed in ' + user.uid)
          let item = localStorage.getItem("user");
          console.log("user localstorage " + item)
          if (item !== null) {
            return of(JSON.parse(item))
          } else {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          }
        } else {
          console.log('user is signed out')
          return of(null);
        }
      })
    ).subscribe(user => {
      console.log('auth is null '+(user === null))
      if (user === null) {
        this.purgeAuth();
      } else {
        this.setAuth(user);
      }

      this.isLoading$.next(false);
      console.log('auth Loaded')

      // if (user !== null)
      //   localStorage.setItem('user', JSON.stringify(user));
      // this.userBehaviorSubject.next(user);
    });
    // } else {
    //   let user: User = JSON.parse(item)
    //   this.user$.next(user)
    // }


    console.log("Create ----------- AuthService")




    // this.afAuth.authState.subscribe(user => {
    //
    //   if (user) {
    //     // User is signed in
    //     user.getIdToken(true).then(token => {
    //       console.log('token ' + token);
    //     })
    //
    //     user.getIdTokenResult(true).then(result => {
    //       console.log('rtoken ' + result.authTime);
    //       console.log('irtoken ' + result.issuedAtTime);
    //       console.log('ertoken ' + result.expirationTime);
    //       console.log('rtoken ' + result.token);
    //       console.log('rtoken ' + result.claims.key);
    //     })
    //     this.user = user;
    //     console.log('user ' + user.toJSON());
    //     console.log('user ' + user.email);
    //     console.log('user ' + user.displayName);
    //     console.log('user ' + user.providerData);
    //     // this.isLoggedIn = true;
    //     // return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
    //   } else {
    //     // User is signed out
    //     return of(null);
    //   }
    // });

  }

  // getLoggedInUser(): User {
  //   return localStorage.getItem('user');
  // }

  setAuth(user: User) {
    // Save user data in localstorage
    localStorage.setItem('user', JSON.stringify(user));
    // Set current user data into observable
    this.userBehaviorSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove user data from localstorage
    localStorage.removeItem('user');
    // Set current user to an empty object
    this.userBehaviorSubject.next(null);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  // Sign in with email/password
  signIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password).then(
      (result: UserCredential) => {
        // result.user.uid
        //
        // console.log('rs' + result.user.uuid);
        // console.log('rs' + result.additionalUserInfo.username);
        // console.log('rs' + result.user.uid);
        // console.log('rs' + result.operationType);
        // this.updateUserData('rsu' +result.user);
      }
    ).catch((error) => {
      window.alert(error.message)
      console.log('error msg ' + error.message)
    });

  }

  getCurrentUser(): User {
    return this.userBehaviorSubject.value;
  }

  // async login(email: string, password: string) {
  //   var result = await this.afAuth.signInWithEmailAndPassword(email, password)
  //   this.router.navigate(['admin/list']);
  // }

  // Sign in with Google
  async googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);

  }



  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      displayName: user.displayName,
      photoUrl: user.photoURL,
      uid: user.uid,
    };

    // console.log('user data' + data);
    return userRef.set(data, {merge: true});
  }

  getFirebaseUser(): Observable<firebase.User> {
    console.log('getFirebaseUser');
    return this.afAuth.authState;
  }

  // Sign out
  async signOut() {
    console.log('SIGH OUT');
    this.purgeAuth();
    await this.afAuth.signOut();
    return this.router.navigate(['/']);
    // .then(() => this.router.navigate(['/']))
  }


  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null);
  }

  get token(): string {
    // const expDate = new Date(localStorage.getItem('fb-token-exp'))
    // if (new Date() > expDate) {
    //   this.logout();
    //   return null;
    // }
    return localStorage.getItem('fb-token');
  }

  loginUsingApi(user: User): Observable<any> {
    user.returnSecureToken = true;
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebase.apiKey}`, user)
      .pipe(
        tap(this.setToken
        ));
  }


  logout() {
    // this.setToken(null);
    this.afAuth.signOut();
  }


  private setToken(response: FbAuthResponse | null) {
    if (response) {

      // console.log(response);
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)

      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }

  // isAuthenticated() {
  //   return this.afAuth.authState.pipe(first()).toPromise();
  //   return (this.afAuth.user);
  // }

  isAuth(): boolean {
    return !!this.token;
  }

  //
  // getUserId(): Observable<User> {
  //   return this.user$;
  // }
}
