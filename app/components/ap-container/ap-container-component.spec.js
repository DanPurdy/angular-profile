// =============================================================================
//
//  app/components/ap-container/ap-container-component.spec.js
//
// =============================================================================

/* eslint-disable no-unused-expressions */

import apContainerModule from './ap-container-component';

let controller;
let scope;

describe('Component: ap-container-component', () => {
  beforeEach(() => {
    angular.mock.module(apContainerModule);
  });


// ==============================================================================
//  Controller
// ==============================================================================

  describe('Controller', () => {
    beforeEach(inject(($rootScope, $componentController) => {
      scope = $rootScope.$new();
      controller = $componentController('apContainer', { $scope: scope });
    }));

    it('should create a controller', () => {
      expect(controller).to.be.an('object');
    });

    it('should be attached to the scope', () => {
      expect(scope.apContainerVm).to.deep.equal(controller);
    });
  });
});

/* eslint-enable */
