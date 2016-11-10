// ==============================================================================
//
//  app/routes/account/account.controller.js
//
// ==============================================================================

/**
 * AccountController class handles our interaction with the base account controller
 *
 * @class AccountController
 */
class AccountController {

  /**
   * Constructor for the AccountController class
   *
   * @constructor
   * @param {Object} AuthenticationService - The authentication service to handle auth functions
   * @param {Object} $state - The ui route state provider
    */
  constructor(AuthenticationService, $state) {
    // ng-annotate injection

    'ngInject';

    this.AuthenticationService = AuthenticationService;
    this.$state = $state;
  }

  /**
   * Logs the user out
   *
   * @returns {Object} The authentication service logout promise
   */
  logout() {
    return this.AuthenticationService.logout()
      .then(() => {
        this.$state.go('authentication.login.form');
      })
      .catch(e => {
        // TODO show an error message to the user
        console.error('User was not logged out', e); // eslint-disable-line no-console,angular/log
      });
  }
}

export default AccountController;
