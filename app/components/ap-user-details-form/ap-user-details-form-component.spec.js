// =============================================================================
//
//  app/components/ap-user-details-form/ap-user-details-form-component.spec.js
//
// =============================================================================

/* eslint-disable no-unused-expressions */

import apUserDetailsFormModule from './ap-user-details-form-component';

let controller;
let element;
let scope;
let $componentController;

describe('Component: ap-user-details-form-component', () => {
  beforeEach(
    angular.mock.module(apUserDetailsFormModule),
  );

// ==============================================================================
//  Compilation
// ==============================================================================

  describe('Compilation', () => {
    beforeEach(inject(($compile, $rootScope) => {
      scope = $rootScope.$new();
      element = angular.element('<ap-user-details-form></ap-user-details-form>');
      element = $compile(element)(scope);
    }));

    it('should render the component', () => {
      const el = element.find('form');
      expect(el[0]).to.exist;
      expect(el).to.be.an('object');
    });
  });

// ==============================================================================
//  Controller
// ==============================================================================

  describe('Controller', () => {
    beforeEach(inject(($rootScope, _$componentController_) => {
      scope = $rootScope.$new();
      $componentController = _$componentController_;
      controller = $componentController('apUserDetailsForm', { $scope: scope });
    }));

    it('should create a controller', () => {
      expect(controller).to.be.an('object');
    });

    it('should be attached to the scope', () => {
      expect(scope.apUserDetailsFormVm).to.deep.equal(controller);
    });

    it('should call the onSave binding when the user details form is submitted', () => {
      const spy = sinon.spy();
      const testData = {
        valid: 'true',
        form: {},
        credentials: {
          _username: 'test',
          _password: 'test',
        },
      };
      const component = $componentController('apUserDetailsForm',
        null,
        { onSave: spy },
      );

      component.onSave(testData);
      expect(spy).to.have.been.calledOnce;
      expect(spy).to.have.been.calledWithExactly(testData);
      spy.reset();
    });
  });
});

/* eslint-enable */
