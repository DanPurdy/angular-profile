// =============================================================================
//
//  app/routes/authentication/register/components/register-form-complete/
//  register-form-complete-component.spec.js
//
// =============================================================================

/* eslint-disable no-unused-expressions */

import alrRegisterFormCompleteModule from './register-form-complete-component';

let controller;
let scope;
let $componentController;

describe('Component: alr-register-form-complete-component', () => {
  beforeEach(() => {
    angular.mock.module(alrRegisterFormCompleteModule);
  });

// ==============================================================================
//  Compilation
// ==============================================================================

  // Nothing to hook into yet to test compilation, there will be
  // describe('Compilation', () => {
  //   beforeEach(inject(($compile, $rootScope) => {
  //     scope = $rootScope.$new();
  //     element = angular.element('<alr-register-form-complete></alr-register-form-complete>');
  //     element = $compile(element)(scope);
  //   }));
  //
  //   it('should render the component', () => {
  //     const heading = element.find('h2');
  //     expect(heading.text()).to.equal('Incomplete Searches');
  //   });
  // });

// ==============================================================================
//  Controller
// ==============================================================================

  describe('Controller', () => {
    beforeEach(inject(($rootScope, _$componentController_) => {
      scope = $rootScope.$new();
      $componentController = _$componentController_;
      controller = $componentController('alrRegisterFormComplete', { $scope: scope });
    }));

    it('should create a controller', () => {
      expect(controller).to.be.an('object');
    });

    it('should be attached to the scope', () => {
      expect(scope.alrRegisterFormCompleteVm).to.deep.equal(controller);
    });

    // ==============================================================================
    //  Methods
    // ==============================================================================

    describe('methods', () => {

    });
  });
});

/* eslint-enable */
