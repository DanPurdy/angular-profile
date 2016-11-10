// =============================================================================
//
//  app/routes/authentication/register/components/register-form-container/
//  register-form-container-component.js
//
// =============================================================================
import AlrUserRegForm from '../../../../../components/ap-user-register/ap-user-register-component';
import AlrRegisterFormContainerController from './register-form-container-controller';
import template from './register-form-container.html';

const alrRegisterFormContainerModule = angular.module('alrRegisterFormContainerModule',
  [
    AlrUserRegForm,
  ])
  .component('alrRegisterFormContainer', {
    template,
    controller: AlrRegisterFormContainerController,
    controllerAs: 'alrRegisterFormContainerVm',
    bindings: {},
  },
);

export default alrRegisterFormContainerModule.name;
