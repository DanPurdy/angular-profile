// ==============================================================================
//
//  app/core/services/authentication.js
//
// ==============================================================================

import { ACCESS_LEVELS } from '../../constants/constants';

/**
 * AuthenticationService class handles all user authentication services
 * @class AuthenticationService
 */
class AuthenticationService {

  /**
   * Constructor function for our AuthenticationService class
   *
   * @constructor
   * @param {Object} AuthenticationResource - Instance of our AuthenticationResource provider for
   * REST api calls
   * @param {Object} TokenModel - Instance of our TokenModel provider
   * @param {Object} $rootScope - The root scope of our app
   */
  constructor(AuthenticationResource, TokenModel, $rootScope) {
    'ngInject';

    this.AuthenticationResource = AuthenticationResource;
    this.TokenModel = TokenModel;
    this.$rootScope = $rootScope;
  }

  /**
   * Login service functionality
   * Handles user authentication and passes this through to our AuthenticationResource and
   * TokenModel
   *
   * @param {Object} credentials - The user credentials
   * @returns {Object} The authentication promise
   */
  login(credentials) {
    return this.AuthenticationResource.login(credentials).then(response => {
      this.$rootScope.$emit('loggedIn');
      return this.TokenModel.set(response.token);
    });
  }

  /**
   * Logout service functionality, handles user authentication and passes this through to our
   * TokenModel
   */
  logout() {
    this.TokenModel.unset();
    this.$rootScope.currentUser = {};
    this.$rootScope.$emit('loggedOut');
  }

  /**
   * Determines whether our user has the sufficient roles against a routes access array
   *
   * @param {Array} accessLevels - The routes access levels
   * @returns {boolean} Whether this user is authorized or not
   */
  isAuthorized(accessLevels) {
    if (accessLevels.indexOf('*') !== -1) {
      return true;
    }
    const user = this.getCurrentUser();
    const role = user.role || '';
    const permitted = this.checkPermitted(accessLevels, role);

    if (!this.isExpired()) {
      return this.isAuthenticated() && permitted;
    }

    return false;
  }

  /**
   * Returns a boolean on whether we can retrieve a user token or not
   *
   * @returns {boolean} A boolean to indicate if a token exists for this user
   */
  isAuthenticated() {
    return !!this.TokenModel.get();
  }

  /**
   * Checks to see if our token is expired and whether therefore the user
   * needs to either refresh their token or login again
   *
   * @returns {boolean} Whether our token has expired or not
   */
  isExpired() {
    return this.TokenModel.isExpired();
  }

  /**
   * Checks the users roles array against a routes valid levels
   * returns a boolean whether the user access levels meets the routes
   *
   * @param {Array} access - The routes access levels
   * @param {string} role - The current users role
   * @returns {boolean} Whether this role passes the access check
   */
  checkPermitted(access, role) {
    return access.indexOf(role) !== -1;
  }

  /**
   * Returns the current user from the token model
   *
   * @returns {Object} the current user
   */
  getCurrentUser() {
    return this.TokenModel.getCurrentUser();
  }

  /**
   * Checks if our current user is the same as the user object being passed
   *
   * @param {Object} user - A user object
   * @returns {boolean} Whether the user object is the same user as the current user
   */
  isCurrentUser(user) {
    return user.id === this.getCurrentUser().id;
  }

  /**
   * Updates our current user and sets the cached user in the token model
   *
   * @param  {Object} user - Our updated user object
   * @returns {Object} A promise object
   */
  updateCurrentUser(user = this.TokenModel.getCurrentUser()) {
    return this.TokenModel.updateCurrentUser(user.id)
      .then(updatedUser => {
        this.$rootScope.currentUser = updatedUser;
      });
  }

  /**
   * Checks if the current user is of the role admin or above
   *
   * @returns {boolean} Whether the user is an admin or not
   */
  isAdmin() {
    return ACCESS_LEVELS.admin.indexOf(this.getCurrentUser().role) !== -1;
  }
}

export default AuthenticationService;
