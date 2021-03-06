// =============================================================================
//
//  app/routes/authentication/login/components/login-form-container/
//  login-form-container-controller.js
//
// =============================================================================

/**
 * LoginFormContainerController class handles our interaction with the login container component
 *
 * @class LoginFormContainerController
 */
class LoginFormContainerController {

  /**
   * Constructor for the LoginFormContainerController class
   *
   * @constructor
   * @param {Object} FormService - Our Form service to handle all form interactions
   * @param {Object} AuthenticationService - Our Authentication service to handle authentication
   * @param {Object} $state - UI Router state provider
   * @param {Object} UsersModel - The Users model
   */
  constructor(FormService, AuthenticationService, $state, UsersModel) {
    'ngInject';

    this.FormService = FormService;
    this.AuthenticationService = AuthenticationService;
    this.$state = $state;
    this.UsersModel = UsersModel;
    this.result = null;
    this.isSubmitting = false;
    this.credentials = {};
  }

  /**
   * Calls our authentication service to handle the login actions, this method is called from its
   * child component via an output binding
   *
   * @param  {string} valid - Whether the form is deemed valid or not
   * @param  {Object} form - The passed in form object/controller
   * @param  {Object} credentials - The supplied credentials
   * @returns {Promise} The login promise
   */
  login(valid, form, credentials) {
    if (!valid) {
      return false;
    }
    this.credentials = credentials;
    this.isSubmitting = true;
    this.result = null;
    return this.AuthenticationService.login(this.credentials)
      .then(() => {
        this.FormService.onSuccess(this);
        this.isSubmitting = false;
        this.$state.go('angularProfile.account.settings');
      }).catch(response => {
        this.FormService.onFailure(this, response);
        this.isSubmitting = false;
        form.$setPristine();
      });
  }
}

export default LoginFormContainerController;
