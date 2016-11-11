// =============================================================================
//
//  app/components/ap-container/ap-container-component.js
//
// =============================================================================

import ApContainerController from './ap-container-controller';

import template from './ap-container.html';

const apContainerModule = angular.module('apContainerModule', [])
  .component('apContainer', {
    template,
    controller: ApContainerController,
    controllerAs: 'apContainerVm',
  },
);

export default apContainerModule.name;
