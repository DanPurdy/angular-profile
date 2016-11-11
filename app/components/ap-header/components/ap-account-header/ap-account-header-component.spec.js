// =============================================================================
//
//  app/components/ap-header/components/ap-account-header/ap-account-header-component.spec.js
//
// =============================================================================

/* eslint-disable no-unused-expressions */

import apAccountHeaderModule from './ap-account-header-component';

let controller;
let element;
let scope;
let contScope;

describe('Component: ap-account-header-component', () => {
  beforeEach(
    angular.mock.module(apAccountHeaderModule),
  );

  beforeEach(inject(($compile, $rootScope) => {
    scope = $rootScope.$new();
    element = angular.element(
      '<ap-account-header ap-user="user"></ap-account-header>',
    );
    element = $compile(element)(scope);
    scope.user = 'Test User';
    scope.$apply();
  }));


// ==============================================================================
//  Bindings
// ==============================================================================
  describe('Bindings', () => {
    beforeEach(() => {
      controller = element.controller('apAccountHeader');
    });

    it('should have a user bound to it', () => {
      expect(controller.apUser).to.exist;
      expect(controller.apUser).to.equal(scope.user);
    });
  });

// ==============================================================================
//  Controller
// ==============================================================================

  describe('Controller', () => {
    beforeEach(inject(($rootScope, $componentController) => {
      contScope = $rootScope.$new();
      controller = $componentController('apAccountHeader', { $scope: contScope });
    }));

    it('should create a controller', () => {
      expect(controller).to.be.an('object');
    });

    it('should be attached to the scope', () => {
      expect(contScope.apAccountHeaderVm).to.deep.equal(controller);
    });
  });
});

/* eslint-enable */
