// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {Environment} from './interface';

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDD65i8ZDD_XjlKkTqz_9PgTr7G9ILAwI8',
    authDomain: "angular-movie-finder.firebaseapp.com",
    projectId: "angular-movie-finder",
    storageBucket: "angular-movie-finder.appspot.com",
    messagingSenderId: "182216232211",
    appId: "1:182216232211:web:b84675f6f9c62bf7b51ee6"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
