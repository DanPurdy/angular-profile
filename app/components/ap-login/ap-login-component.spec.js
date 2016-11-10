// =============================================================================
//
//  app/components/ap-login/ap-login-component.spec.js
//
// =============================================================================

/* eslint-disable no-unused-expressions */

import ApLoginModule from './ap-login-component';

let controller;
let element;
let scope;
let $componentController;

describe('Component: ap-login-component', () => {
  beforeEach(
    angular.mock.module(ApLoginModule),
  );

// ==============================================================================
//  Compilation
// ==============================================================================

  describe('Compilation', () => {
    beforeEach(inject(($compile, $rootScope) => {
      scope = $rootScope.$new();
      element = angular.element('<ap-login></ap-login>');
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
      controller = $componentController('ApLogin', { $scope: scope });
    }));

    it('should create a controller', () => {
      expect(controller).to.be.an('object');
    });

    it('should be attached to the scope', () => {
      expect(scope.ApLoginVm).to.deep.equal(controller);
    });

    it('should call the onLogin binding when the login form is submitted', () => {
      const spy = sinon.spy();
      const testData = {
        valid: 'true',
        form: {},
        credentials: {
          name: 'test',
          password: 'test',
        },
      };
      const component = $componentController('ApLogin',
        null,
        { onLogin: spy },
      );

      component.onLogin(testData);
      expect(spy).to.have.been.calledOnce;
      expect(spy).to.have.been.calledWithExactly(testData);
      spy.reset();
    });
  });
});

/* eslint-enable */
