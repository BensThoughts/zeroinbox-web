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
    apiKey: "AIzaSyApj72ln0LXGOfDphTmxjm5du142jPe0kw",
    authDomain: "labelorganizer.firebaseapp.com",
    databaseURL: "https://labelorganizer.firebaseio.com",
    projectId: "labelorganizer",
    storageBucket: "labelorganizer.appspot.com",
    messagingSenderId: "268592066050"
  }
};


//export const environment = {
//  production: true
//};
