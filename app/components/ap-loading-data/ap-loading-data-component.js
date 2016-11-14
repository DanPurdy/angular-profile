// =============================================================================
//
//  app/components/ap-loading-data/ap-loading-data-component.js
//
// =============================================================================

import ApLoadingDataController from './ap-loading-data-controller';
import template from './ap-loading-data.html';

const apLoadingDataModule = angular.module('apLoadingDataModule', [])
  .component('apLoadingData', {
    template,
    controller: ApLoadingDataController,
    controllerAs: 'apLoadingDataVm',
    bindings: {
      displayText: '<',
    },
  },
);

export default apLoadingDataModule.name;
