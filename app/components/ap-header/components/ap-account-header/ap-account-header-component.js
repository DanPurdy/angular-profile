// =============================================================================
//
//  app/components/ap-header/components/ap-account-header/ap-account-header-component.js
//
// =============================================================================

import ApAccountHeaderController from './ap-account-header-controller';

import template from './ap-account-header.html';

const apAccountHeaderModule = angular.module('apAccountHeaderModule', [])
  .component('apAccountHeader', {
    template,
    controller: ApAccountHeaderController,
    controllerAs: 'apAccountHeaderVm',
    bindings: {
      apUser: '<',
      logout: '&',
    },
  },
);

export default apAccountHeaderModule.name;
