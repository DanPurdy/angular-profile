// =============================================================================
//
//  app/components/ap-user-details-form/ap-user-details-form-component.js
//
// =============================================================================

import ApUserDetailsFormController from './ap-user-details-form-controller';
import passwordValidator from '../ap-password-validator/ap-password-validator';
import passwordMatcher from '../ap-password-matcher/ap-password-matcher';
import emailValidator from '../ap-email-valid/ap-email-valid';

import template from './ap-user-details-form.html';

const apUserDetailsFormModule = angular.module('apUserDetailsFormModule', [
  passwordValidator,
  passwordMatcher,
  emailValidator,
])
  .component('apUserDetailsForm', {
    template,
    controller: ApUserDetailsFormController,
    controllerAs: 'apUserDetailsFormVm',
    transclude: true,
    bindings: {
      isSubmitting: '<',
      result: '<',
      onSave: '&',
      user: '<',
    },
  },
);

export default apUserDetailsFormModule.name;
