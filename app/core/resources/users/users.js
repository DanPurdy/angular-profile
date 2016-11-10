// ==============================================================================
//
//  app/core/resources/users/users.js
//
//
//
// ==============================================================================

// All standard resources should extend from our abstract resource
import AbstractResource from '../abstract-resource';

/**
 * UsersResource class to handle all API calls with regards to user
 *
 * @class UsersResource
 */
class UsersResource extends AbstractResource {

  /**
   * Constructor class UsersResource
   *
   * @constructor
   * @param {Object} Restangular our Restangular service provider
   */
  constructor(Restangular) {
    'ngInject';

    super(Restangular, 'users');
    this.checkRoute = '/check';
    this.registerRoute = '/register';
    this.validateRoute = '/activate';
    this.resetRoute = '/resetting';
    this.resetRequestRoute = `${this.resetRoute}/request`;
    this.resetUpdateRoute = `${this.resetRoute}/reset`;
    this.childRoute = '/children';
    this.inviteRoute = '/invite';
    this.inviteRemoveRoute = '/invites';
    this.registrationsRoute = '/registrations';
    this.searchCasesRoute = '/search-cases';
    this.paymentsRoute = '/payments';
    this.creditsRoute = '/credits';
    this.paymentFormRoute = '/payment-form-details';
  }

  /**
   * POST request to our user availability check endpoint
   *
   * @param {Object} terms - The terms we wish to post to the API
   * @returns {Promise} The Restangular request
   */
  checkAvailability(terms) {
    return this.Restangular
      .all(`${this.route}`)
      .all(`${this.checkRoute}`)
      .post(terms);
  }

  /**
   * Post our users access verification token to the server for verification
   *
   * @param {string} token - The users account verification token
   * @returns {Promise} Our request promise
   */
  validateToken(token) {
    return this.Restangular
      .all(`${this.route}`)
      .all(`${this.validateRoute}/${token}`)
      .post();
  }

  /**
   * Handles any public user registration actions
   *
   * @param {Object} newResource - The registration object
   * @returns {Promise} A Restangular promise
   */
  register(newResource) {
    return this.Restangular
      .all(`${this.route}`)
      .all(`${this.registerRoute}`)
      .post(newResource);
  }

  /**
   * Handles the user request to reset their password
   *
   * @param {Object} credentials - The email address of the requested reset
   * @returns {Promise} A Restangular promise
   */
  requestReset(credentials) {
    return this.Restangular
      .all(`${this.route}`)
      .all(`${this.resetRequestRoute}`)
      .post(credentials);
  }

  /**
   * Handles the user request to update their password from a reset request
   *
   * @param {Object} credentials - The new password
   * @param {string} token - The reset token
   * @returns {Promise} A Restangular promise
   */
  updatePassword(credentials, token) {
    return this.Restangular
      .all(`${this.route}`)
      .all(`${this.resetUpdateRoute}/${token}`)
      .post(credentials);
  }

  /**
   * Sends an invite POST request
   *
   * @param {string} email - The email address to send an invite to
   * @param {number} userId - The current users ID
   * @returns {Promise} A Restangular promise
   */
  invite(email, userId) {
    return this.Restangular
      .one(`${this.route}`, userId)
      .all(`${this.childRoute}${this.inviteRoute}`)
      .post({ email });
  }

  /**
   * Sends an invite GET request to see all pending child requests
   *
   * @param {number} userId - The current users ID
   * @returns {Promise} A Restangular promise
   */
  getPendingInvites(userId) {
    return this.Restangular
      .one(`${this.route}`, userId)
      .all(`${this.childRoute}${this.inviteRoute}`)
      .getList();
  }

  /**
   * Sends a boolean response to the invite accept/reject endpoint
   *
   * @param {Object} response - The response object to POST
   * @param {number} userId - The user ID that received the request
   * @returns {Promise} A Restangular promise
   */
  inviteRespond(response, userId) {
    return this.Restangular
      .one(`${this.route}`, userId)
      .all(`${this.childRoute}`)
      .post(response);
  }

  /**
   * Gets a users linked accounts / child accounts
   *
   * @param {number} userId - The user ID that received the request
   * @returns {Promise} A Restangular promise
   */
  getChildren(userId) {
    return this.Restangular
      .one(`${this.route}`, userId)
      .all(`${this.childRoute}`)
      .getList();
  }

  /**
   * Removes a linked account from the specified users linked accounts
   *
   * @param {number} userId - The user ID that received the request
   * @param {number} childId - The child ID to be removed
   * @returns {Promise} A Restangular promise
   */
  removeChild(userId, childId) {
    return this.Restangular
      .one(`${this.route}`, userId)
      .one(`${this.childRoute}`, childId)
      .remove();
  }

  /**
   * Cancels a pending account/child link request
   *
   * @param {number} inviteId - The invite to be cancelled
   * @returns {Promise} A Restangular promise
   */
  removeInvite(inviteId) {
    return this.Restangular
      .one(`${this.inviteRemoveRoute}`, inviteId)
      .remove();
  }

  /**
   * Gets a users registrations
   *
   * @param {number} userId - The user id whose registrations we wish to load
   * @returns {Promise} A Restangular promise
   */
  getRegistrations(userId) {
    return this.Restangular
      .one(`${this.route}`, userId)
      .all(`${this.registrationsRoute}`)
      .getList();
  }

  /**
   * Gets a users search cases
   *
   * @param {number} userId - The user id whose search cases we wish to load
   * @returns {Promise} A Restangular promise
   */
  getSearchCases(userId) {
    return this.Restangular
      .one(`${this.route}`, userId)
      .all(`${this.searchCasesRoute}`)
      .getList();
  }

  /**
   * Gets a users payments
   *
   * @param {number} userId - The user id whose payments we wish to load
   * @returns {Promise} A Restangular promise
   */
  getPayments(userId) {
    return this.Restangular
      .one(`${this.route}`, userId)
      .all(`${this.paymentsRoute}`)
      .getList();
  }

  /**
   * Gets a users list of credits
   *
   * @param {number} userId - The user ID whose credits we wish to load
   * @returns {Promise} A Restangular promise
   */
  getCredits(userId) {
    return this.Restangular
      .one(`${this.route}`, userId)
      .all(`${this.creditsRoute}`)
      .getList();
  }

  /**
   * Get the current payment form for the user
   *
   * @param {number} userId - The user ID whose payment form we wish to load
   * @param {number} currency - The user selectred currency to pay with
   * @returns {Promise} A Restangular promise
   */
  getPaymentForm(userId, currency) {
    return this.Restangular
      .one(`${this.route}`, userId)
      .all(`${this.paymentFormRoute}`)
      .post(currency)
      .then(response => (
        // stripRestangular alias see https://github.com/mgonto/restangular#element-methods
        Promise.resolve(response.plain())
      ));
  }
}

// export as an angular module
export default UsersResource;
