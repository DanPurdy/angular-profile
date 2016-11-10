// ==============================================================================
//
//  app/routes/authentication/login/authentication.login.config.js
//
// ==============================================================================

import AuthenticationLoginController from './authentication.login.controller';

import template from './authentication.login.html';

/**
 * AuthenticationLoginConfig handles the communications route for our login page
 *
 * @class AuthenticationLoginConfig
 *
 */
class AuthenticationLoginConfig {

  /**
   * Setup our routing and states via ui.router
   *
   * @param {Object} $stateProvider - ui.router stateprovider
   */
  static initRoute($stateProvider) {
    'ngInject';

    $stateProvider.state('authentication.login', {
      url: '/login',
      template,
      params: {
        validated: false,
        loggedOut: false,
        reset: false,
      },
      controller: AuthenticationLoginController,
      controllerAs: 'apAuthLoginVm',
    });
  }
}

export default AuthenticationLoginConfig.initRoute;
