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
}

// export as an angular module
export default UsersResource;
