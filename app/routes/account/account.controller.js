// ==============================================================================
//
//  app/routes/account/account.controller.js
//
//
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
   * @param {Object} AuthenticationService - The authentication service to handle auth functions
   * @param {Object} $state - The ui route state provider
   * @param {Object} UsersModel - The users model to handle user collections
   * @param {Object} $rootScope - The application $rootScope
   * @param {Object} TokenModel - The token model to handle user tokens
   * @constructor
    */
  constructor(AuthenticationService, $state, UsersModel, $rootScope, TokenModel) {
    // ng-annotate injection

    'ngInject';

    this.AuthenticationService = AuthenticationService;
    this.$state = $state;
    this.UsersModel = UsersModel;
    this.$rootScope = $rootScope;
    this.TokenModel = TokenModel;
    this.$onInit = () => {
      this.getCredit();
      this.watchCredits();
    };
  }

  /**
   * Watches our rootscope for broadcast events when credit is affected or updated
   */
  watchCredits() {
    this.$rootScope.$on('creditUpdate', () => {
      this.getCredit();
    });
  }

  /**
   * Logs the user out
   *
   * @returns {Object} The authentication service logout promise
   */
  logout() {
    return this.AuthenticationService.logout()
      .then(() => {
        this.$state.go('authentication.login');
      })
      .catch(e => {
        // TODO show an error message to the user
        console.error('User was not logged out', e); // eslint-disable-line no-console,angular/log
      });
  }

  /**
   * Loads our credits for the current user
   *
   * @returns {Promise} The request promise
   */
  getCredit() {
    return this.UsersModel.getCredits(this.TokenModel.getCurrentUserId())
      .then(response => {
        this.credits = response;
      }).catch(e => {
        // TODO handle the error here
        console.error(e); // eslint-disable-line no-console,angular/log
      });
  }
}

export default AccountController;
