// ==============================================================================
//
//  app/routes/account/settings/account.settings.module.js
//
//
//
// ==============================================================================

import accountSettingsConfig from './account.settings.config';

// ==============================================================================
//  components
// ==============================================================================

import settingsContainerModule from './components/settings-container/settings-container-component';
// ==============================================================================
//  Directives
// ==============================================================================

// ==============================================================================
//  Module
// ==============================================================================

const accountSettingsModule = angular.module('angularProfile.account.settings', [
  'ui.router',
  settingsContainerModule,
])
  .config(accountSettingsConfig);

export default accountSettingsModule.name;
