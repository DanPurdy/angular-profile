// =============================================================================
//
//  app/components/ap-saving-data/ap-saving-data-component.spec.js
//
// =============================================================================

/* eslint-disable no-unused-expressions */

import apSavingDataModule from './ap-saving-data-component';

let controller;
let element;
let scope;

describe('Component: ap-saving-data-component', () => {
  beforeEach(
    angular.mock.module(apSavingDataModule),
  );

// ==============================================================================
//  Compilation
// ==============================================================================

  describe('Compilation', () => {
    beforeEach(inject(($compile, $rootScope) => {
      scope = $rootScope.$new();
      element = angular.element('<ap-saving-data></ap-saving-data>');
      element = $compile(element)(scope);
    }));
  });

// ==============================================================================
//  Controller
// ==============================================================================

  describe('Controller', () => {
    beforeEach(inject(($rootScope, $componentController) => {
      scope = $rootScope.$new();
      controller = $componentController('apSavingData', { $scope: scope });
    }));

    it('should create a controller', () => {
      expect(controller).to.be.an('object');
    });

    it('should be attached to the scope', () => {
      expect(scope.apSavingDataVm).to.deep.equal(controller);
    });
  });
});

/* eslint-enable */
