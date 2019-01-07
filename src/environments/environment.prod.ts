const packageJson = require('../../package.json');

export const environment = {
  appName: 'Gmail Starter',
  envName: 'PROD',
  production: true,
  test: false,
  i18nPrefix: '/gmail-organizer',
  versions: {
    app: packageJson.version,
    angular: packageJson.dependencies['@angular/core'],
    ngrx: packageJson.dependencies['@ngrx/store'],
    material: packageJson.dependencies['@angular/material'],
    bootstrap: packageJson.dependencies.bootstrap,
    rxjs: packageJson.dependencies.rxjs,
    ngxtranslate: packageJson.dependencies['@ngx-translate/core'],
    fontAwesome:
      packageJson.dependencies['@fortawesome/fontawesome-free-webfonts'],
    angularCli: packageJson.devDependencies['@angular/cli'],
    typescript: packageJson.devDependencies['typescript'],
    cypress: packageJson.devDependencies['cypress']
  },
  firebase: {
    apiKey: 'AIzaSyApj72ln0LXGOfDphTmxjm5du142jPe0kw',
    authDomain: 'labelorganizer.firebaseapp.com',
    databaseURL: 'https://labelorganizer.firebaseio.com',
    projectId: 'labelorganizer',
    storageBucket: 'labelorganizer.appspot.com',
    messagingSenderId: '268592066050'
  },
  googleApi: {
    apiKey: 'AIzaSyDVqUhDKRHUWuaCCOZDuqMwMWape3VNaGM',
    clientId: '443118366030-p6fpakqmn0ngjes70eigkegpvva96agm.apps.googleusercontent.com',
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
    scope: 'https://www.googleapis.com/auth/gmail.readonly',
    redirect_uri: 'http://localhost:80/loading',
  }
};
