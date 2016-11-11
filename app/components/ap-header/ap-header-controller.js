// =============================================================================
//
//  app/components/ap-header/ap-header-controller.js
//
// =============================================================================

/**
 * ApHeaderController class handles our interaction with the Header component
 *
 * @class ApHeaderController
 */
class ApHeaderController {

  /**
   * Constructor for the ApHeaderController class
   *
   * @constructor
   * @param {Object} $rootScope - The root scope provider of our angular application
   */
  constructor($rootScope) {
    'ngInject';

    this.$rootScope = $rootScope;
    this.user = $rootScope.currentUser.userName;
  }
}

export default ApHeaderController;
