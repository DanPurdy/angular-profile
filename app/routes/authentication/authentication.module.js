// ==============================================================================
//
//  app/routes/authentication/authentication.module.js
//
// ==============================================================================
import authConfig from './authentication.config';
import login from './login/authentication.login.module';
import register from './register/authentication.register.module';

const authenticationModule = angular.module('angularProfile.authentication', [
  login,
  register,
]);

authenticationModule
  .config(authConfig);

export default authenticationModule.name;
