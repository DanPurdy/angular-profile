// =============================================================================
//
//  app/routes/account/settings/components/settings-container/settings-container-controller.js
//
// =============================================================================

/**
 * SettingsContainerController class handles our interaction with the settings container
 * component
 *
 * @class SettingsContainerController
 */
class SettingsContainerController {

  /**
   * Constructor for the SettingsContainerController class
   *
   * @constructor
   * @param {Object} AuthenticationService - Our authentication service
   * @param {Object} UsersModel - Our users model
   * @param {Object} UserService - Our users service
   * @param {Object} $state - Our ui router state provider
   * @param {Object} $scope - The current scope
   */
  constructor(
    AuthenticationService,
    UsersModel,
    UserService,
    $state,
    $scope,
  ) {
    // ng-annotate injection

    'ngInject';

    this.AuthenticationService = AuthenticationService;
    this.UsersModel = UsersModel;
    this.UserService = UserService;
    this.$state = $state;
    this.$scope = $scope;
    this.isLoading = true;
    this.user = null;
    this.result = null;
    this.isSubmitting = false;
    this.$onInit = this.getUserDetails;
  }

  /**
   * Returns the current user details
   *
   * @param {number} id - The ID of the user to load
   * @returns {Promise} The request Promise
   */
  getUserDetails() {
    return Promise.resolve(this.AuthenticationService.getCurrentUser())
      .then(response => {
        this.isLoading = false;
        this.user = response;
        this.$scope.$apply();
      })
      .catch(e => {
        console.error(e); // eslint-disable-line no-console,angular/log
      });
  }

  /**
   * Handles the updating of a user
   *
   * @param {boolean} valid - Whether the form is valid or not
   * @param {Object} form - The supplied form
   * @param {Object} user - The supplied user object
   * @returns {Promise} The request promise
   */
  onSave(valid, form, user) {
    if (!valid) {
      return false;
    }
    this.isSubmitting = true;
    this.result = null;

    return this.UsersModel.save(user)
      .then(response => {
        this.UserService.onUpdateSuccess(this);
        this.user = response;
        self.isSubmitting = false; // eslint-disable-line no-param-reassign
        form.$setPristine();
      }).catch(e => {
        this.UserService.onUpdateFailure(this, e);
        self.isSubmitting = false; // eslint-disable-line no-param-reassign
        form.$setPristine();
        console.error('update user', e); // eslint-disable-line no-console,angular/log
      });
  }
}

export default SettingsContainerController;
