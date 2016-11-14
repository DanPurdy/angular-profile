// =============================================================================
//
//  app/components/ap-saving-data/ap-saving-data-component.js
//
// =============================================================================

import ApSavingDataController from './ap-saving-data-controller';
import template from './ap-saving-data.html';

const apSavingDataModule = angular.module('apSavingDataModule', [])
  .component('apSavingData', {
    template,
    controller: ApSavingDataController,
    controllerAs: 'apSavingDataVm',
    bindings: {
      displayText: '<',
    },
  },
);

export default apSavingDataModule.name;
