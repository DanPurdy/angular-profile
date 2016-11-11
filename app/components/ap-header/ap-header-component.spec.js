// =============================================================================
//
//  app/components/ap-header/ap-header-component.spec.js
//
// =============================================================================

/* eslint-disable no-unused-expressions */

import apHeaderModule from './ap-header-component';

let controller;
let scope;
let $rootScope;
const testUser = {
  id: 1,
  firstName: 'test',
  lastName: 'user',
};

describe('Component: ap-header-component', () => {
  beforeEach(
    angular.mock.module(apHeaderModule),
  );

// ==============================================================================
//  Controller
// ==============================================================================

  describe('Controller', () => {
    beforeEach(inject((_$rootScope_, $componentController) => {
      $rootScope = _$rootScope_;
      scope = $rootScope.$new();
      $rootScope.currentUser = testUser;
      controller = $componentController('apHeader', { $scope: scope });
    }));

    it('should create a controller', () => {
      expect(controller).to.be.an('object');
    });

    it('should be attached to the scope', () => {
      expect(scope.apHeaderVm).to.deep.equal(controller);
    });
  });
});

/* eslint-enable */
