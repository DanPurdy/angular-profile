// ==============================================================================
//
//  app/routes/authentication/register/components/register-form-container/
//  register-form-container-controller.js
//
// ==============================================================================

/**
 * ApRegisterFormContainerController class handles our interaction with the user register component
 *
 * @class ApRegisterFormContainerController
 */
class ApRegisterFormContainerController {

  /**
   * Constructor for the ApRegisterFormContainerController class
   *
   * @constructor
   * @param {Object} UsersModel - Our users model to handle all user API actions
   * @param {Object} FormService - Our Form service to handle all form interactions
   * @param {Object} $state - UI Router state provider
   */
  constructor(UsersModel, FormService, $state) {
    'ngInject';

    this.UsersModel = UsersModel;
    this.FormService = FormService;
    this.$state = $state;
    this.result = null;
    this.isSubmitting = false;
  }

  /**
   * Calls our users model to handle the registration actions,
   * this method is called from its child component via an output binding ('&')
   *
   * @param  {string} valid - Whether the form is deemed valid or not
   * @param  {Object} form - The passed in form object/controller
   * @param  {Object} registration - The supplied registration object
   * @returns {Promise} The registration promise
   */
  register(valid, form, registration) {
    if (!valid) {
      return false;
    }
    this.registration = registration;
    this.isSubmitting = true;
    this.result = null;
    return this.FormService.register(this.UsersModel, this.registration, this, form)
      .then(data => {
        this.data = data;
        // TODO add this completion route
        // this.$state.go('authentication.register.complete', { id: data.id });
      },
    );
  }
}

export default ApRegisterFormContainerController;
