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
    this.dummyPass = 'dummyP4ss';
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
        this.dummyUser = this.setupDummyUser();
      })
      .catch(e => {
        console.error(e); // eslint-disable-line no-console,angular/log
      });
  }


  /**
   * Make a copy of our user object for comparison later on when updating
   *
   * @returns {Object} A copy of the current user
   */
  setupDummyUser() {
    const tempUser = Object.assign({}, this.user);
    tempUser.password = this.dummyPass;
    return tempUser;
  }


  /**
   * Compare our new user object and the current user object and act accordingly
   *
   * @param  {Object} user - The updated user Object
   * @returns {Object} The updated user
   */
  compareUsers(user) {
    const newUser = Object.assign({}, user);
    if (newUser.password === this.dummyPass) {
      delete (newUser.password);
    }
    return Object.assign({}, this.user, newUser);
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

    return this.UsersModel.save(this.compareUsers(user))
      .then(response => {
        this.UserService.onUpdateSuccess(this);
        this.AuthenticationService.updateCurrentUser(user);
        this.user = response;
        this.dummyUser = this.setupDummyUser();
        self.isSubmitting = false; // eslint-disable-line no-param-reassign
        form.$setPristine();
      }).catch(e => {
        this.UserService.onUpdateFailure(this, e);
        this.dummyUser = this.setupDummyUser(); // reset our user to the old state
        self.isSubmitting = false; // eslint-disable-line no-param-reassign
        form.$setPristine();
        console.error('update user', e); // eslint-disable-line no-console,angular/log
      });
  }
}

export default SettingsContainerController;
