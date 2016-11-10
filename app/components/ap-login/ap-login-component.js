// =============================================================================
//
//  app/components/ap-login/ap-login-component.js
//
// =============================================================================

import ApLoginController from './ap-login-controller';

import template from './ap-login.html';

const ApLoginModule = angular.module('apLoginModule', [])
  .component('apLogin', {
    template,
    controller: ApLoginController,
    controllerAs: 'ApLoginVm',
    transclude: true,
    bindings: {
      isSubmitting: '<',
      result: '<',
      onLogin: '&',
    },
  },
);

export default ApLoginModule.name;
