// ==============================================================================
//
//  app/routes/authentication/authentication.config.js
//
// ==============================================================================

import template from './authentication.html';
import { ACCESS_LEVELS } from '../../core/constants/constants';

/**
 * AuthenticationConfig handles all our base state for user account pages
 *
 * @class AuthenticationConfig
 *
 */
class AuthenticationConfig {

  /**
   * Setup our routing and states via ui.router
   *
   * @param {Object} $stateProvider - ui.router stateprovider
   */
  static initRoute($stateProvider) {
    // ng-annotate injection

    'ngInject';

    $stateProvider.state('authentication', {
      abstract: true,
      url: '',
      template,
      data: {
        access: ACCESS_LEVELS.public,
      },
    });
  }
}

export default AuthenticationConfig.initRoute;
