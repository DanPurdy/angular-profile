// =============================================================================
//
//  app/components/ap-user-details-form/ap-user-details-form-component.js
//
// =============================================================================

import ApUserDetailsFormController from './ap-user-details-form-controller';

import template from './ap-user-details-form.html';

const apUserDetailsFormModule = angular.module('apUserDetailsFormModule', [])
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
