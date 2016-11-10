// ==============================================================================
//
//  app/routes/authentication/login/authentication.login.module.js
//
// ==============================================================================

import authLoginConfig from './authentication.login.config';
import ApLoginFormContainerModule
  from './components/login-form-container/login-form-container-component';

const authLoginModule = angular.module('angularProfile.authentication.login', [
  'ui.router',
  ApLoginFormContainerModule,
]);

authLoginModule
  .config(authLoginConfig);

export default authLoginModule.name;
