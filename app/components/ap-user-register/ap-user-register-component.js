// =============================================================================
//
//  app/components/ap-user-register/ap-user-register-component.js
//
// =============================================================================

import apUserRegisterController from './ap-user-register-controller';
import template from './ap-user-register.html';

import passwordValidator from '../ap-password-validator/ap-password-validator';
import passwordMatcher from '../ap-password-matcher/ap-password-matcher';
import emailValidator from '../ap-email-valid/ap-email-valid';
import userCheck from '../ap-user-check/ap-user-check';

const apUserRegisterModule = angular.module('apUserRegisterModule',
  [
    passwordValidator,
    passwordMatcher,
    emailValidator,
    userCheck,
  ])
  .component('apUserRegister', {
    template,
    controller: apUserRegisterController,
    controllerAs: 'apUserRegisterVm',
    transclude: true,
    bindings: {
      isSubmitting: '<',
      result: '<',
      onRegister: '&',
    },
  },
);

export default apUserRegisterModule.name;
