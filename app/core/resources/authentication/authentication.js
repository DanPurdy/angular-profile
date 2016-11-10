// ==============================================================================
//
//  app/core/resources/authentication/authentication.js
//
//
//
// ==============================================================================

import { AUTH_URL } from '../../constants/constants';

/**
 * AuthenticationResource class handles all calls to the API with regards to user auth
 *
 * @class AuthenticationResource
 */
class AuthenticationResource {

  /**
   * Constructor function for our AuthenticationResource class
   *
   * @constructor
   * @param {Object} Restangular - Instance of our Restangular provider for REST api calls
   */
  constructor(Restangular) {
    'ngInject';

    this.Restangular = Restangular;
    this.route = AUTH_URL;
  }

  /**
   * Handle login calls to the API
   *
   * @param {Object} credentials - User credentials
   * @returns {Object} Returns our resource POST call
   */
  login(credentials) {
    return this.Restangular.all(`${this.route}`)
      .post(credentials);
  }

  /**
   * GET request to the API to log a user out
   *
   * @returns {Object} returns our resource GET call
   */
  logout() {
    // TODO add the actual logout endpoint
    return this.Restangular.all('logout')
      .getList();
  }
}

// register as a service on our angular module
export default AuthenticationResource;
