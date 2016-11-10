// =============================================================================
//
//  app/routes/authentication/register/components/register-form-container/
//  register-form-container-component.js
//
// =============================================================================
import ApUserRegForm from '../../../../../components/ap-user-register/ap-user-register-component';
import ApRegisterFormContainerController from './register-form-container-controller';
import template from './register-form-container.html';

const apRegisterFormContainerModule = angular.module('apRegisterFormContainerModule',
  [
    ApUserRegForm,
  ])
  .component('apRegisterFormContainer', {
    template,
    controller: ApRegisterFormContainerController,
    controllerAs: 'apRegisterFormContainerVm',
    bindings: {},
  },
);

export default apRegisterFormContainerModule.name;
