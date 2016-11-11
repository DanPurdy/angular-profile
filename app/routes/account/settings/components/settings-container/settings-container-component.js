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

// import apLoadingData
//   from '../../../../../components/ap-loading-data/ap-loading-data-component';

import SettingsContainerController from './settings-container-controller';

import template from './settings-container.html';

const settingsContainerModule = angular.module('settingsContainerModule', [
  userDetailsFormModule,
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
