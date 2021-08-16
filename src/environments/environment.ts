// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const packageJson = require('../../package.json');
const dependencies = packageJson.dependencies;
const devDependencies = packageJson.devDependencies;

export const environment = {
  appName: packageJson.name,
  appVersion: packageJson.version,
  envName: 'DEV',
  apiHost: 'http://127.0.0.1:8081/v1',
  production: false,
  test: false,
  i18nPrefix: '',
  packageVersions: {
    angular: dependencies['@angular/core'],
    ngrx: dependencies['@ngrx/store'],
    material: dependencies['@angular/material'],
    bootstrap: dependencies['bootstrap'],
    rxjs: dependencies['rxjs'],
    fontAwesome: dependencies['@fortawesome/angular-fontawesome'],
    angularCli: devDependencies['@angular/cli'],
    typescript: devDependencies['typescript']
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
