// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {  // kopirano iz databaze - projekt PPopup
    apiKey: "AIzaSyD21qfOh9a_KMAWMNM2fZa8YjcfV5TPEH0",
    authDomain: "ppopup-e3303.firebaseapp.com",
    databaseURL: "https://ppopup-e3303.firebaseio.com",
    projectId: "ppopup-e3303",
    storageBucket: "",
    messagingSenderId: "76576440950",
    appId: "1:76576440950:web:e500e5739743f0fe"
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
