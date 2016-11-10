// ==============================================================================
//
//  app/core/services/services.config.js
//
// ==============================================================================

import AuthenticationService from './authentication/authentication';
import FormService from './form/form';
import UserService from './user/user';

let coreServicesModule = angular.module('angularProfile.coreServices', []);

coreServicesModule
  .service('AuthenticationService', AuthenticationService)
  .service('FormService', FormService)
  .service('UserService', UserService);

export default coreServicesModule = coreServicesModule.name;
