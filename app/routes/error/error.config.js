// ==============================================================================
//
//  app/routes/error/error.config.js
//
// ==============================================================================

import { ACCESS_LEVELS } from '../../core/constants/constants';
import templ404 from './404.html';
import templ403 from './403.html';
import templ500 from './500.html';

/**
 * ErrorConfig handles all of our states for any error pages
 *
 * @class ErrorConfig
 *
 */
class ErrorConfig {

  /**
   * Setup our routing and states via ui.router
   *
   * @param {Object} $stateProvider - ui.router stateprovider
   */
  static initRoute($stateProvider) {
    // ng-annotate injection

    'ngInject';

    $stateProvider.state('404', {
      url: '/404',
      template: templ404,
      data: {
        access: ACCESS_LEVELS.public,
      },
    })
      .state('403', {
        url: '/403',
        template: templ403,
        data: {
          access: ACCESS_LEVELS.public,
        },
      })
      .state('500', {
        url: '/500',
        template: templ500,
        data: {
          access: ACCESS_LEVELS.public,
        },
      });
  }
}

export default ErrorConfig.initRoute;
