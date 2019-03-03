const packageJson = require('../../package.json');

export const environment = {
  appName: packageJson.name,
  appVersion: packageJson.version,
  envName: 'PROD',
  apiHost: 'https://api.zeroinbox.app/v1',
  production: true,
  test: false,
  i18nPrefix: '',
  packageVersions: {
    angular: packageJson.dependencies['@angular/core'],
    ngrx: packageJson.dependencies['@ngrx/store'],
    material: packageJson.dependencies['@angular/material'],
    bootstrap: packageJson.dependencies.bootstrap,
    rxjs: packageJson.dependencies.rxjs,
    fontAwesome: packageJson.dependencies['@fortawesome/fontawesome-free'],
    angularCli: packageJson.devDependencies['@angular/cli'],
    typescript: packageJson.devDependencies['typescript'],
  }
};
