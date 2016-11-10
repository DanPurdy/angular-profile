// ==============================================================================
//
//  app/core/services/form.js
//
// ==============================================================================

/**
 * FormService class handles all user form services
 *
 * @class FormService
 */
class FormService {

  /**
   * Constructor function for our FormService class
   *
   * @constructor
   */
  constructor() {
    'ngInject';
  }

  /**
   * onSuccess handles our succesful form POST's
   *
   * @param {Object} self a reference to 'this' from the model using this service
   */
  onSuccess(self) {
    /* eslint-disable no-param-reassign */
    self.result = 'success';
    self.hasError = false;
    /* eslint-enable */
  }

  /**
   * onFailure handles our unsuccesful form POST's
   *
   * @param {Object} self - A reference to 'this' from the model using this service
   * @param {Object} response - The response received from the unsuccesful POST
   */
  onFailure(self, response) {
    /* eslint-disable no-param-reassign */
    self.result = 'error';
    self.hasError = true;
    if (response.status === 400) {
      self.errorMessage = response.data.message;
    } else if (response.status === 401) {
      self.errorMessage = 'Wrong email or password.';
    } else if (response.status === 404) {
      self.errorMessage = 'The requested record could not be found.';
    } else if (response.status === 409 && response.config.method === 'PUT') {
      self.errorMessage = 'Another user has updated this record while you were editing.';
      self.errorMessage += ' Please reload the page and try again.';
    } else if (response.status === 409 && response.config.method === 'POST') {
      self.errorMessage = 'This record already exists.';
    } else if (response.status === 503) {
      self.errorMessage = 'The service went down. Please try again later.';
    } else {
      self.errorMessage = 'Something went wrong. Please contact the site administrator.';
    }
    /* eslint-enable */
  }

  /**
   * When a form is saved we run it through our Form service to handle all
   * successful and unsuccesful POST's
   *
   * @param {Object} model - A reference to the model handling this forms request
   * @param {Object} item - The item we are trying to save (form data)
   * @param {Object} self - A reference to 'this' from the model using this service
   * @param {Object} form - The angular object of the form used to enter this data
   * @returns {Object} A promise
   */
  save(model, item, self, form) {
    return model.save(item).then(response => {
      this.onSuccess(self);
      return response;
    }, response => {
      this.onFailure(self, response);
      return Promise.reject(response);
    }).finally(() => {
      self.isSubmitting = false; // eslint-disable-line no-param-reassign
      form.$setPristine();
    });
  }
}

export default FormService;
