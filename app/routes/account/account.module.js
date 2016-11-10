// ==============================================================================
//
//  app/routes/account/account.module.js
//
//
//
// ==============================================================================

import accountConfig from './account.config';
import settings from './settings/account.settings.module';

// import AlrSidebarModule from '../../components/alr-sidebar/alr-sidebar-component';
// import AlrHeaderModule from '../../components/alr-header/alr-header-component';

const accountModule = angular.module('angularProfile.account', [
  // AlrSidebarModule,
  // AlrHeaderModule,
  settings,
]);

accountModule
  .config(accountConfig);

export default accountModule.name;
