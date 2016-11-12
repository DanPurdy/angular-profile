// ==============================================================================
//
//  app/routes/authentication/login/authentication.login.config.js
//
// ==============================================================================

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

    /* eslint-disable angular/controller-as-route */
    $stateProvider.state('authentication.login', {
      url: '',
      abstract: true,
      template,
    }).state('authentication.login.form', {
      url: '/login',
      template: `<ap-login-form-container
          registered-user="registeredUser"
          logged-out="loggedOut"
        ></ap-login-form-container>`,
      params: {
        registeredUser: null,
        loggedOut: false,
      },
      controller: ($stateParams, $scope) => {
        'ngInject';

        $scope.registeredUser = $stateParams.registeredUser; // eslint-disable-line no-param-reassign,max-len
        $scope.loggedOut = $stateParams.loggedOut; // eslint-disable-line no-param-reassign
      },
    });
    /* eslint-enable angular/controller-as-route */
  }
}

export default AuthenticationLoginConfig.initRoute;
