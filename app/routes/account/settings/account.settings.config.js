// ==============================================================================
//
//  app/routes/account/settings/account.settings.config.js
//
//
//
// ==============================================================================

import template from './account.settings.html';

/**
 * AccountSettingsConfig handles all our base state for user account pages
 *
 * @class AccountSettingsConfig
 *
 */
class AccountSettingsConfig {

  /**
   * Setup our routing and states via ui.router
   *
   * @param {Object} $stateProvider - ui.router stateprovider
   */
  static initRoute($stateProvider) {
    // ng-annotate injection

    'ngInject';

    $stateProvider.state('angularProfile.account.settings', {
      url: '/settings',
      template,
    })
    .state('angularProfile.account.child', {
      url: '/settings/child/:userId',
      template,
      controllerAs: 'childSettingsVm',
      controller: ($scope, $stateParams) => {
        'ngInject';

        $scope.userId = parseInt($stateParams.userId, 10) || null; // eslint-disable-line no-param-reassign,max-len
      },
    });
  }
}

export default AccountSettingsConfig.initRoute;
