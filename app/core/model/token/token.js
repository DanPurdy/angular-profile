// ==============================================================================
//
//  app/core/model/token/token.js
//
// ==============================================================================

/**
 * TokenModel class handles all interactions with our access token
 * @class TokenModel
 */
class TokenModel {

  /**
   * Constructor function for our TokenModel class
   *
   * @constructor
   * @param {Object} store - Angular store service provider
   * @param {Object} jwtHelper - The JWT Helper service
   * @param {Object} UsersResource - Our UsersResource
   */
  constructor(store, jwtHelper, UsersResource) {
    'ngInject';

    this.store = store;
    this.jwtHelper = jwtHelper;
    this.UsersResource = UsersResource;
    this.cachedCurrentUser = null;
    this.cachedToken = null;
    this.decoded = null;
    this.userStore = 'user';
    this.tokenStore = 'token';
  }

  /**
   * sets our access token and stores it
   *
   * @param {string} token The access token
   * @returns {Object} A Restangular promise
   */
  set(token) {
    this.decoded = this.jwtHelper.decodeToken(token);
    this.user = this.decoded.user;
    this.cachedToken = token;
    this.store.set(this.tokenStore, token);
    this.cachedCurrentUser = this.user;
    this.store.set(this.userStore, this.user);
    return Promise.resolve(this.user);
  }

  /**
   * Unsets our access token
   */
  unset() {
    this.cachedToken = null;
    this.cachedCurrentUser = null;
    this.store.remove(this.tokenStore);
    this.store.remove(this.userStore);
  }

  /**
   * Returns the current cached JWT token
   *
   * @returns {string} The JWT token
   */
  get() {
    if (!this.cachedToken) {
      this.cachedToken = this.store.get(this.tokenStore);
    }
    return this.cachedToken;
  }

  /**
   * Returns the current User object
   *
   * @returns {Object} The current user object
   */
  getCurrentUser() {
    return this.cachedCurrentUser || this.store.get(this.userStore) || {};
  }

  /**
   * Returns the current User ID
   *
   * @returns {number} The current user ID
   */
  getCurrentUserId() {
    return this.getCurrentUser().id;
  }

  /**
   * Gets our current user from the API and sets our cached user and local storage
   * user to the new object
   *
   * @param {string} userId - The user ID
   * @returns {Object} A promise
   */
  updateCurrentUser(userId) {
    return this.UsersResource.get(userId)
      .then(user => {
        this.cachedCurrentUser = user;
        this.store.set(this.userStore, user);
        return user;
      });
  }


  /**
   * Convenience method to check if our token has expired
   *
   * @returns {boolean} Whether our token is expired
   */
  isExpired() {
    if (this.get() !== null) {
      return this.jwtHelper.isTokenExpired(this.get());
    }
    // TODO check this is still valid once auth is complete
    return false;
  }
}

export default TokenModel;
