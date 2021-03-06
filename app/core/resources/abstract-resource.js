// ==============================================================================
//
//  app/core/resources/abstract-resource.js
//
//
//
// ==============================================================================

/**
 * Abstract resource class to handle all basic API calls to all routes.
 * This class should never be used directly but all resources should extend
 * from it
 *
 * @class AbstractResource
 */
class AbstractResource {

  /**
   * Constructor class AbstractResource
   *
   * @constructor
   * @param {Object} Restangular - Our Restangular service provider
   * @param {string} route - A string denoting the route to use
   */
  constructor(Restangular, route) {
    'ngInject';

    this.Restangular = Restangular;
    this.route = route;
  }

  /**
   * Basic GET API call
   *
   * @param {number} id - The id of the resource to get
   * @returns {Object} A restangularified element
   */
  get(id) {
    return this.Restangular.one(`${this.route}`, `${id}`).get();
  }

  /**
   * Basic GET API call for a list of resources i.e. no specific id
   *
   * @returns {Object} A restangularified element
   */
  getList() {
    return this.Restangular.all(`${this.route}`).getList();
  }

  /**
   * Basic POST API call
   *
   * @param {*} newResource - The resource to be POST'ed
   * @returns {Object} A restangularified element
   */
  create(newResource) {
    return this.Restangular.all(`${this.route}`)
      .post(newResource);
  }

  /**
   * Basic PUT API call
   *
   * @param {Object} updatedResource - The resource to be updated / PUT
   * @returns {Object} A restangularified element
   */
  update(updatedResource) {
    this.Restangular.restangularizeElement(
      null,
      updatedResource,
      `${this.route}/${updatedResource._id}`,
    );

    return updatedResource.put();
  }

  /**
   * Basic DELETE API call
   *
   * @param {number} id - The id of the resource to be deleted
   * @returns {Object} A restangularified element
   */
  delete(id) {
    return this.Restangular.one(`${this.route}`, `${id}`).remove();
  }
}

export default AbstractResource;
