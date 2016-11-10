// =============================================================================
//
//  app/routes/account/settings/components/settings-container/settings-container-component.js
//
// =============================================================================

// ==============================================================================
//  components
// ==============================================================================

import userDetailsModule from './components/user-details/user-details-component';

// import apLoadingData
//   from '../../../../../components/ap-loading-data/ap-loading-data-component';

import SettingsContainerController from './settings-container-controller';

import template from './settings-container.html';

const settingsContainerModule = angular.module('settingsContainerModule', [
  userDetailsModule,
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