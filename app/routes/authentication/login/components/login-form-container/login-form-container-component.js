// =============================================================================
//
//  app/routes/authentication/login/components/login-form-container/
//  login-form-container-component.js
//
// =============================================================================
import ApLoginModule from '../../../../../components/ap-login/ap-login-component';
import ApLoginFormContainerController from './login-form-container-controller';
import template from './login-form-container.html';

const apLoginFormContainerModule = angular.module('apLoginFormContainerModule', [ApLoginModule])
  .component('apLoginFormContainer', {
    template,
    controller: ApLoginFormContainerController,
    controllerAs: 'apLoginFormContainerVm',
    bindings: {
      loggedOut: '<',
      registeredUser: '<',
    },
  },
);

export default apLoginFormContainerModule.name;
