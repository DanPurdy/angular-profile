// =============================================================================
//
//  app/routes/authentication/register/components/register-form-complete/
//  register-form-complete-component.js
//
// =============================================================================

import AlrRegisterFormCompleteController from './register-form-complete-controller';
import template from './register-form-complete.html';

const alrRegisterFormCompleteModule = angular.module('alrRegisterFormCompleteModule', [])
  .component('alrRegisterFormComplete', {
    template,
    controller: AlrRegisterFormCompleteController,
    controllerAs: 'alrRegisterFormCompleteVm',
    bindings: {},
  },
);

export default alrRegisterFormCompleteModule.name;
