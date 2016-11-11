// =============================================================================
//
//  app/components/ap-header/ap-header-component.js
//
// =============================================================================

import ApHeaderController from './ap-header-controller';
import apAccountHeaderModule from './components/ap-account-header/ap-account-header-component';

import template from './ap-header.html';

const apHeaderModule = angular.module('apHeaderModule', [
  apAccountHeaderModule,
])
  .component('apHeader', {
    template,
    controller: ApHeaderController,
    controllerAs: 'apHeaderVm',
    bindings: {
      logout: '&',
    },
  },
);

export default apHeaderModule.name;
