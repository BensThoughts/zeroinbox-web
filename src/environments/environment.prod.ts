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
    angular: dependencies['@angular/core'],
    ngrx: dependencies['@ngrx/store'],
    material: dependencies['@angular/material'],
    bootstrap: dependencies['bootstrap'],
    rxjs: dependencies['rxjs'],
    fontAwesome: dependencies['@fortawesome/angular-fontawesome'],
    angularCli: devDependencies['@angular/cli'],
    typescript: devDependencies['typescript'],
  }
};
