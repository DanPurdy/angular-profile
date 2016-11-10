// ==============================================================================
//
//  app/core/model/model.config.js
//
// ==============================================================================

import TokenModel from './token/token';
import UsersModel from './users/users';

export default angular.module('angularProfile')
  .service('TokenModel', TokenModel)
  .service('UsersModel', UsersModel);
