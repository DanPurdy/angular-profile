// ==============================================================================
//
//  app/routes/authentication/login/authentication.login.module.js
//
// ==============================================================================

import ApLoginModule from '../../../components/ap-login/ap-login-component';
import authLoginConfig from './authentication.login.config';

const authLoginModule = angular.module('angularProfile.authentication.login', [
  'ui.router',
  ApLoginModule,
]);

authLoginModule
  .config(authLoginConfig);

export default authLoginModule.name;
