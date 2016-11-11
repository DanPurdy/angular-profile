// ==============================================================================
//
//  app/core/models/abstract-model.js
//
// ==============================================================================

/**
 * Abstract model class.
 * This class should never be used directly but all models should extend
 * from it
 *
 * @class AbstractModel
 */
class AbstractModel {

  /**
   * Constructor for the AbstractModel class
   *
   * @constructor
   * @param {Object} resource a reference to the required resouce
   */
  constructor(resource) {
    this.item = {};
    this.collection = [];
    this.resource = resource;
  }

  /**
   * Initialises a single resource for our models
   *
   * @param {number} id - The ID of the resource we wish to retrieve
   * @returns {Object} Returns our restangularified element or returns a resolve
   */
  initItem(id) {
    if (id) {
      return this.resource.get(id)
        .then(item => {
          this.item = item;
          return item;
        });
    }
    this.item = {};

    /*
     * Restangular always returns a promise so we mimic that behaviour here
     * for consistency in the event of a missing id
     */
    return Promise.resolve();
  }

  /**
   * Initialses a collection of resources for our models
   *
   * @returns {Object} A restangularified element
   */
  initCollection() {
    return this.resource.getList()
      .then(collection => {
        this.collection = collection;
        return collection;
      });
  }

  /**
   * Get an item from the collection by ID
   *
   * @param {number} id - The ID of the resource we'd like to retrieve
   * @returns {Object} The resource
   */
  getItemById(id) {
    const item = this.collection
      .filter(collectionItem => (
        collectionItem._id === id
      ));

    if (item.length) {
      return item.shift();
    }
    return {};
  }

  /**
   * Get the current item
   *
   * @returns {Object} The resource
   */
  getItem() {
    return this.item;
  }

  /**
   * Set the current item
   *
   * @param {Object} item - The item we wish to set
   */
  setItem(item) {
    this.item = item;
  }

  /**
   * Get the current collection
   *
   * @returns {Array} The array of resources
   */
  getCollection() {
    return this.collection;
  }

  /**
   * Set the current collection
   *
   * @param {Array} collection - An array of resources
   */
  setCollection(collection) {
    this.collection = collection;
  }

  /**
   * Handles the calling of our POST/PUT endpoints for an item
   *
   * @param {Object} item - The item we wish to save
   * @returns {Object} A restangular promise
   */
  save(item) {
    if (item._id) {
      return this.resource.update(item)
        .then(() => {
          let recordIndex = -1;
          const record = this.collection.filter((singleRecord, index) => {
            if (singleRecord._id === item._id) {
              recordIndex = index;
              return true;
            }
            return false;
          }).shift();

          if (angular.isDefined(record) && recordIndex !== -1) {
            Object.assign(this.collection[recordIndex], item);
          } else {
            this.collection.push(item);
          }
          return Promise.resolve(item);
        },
      );
    }
    return this.resource.create(item)
      .then(response => {
        this.item = response;
        this.collection.push(response);
        return Promise.resolve(this.item);
      });
  }

  /**
   * Handles the deletion of a resource
   *
   * @param {Object} item - The item we are looking to delete
   * @returns {Object} A promise
   */
  delete(item) {
    return this.resource.delete(item._id).then(() => {
      this.collection.splice(this.collection.indexOf(item), 1);
    });
  }

  /**
   * Call our resource search method
   *
   * @param {Object} terms - The terms to search by
   * @returns {Promise} The search promise
   */
  search(terms) {
    return this.resource.search(terms);
  }
}

export default AbstractModel;
