// ==============================================================================
//
//  app/routes/account/account.config.js
//
// ==============================================================================

import template from './account.html';
import AccountController from './account.controller';
import { ACCESS_LEVELS } from '../../core/constants/constants';


/**
 * AccountConfig handles all our base state for user account pages
 *
 * @class AccountConfig
 *
 */
class AccountConfig {

  /**
   * Setup our routing and states via ui.router
   *
   * @param {Object} $stateProvider - ui.router stateprovider
   */
  static initRoute($stateProvider) {
    // ng-annotate injection

    'ngInject';

    $stateProvider.state('angularProfile.account', {
      abstract: true,
      url: '/account',
      template,
      controllerAs: 'apAccountVm',
      controller: AccountController,
      data: {
        access: ACCESS_LEVELS.user,
      },
    });
  }
}

export default AccountConfig.initRoute;
