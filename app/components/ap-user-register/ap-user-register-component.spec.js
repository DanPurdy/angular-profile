// =============================================================================
//
//  app/components/ap-user-register/ap-user-register-component.spec.js
//
// =============================================================================

/* eslint-disable no-unused-expressions */

import apUserRegisterModule from './ap-user-register-component';

let controller;
let element;
let scope;
let $componentController;

describe('Component: ap-user-register-component', () => {
  beforeEach(() => {
    angular.mock.module(apUserRegisterModule);
    angular.mock.module($provide => {
      $provide.value('FormService', {
        getLoginButtonOptions: () => false,
        onSuccess: () => {},
        onFailure: () => {},
      });
      $provide.value('UserService', {});
    });
  });

// ==============================================================================
//  Compilation
// ==============================================================================

  describe('Compilation', () => {
    beforeEach(inject(($compile, $rootScope) => {
      scope = $rootScope.$new();
      element = angular.element('<ap-user-register></ap-user-register>');
      element = $compile(element)(scope);
    }));

    it('should render the component', () => {
      const form = element.find('form');
      const legends = form[0].querySelectorAll('legend');

      expect(legends.length).to.equal(5);
      expect(legends[0].innerText).to.equal('Personal information');
      expect(legends[1].innerText).to.equal('Account details');
      expect(legends[2].innerText).to.equal('Address details');
      expect(legends[3].innerText).to.equal('Contact details');
      expect(legends[4].innerText).to.equal('VAT details');
    });
  });

// ==============================================================================
//  Controller
// ==============================================================================

  describe('Controller', () => {
    beforeEach(inject(($rootScope, _$componentController_) => {
      scope = $rootScope.$new();
      $componentController = _$componentController_;
      controller = $componentController('apUserRegister', { $scope: scope });
    }));

    it('should create a controller', () => {
      expect(controller).to.be.an('object');
    });

    it('should be attached to the scope', () => {
      expect(scope.apUserRegisterVm).to.deep.equal(controller);
    });

    it('should call the onRegister binding when the form is submitted', () => {
      const spy = sinon.spy();
      const testData = {
        valid: 'true',
        form: {},
        credentials: {
          _username: 'test',
          _password: 'test',
        },
      };
      const component = $componentController('apUserRegister',
        null,
        { onRegister: spy },
      );

      component.onRegister(testData);
      expect(spy).to.have.been.calledOnce;
      expect(spy).to.have.been.calledWithExactly(testData);
      spy.reset();
    });
  });
});

/* eslint-enable */
