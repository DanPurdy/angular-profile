// =============================================================================
//
//  app/components/ap-sidebar/ap-sidebar-component.js
//
// =============================================================================

import ApSidebarController from './ap-sidebar-controller';

import template from './ap-sidebar.html';

const apSidebarModule = angular.module('apSidebarModule', [])
  .component('apSidebar', {
    template,
    controller: ApSidebarController,
    controllerAs: 'apSidebarVm',
  },
);

export default apSidebarModule.name;
