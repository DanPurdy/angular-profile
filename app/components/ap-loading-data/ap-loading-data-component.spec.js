// =============================================================================
//
//  app/components/ap-loading-data/ap-loading-data-component.spec.js
//
// =============================================================================

/* eslint-disable no-unused-expressions */

import apLoadingDataModule from './ap-loading-data-component';

let controller;
let element;
let scope;

describe('Component: ap-loading-data-component', () => {
  beforeEach(
    angular.mock.module(apLoadingDataModule),
  );

// ==============================================================================
//  Compilation
// ==============================================================================

  describe('Compilation', () => {
    beforeEach(inject(($compile, $rootScope) => {
      scope = $rootScope.$new();
      element = angular.element('<ap-loading-data></ap-loading-data>');
      element = $compile(element)(scope);
    }));
  });

// ==============================================================================
//  Controller
// ==============================================================================

  describe('Controller', () => {
    beforeEach(inject(($rootScope, $componentController) => {
      scope = $rootScope.$new();
      controller = $componentController('apLoadingData', { $scope: scope });
    }));

    it('should create a controller', () => {
      expect(controller).to.be.an('object');
    });

    it('should be attached to the scope', () => {
      expect(scope.apLoadingDataVm).to.deep.equal(controller);
    });
  });
});

/* eslint-enable */
