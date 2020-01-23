/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAuFO_TQKLLE3McqiUeN-ax8slZfgbZh2M",
    authDomain: "saarromanus.firebaseapp.com",
    databaseURL: "https://saarromanus.firebaseio.com",
    projectId: "saarromanus",
    storageBucket: "saarromanus.appspot.com",
    messagingSenderId: "856575539561",
    appId: "1:856575539561:web:dc1573eddbdabd40daa5f8",  
  }
};
