// ==============================================================================
//
//  app/routes/account/account.module.js
//
//
//
// ==============================================================================

import accountConfig from './account.config';
import settings from './settings/account.settings.module';

// import ApSidebarModule from '../../components/ap-sidebar/ap-sidebar-component';
// import ApHeaderModule from '../../components/ap-header/ap-header-component';

const accountModule = angular.module('angularProfile.account', [
  // ApSidebarModule,
  // ApHeaderModule,
  settings,
]);

accountModule
  .config(accountConfig);

export default accountModule.name;
