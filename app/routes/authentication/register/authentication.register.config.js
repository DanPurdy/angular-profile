// ==============================================================================
//
//  app/routes/authentication/register/authentication.register.config.js
//
//
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
      template: '<alr-register-form-container></alr-register-form-container>',
    })
    .state('authentication.register.complete', {
      url: '/sign-up/complete',
      // template: '<alr-register-form-complete></alr-register-form-complete>',
      template: 'test',
    });
  }
}

export default AuthenticationRegisterConfig.initRoute;
