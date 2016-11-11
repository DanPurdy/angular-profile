// =============================================================================
//
//  app/routes/authentication/login/components/login-form-container/
//  login-form-container-component.spec.js
//
// =============================================================================

/* eslint-disable no-unused-expressions */

import authModule from '../../../authentication.module';
import ApLoginFormContainerComponent from './login-form-container-component';
import ApLoginFormContainerController from './login-form-container-controller';

let $rootScope;
let scope;
let $controller;
let controller;
let sandbox;
let $state;
let $injector;
let AuthenticationService;
let FormService;
let newForm;

describe('Route: /login', () => {
  beforeEach(
    angular.mock.module(authModule),
  );

  beforeEach(() => {
    angular.mock.module(ApLoginFormContainerComponent);
    angular.mock.module($provide => {
      $provide.value('FormService', {
        onSuccess: () => {},
        onFailure: () => {},
      });
      $provide.value('UsersModel', {
        getCredits: () => Promise.resolve(5),
      });
      $provide.value('AuthenticationService', {
        login: () => Promise.resolve(),
        getCurrentUser: () => ({ _id: 1 }),
      });
    });
    newForm = {
      $valid: true,
      $setPristine: () => {},
    };
  });

  beforeEach(inject((_$rootScope_, _$controller_, _$state_, _FormService_, _$injector_) => {
    $rootScope = _$rootScope_;
    $controller = _$controller_;
    $state = _$state_;
    FormService = _FormService_;
    $injector = _$injector_;
  }));

  describe('Controller', () => {
    beforeEach(() => {
      scope = $rootScope.$new();
      controller = $controller(ApLoginFormContainerController, {
        $scope: scope,
      });
      sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
      sandbox.reset();
    });

    describe('login', () => {
      const testCreds = {
        _username: 'test',
        _password: 'test',
      };

      it('Shouldn\'t set the credentials if the form is invalid', () => {
        expect(controller.credentials).to.deep.equal({});
        controller.login(false, newForm, testCreds);
        expect(controller.credentials).to.not.deep.equal(testCreds);
      });

      it('Should set the credentials if the form is valid', () => {
        expect(controller.credentials).to.deep.equal({});
        controller.login(true, newForm, testCreds);
        expect(controller.credentials).to.deep.equal(testCreds);
      });

      it('shouldn\'t attempt to call the Authentication service if form is invalid', () => {
        AuthenticationService = $injector.get('AuthenticationService');
        const authService = sinon.spy(AuthenticationService, 'login');
        controller.login(false, {}, testCreds);
        expect(authService).to.not.have.been.called;
      });

      it('should attempt to call the Authentication service if form is valid', () => {
        AuthenticationService = $injector.get('AuthenticationService');
        const authService = sinon.spy(AuthenticationService, 'login');
        controller.login(true, newForm, testCreds);
        expect(authService).to.have.been.calledOnce;
        expect(authService).to.have.been.calledWithExactly(testCreds);
      });

      it('should set the submitting flag if the form is valid', () => {
        expect(controller.isSubmitting).to.be.false;
        controller.login(true, newForm, testCreds);
        expect(controller.isSubmitting).to.be.true;
      });

      it('should call the form service success method when succesful', () => {
        const formSuccess = sinon.spy(FormService, 'onSuccess');
        return controller.login(true, newForm, testCreds).then(() => {
          expect(formSuccess).to.have.been.calledOnce;
        });
      });

      it('should call the form service failure method when unsuccesful', () => {
        AuthenticationService = $injector.get('AuthenticationService');
        sinon.stub(AuthenticationService, 'login', () => Promise.reject('failure'));
        const formFailure = sinon.spy(FormService, 'onFailure');
        return controller.login(true, newForm, testCreds).then(() => {
          expect(formFailure).to.have.been.calledOnce;
        }).catch(() => {});
      });

      it('should set the form to be pristine when unsuccesful', () => {
        AuthenticationService = $injector.get('AuthenticationService');
        sinon.stub(AuthenticationService, 'login', () => Promise.reject('failure'));
        const formSet = sinon.spy(newForm, '$setPristine');
        return controller.login(true, newForm, testCreds).then(() => {
          expect(formSet).to.have.been.calledOnce;
        });
      });

      it('should transition to the dashboard when login succeeds', () => {
        const spy = sinon.spy($state, 'go');
        return controller.login(true, newForm, testCreds).then(() => {
          expect(spy).to.have.been.calledOnce;
          expect(spy).to.have.been.calledWithExactly('angularProfile.account.settings');
        });
      });
    });
  });
});

/* eslint-enable */
