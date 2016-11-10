// =============================================================================
//
//  app/routes/authentication/register/components/register-form-container/
//  register-form-container-component.spec.js
//
// =============================================================================

/* eslint-disable no-unused-expressions */

import apRegisterFormContainerModule from './register-form-container-component';

let controller;
let scope;
let $componentController;
let newForm;
let UsersModel;

describe('Component: ap-register-form-container-component', () => {
  beforeEach(() => {
    angular.mock.module(apRegisterFormContainerModule);
    angular.mock.module($provide => {
      $provide.value('UsersModel', {
        register: () => Promise.resolve(true),
      });
      $provide.value('FormService', {
        register: () => Promise.resolve(true),
        onSuccess: () => false,
        onFailure: () => false,
      });
      $provide.value('$state', {
        go: () => true,
      });
    });
  });

// ==============================================================================
//  Controller
// ==============================================================================

  describe('Controller', () => {
    beforeEach(inject(($rootScope,
      _$componentController_,
      _UsersModel_,
    ) => {
      scope = $rootScope.$new();
      $componentController = _$componentController_;
      UsersModel = _UsersModel_;
      newForm = {
        $valid: true,
        $setPristine: () => {},
      };
      controller = $componentController('apRegisterFormContainer', { $scope: scope });
    }));

    it('should create a controller', () => {
      expect(controller).to.be.an('object');
    });

    it('should be attached to the scope', () => {
      expect(scope.apRegisterFormContainerVm).to.deep.equal(controller);
    });

    // ==============================================================================
    //  Methods
    // ==============================================================================

    describe('Methods', () => {
      // ==============================================================================
      //  register
      // ==============================================================================

      describe('register', () => {
        const user = {
          username: 'test',
          password: 't3sT',
          email: 'test@test.dev',
          firstName: 'test',
          last_name: 'user',
        };

        it('Should try to call the form service if the form is valid', done => {
          const stub = sinon.stub(UsersModel, 'register', () => Promise.resolve(true));
          controller.register(true, newForm, user)
            .then(() => {
              expect(stub).to.have.been.calledOnce;
              expect(stub).to.have.been.calledWithExactly(user);
              stub.restore();
              done();
            })
            .catch(e => {
              done(new Error(e));
            });
        });

        it('shouldn\'t attempt to call the user model if form is invalid', () => {
          const spy = sinon.spy(UsersModel, 'register');
          controller.register(false, {}, user);
          expect(spy).to.not.have.been.called;
          spy.reset();
        });

        it('should set the submitting flag if the form is valid', () => {
          expect(controller.isSubmitting).to.be.false;
          controller.register(true, newForm, user);
          expect(controller.isSubmitting).to.be.true;
        });
      });
    });
  });
});

/* eslint-enable */
