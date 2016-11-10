// ==============================================================================
//
//  app/core/resources/resources.config.js
//
// ==============================================================================


import AuthenticationResource from './authentication/authentication';
import UsersResource from './users/users';

export default angular.module('angularProfile.coreResources', [])
  .service('AuthenticationResource', AuthenticationResource)
  .service('UsersResource', UsersResource);
