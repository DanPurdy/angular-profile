// =============================================================================
//
//  app/routes/account/settings/components/settings-container/settings-container-component.js
//
// =============================================================================

// ==============================================================================
//  components
// ==============================================================================

import userDetailsFormModule
  from '../../../../../components/ap-user-details-form/ap-user-details-form-component';

import apLoadingData
  from '../../../../../components/ap-loading-data/ap-loading-data-component';

import apSavingData
  from '../../../../../components/ap-saving-data/ap-saving-data-component';

import SettingsContainerController from './settings-container-controller';

import template from './settings-container.html';

const settingsContainerModule = angular.module('settingsContainerModule', [
  userDetailsFormModule,
  apLoadingData,
  apSavingData,
])
  .component('settingsContainer', {
    template,
    controller: SettingsContainerController,
    controllerAs: 'settingsContainerVm',
    bindings: {
      userId: '<',
    },
  },
);

export default settingsContainerModule.name;
