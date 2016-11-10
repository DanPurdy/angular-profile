// ==============================================================================
//
//  app/routes/authentication/register/authentication.register.config.js
//
// ==============================================================================

import template from './authentication.register.html';

/**
 * AuthenticationRegisterConfig handles the communications route for our user registration page
 *
 * @class AuthenticationRegisterConfig
 *
 */
class AuthenticationRegisterConfig {

  /**
   * Setup our routing and states via ui.router
   *
   * @param {Object} $stateProvider - ui.router stateprovider
   */
  static initRoute($stateProvider) {
    'ngInject';

    $stateProvider.state('authentication.register', {
      url: '',
      abstract: true,
      template,
    })
    .state('authentication.register.form', {
      url: '/sign-up',
      template: '<ap-register-form-container></ap-register-form-container>',
    });
  }
}

export default AuthenticationRegisterConfig.initRoute;
