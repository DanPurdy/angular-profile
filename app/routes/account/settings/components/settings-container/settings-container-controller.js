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
   * @param {Object} FormService - Our form service
   * @param {Object} TokenModel - Our token model
   * @param {Object} $state - Our ui router state provider
   * @param {Object} $scope - The current scope provider
   */
  constructor(
    AuthenticationService,
    UsersModel,
    UserService,
    FormService,
    TokenModel,
    $state,
    $scope,
  ) {
    // ng-annotate injection

    'ngInject';

    this.AuthenticationService = AuthenticationService;
    this.UsersModel = UsersModel;
    this.UserService = UserService;
    this.FormService = FormService;
    this.TokenModel = TokenModel;
    this.$state = $state;
    this.$scope = $scope;
    this.isLoading = true;
    this.user = null;
    this.result = null;
    this.isSubmitting = false;
    this.buttonOpts = angular.copy(this.FormService.getUpdateButtonOptions());
    this.parentUser = this.TokenModel.getCurrentUserId();
    this.activeUser = this.userId || this.parentUser;
    this.onInit(this.activeUser);
  }

  /**
   * Initialises our controller
   *
   * @param {number} id - The ID of the user to load
   * @returns {Promise} The request promise
   */
  onInit(id) {
    return this.UsersModel.getChildren(this.parentUser)
      .then(response => {
        this.getUserDetails(id);
        this.userAccounts = this.UserService.formatAccountList(response);
      },
    );
  }

  /**
   * Returns the current user details
   *
   * @param {number} id - The ID of the user to load
   * @returns {Promise} The request Promise
   */
  getUserDetails(id) {
    if (id !== this.parentUser) {
      return this.UsersModel.initItem(id)
        .then(response => {
          this.isLoading = false;
          this.user = response;
        })
        .catch(e => {
          this.isLoading = false;
          // TODO handle this error with a message
          console.error(e); // eslint-disable-line no-console,angular/log
          this.user = null;
        });
    }
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
    return this.UserService.update(user, this, form)
      .then(() => {
        this.user = user;
      },
    );
  }

  /**
   * Handles the setting of which user we wish to view the details of
   *
   * @param {number} userId - The ID of the user whose settings we wish to view
   */
  setActiveUser(userId) {
    if (userId === this.parentUser) {
      this.$state.go('angularProfile.account.settings');
    } else {
      this.$state.go('angularProfile.account.child', { userId });
    }
  }
}

export default SettingsContainerController;
