// =============================================================================
//
//  app/components/ap-sidebar/ap-sidebar-component.spec.js
//
// =============================================================================

/* eslint-disable no-unused-expressions */

import apSidebarModule from './ap-sidebar-component';

let controller;
let scope;

describe('Component: ap-sidebar-component', () => {
  beforeEach(() => {
    angular.mock.module(apSidebarModule);
  });

// ==============================================================================
//  Controller
// ==============================================================================

  describe('Controller', () => {
    beforeEach(inject(($rootScope, $componentController) => {
      scope = $rootScope.$new();
      controller = $componentController('apSidebar', { $scope: scope });
    }));

    it('should create a controller', () => {
      expect(controller).to.be.an('object');
    });

    it('should be attached to the scope', () => {
      expect(scope.apSidebarVm).to.deep.equal(controller);
    });
  });
});

/* eslint-enable */
