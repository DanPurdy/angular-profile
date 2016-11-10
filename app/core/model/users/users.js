// ==============================================================================
//
//  app/core/model/users/users.js
//
// ==============================================================================

import AbstractModel from '../abstract-model';

/**
 * UsersModel class to handle and store our current user model
 *
 * @class UsersModel
 */
class UsersModel extends AbstractModel {

  /**
   * Constructor for the UsersModel class
   *
   * @constructor
   * @param {Object} UsersResource The users resource
   */
  constructor(UsersResource) {
    'ngInject';

    super(UsersResource);
  }

  /**
   * Handles requests to verify if a username or password is available.
   *
   * @param {string} parameter - The type of value to be checked
   * @param {string} value - The value to be checked
   * @returns {Promise} The promise returned from our user resource
   */
  checkAvailability(parameter = 'username', value) {
    return this.resource.checkAvailability({
      parameter,
      value,
    });
  }

  /**
   * Handles a new user (public) registration
   *
   * @param {Object} registration - A new registration
   * @returns {Promise} A thenable promise
   */
  register(registration) {
    return this.resource.register(registration)
      .then(response => {
        if (response) {
          this.item = response;
          return this.item;
        }
        return Promise.reject('Empty Response');
      });
  }

  /**
   * Handles the resetting of a password
   *
   * @param {Object} credentials - The credentials submitted
   * @param {Object} token - The password reset token
   * @returns {Promise} The request promise
   */
  updatePassword(credentials, token) {
    return this.resource.updatePassword(credentials, token);
  }
}

// export as an angular module
export default UsersModel;
