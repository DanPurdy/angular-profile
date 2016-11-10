// ==============================================================================
//
//  app/core/services/user/user.js
//
// ==============================================================================

/**
 * UserService class handles all user interaction services
 * @class UserService
 */
class UserService {

  /**
   * Constructor function for our UserService class
   *
   * @constructor
   * @param {Object} UsersModel - Our user model
   * @param {Object} TokenModel - Our token model
   * @param {Object} AuthenticationService - Our authentication service
   */
  constructor(UsersModel, TokenModel, AuthenticationService) {
    'ngInject';

    this.UsersModel = UsersModel;
    this.TokenModel = TokenModel;
    this.AuthenticationService = AuthenticationService;
  }

  /**
   * Check the validity of a value by handing it to the users model
   *
   * @param {string} parameter - The parameter of the value to be checked
   * @param {string} value - The value to be checked
   * @returns {Promise} The promise return from the user model
   */
  checkAvailability(parameter, value) {
    return this.UsersModel.checkAvailability(parameter, value);
  }

  /**
   * Sets our success message and identifier on request success
   *
   * @param {Object} self - A reference to the provided this value
   */
  onUpdateSuccess(self) {
    /* eslint-disable no-param-reassign */
    self.result = 'success';
    self.hasError = false;
    /* eslint-enable */
  }

  /**
   * Handles the failure and error message handling when a request to update a users details fails.
   *
   * @param {Object} self - A reference to the controllers this value
   * @param {Object} response - The response received from the API
   */
  onUpdateFailure(self, response) {
    /* eslint-disable no-param-reassign */
    self.result = 'error';
    self.hasError = true;

    switch (response.status) {
      case 400:
        self.errorMessage = response.data.message;
        break;
      case 403:
        self.errorMessage = 'The password you supplied was incorrect';
        break;
      case 404:
        self.errorMessage = 'The user ID provided could not be found';
        break;
      case 422:
        self.errorMessage = 'Sorry! Your details were not updated.';
        break;
      default:
        self.errorMessage = 'Something went wrong. Please contact the site administrator.';
    }
    /* eslint-enable */
  }
}

export default UserService;
