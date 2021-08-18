const packageJson = require('../../package.json');

const dependencies = packageJson.dependencies;
const devDependencies = packageJson.devDependencies;

export const environment = {
  appName: packageJson.name,
  appVersion: packageJson.version,
  envName: 'PROD',
  apiHost: 'https://api.zeroinbox.app/v1',
  production: true,
  test: false,
  i18nPrefix: '',
  packageVersions: {
    '@angular/core': dependencies['@angular/core'],
    '@ngrx/store': dependencies['@ngrx/store'],
    '@angular/material': dependencies['@angular/material'],
    bootstrap: dependencies['bootstrap'],
    rxjs: dependencies['rxjs'],
    '@scullyio/init': dependencies['@scullyio/init'],
    '@fortawesome/angular-fontAwesome':
      dependencies['@fortawesome/angular-fontawesome'],
    '@angular/cli': devDependencies['@angular/cli'],
    typescript: devDependencies['typescript']
  }
};
