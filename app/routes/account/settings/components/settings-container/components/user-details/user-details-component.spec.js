// =============================================================================
//
//  app/routes/account/settings/components/user-details/user-details-component.spec.js
//
// =============================================================================

/* eslint-disable no-unused-expressions */

import userDetailsModule from './user-details-component';

let controller;
let scope;

describe('Component: user-details-component', () => {
  beforeEach(() => (
    angular.mock.module(userDetailsModule)
  ));

// ==============================================================================
//  Controller
// ==============================================================================

  describe('Controller', () => {
    beforeEach(inject(($rootScope, $componentController) => {
      scope = $rootScope.$new();
      controller = $componentController('userDetails', { $scope: scope });
    }));

    it('should create a controller', () => {
      expect(controller).to.be.an('object');
    });

    it('should be attached to the scope', () => {
      expect(scope.userDetailsVm).to.deep.equal(controller);
    });
  });
});

/* eslint-enable */
