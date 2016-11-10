// =============================================================================
//
//  app/routes/authentication/register/components/register-form-container/
//  register-form-container-component.spec.js
//
// =============================================================================

/* eslint-disable no-unused-expressions */

import alrRegisterFormContainerModule from './register-form-container-component';

let controller;
let scope;
let $componentController;
let newForm;
let UsersModel;
let FormService;

describe('Component: alr-register-form-container-component', () => {
  beforeEach(() => {
    angular.mock.module(alrRegisterFormContainerModule);
    angular.mock.module($provide => {
      $provide.value('UsersModel', {
        register: () => Promise.resolve(true),
      });
      $provide.value('FormService', {
        getRegistrationButtonOptions: () => {},
        register: () => Promise.resolve(true),
      });
      $provide.value('$state', {
        go: () => true,
      });
    });
  });

// ==============================================================================
//  Compilation
// ==============================================================================

  // Nothing to hook into yet to test compilation, there will be
  // describe('Compilation', () => {
  //   beforeEach(inject(($compile, $rootScope) => {
  //     scope = $rootScope.$new();
  //     element = angular.element('<alr-register-form-container></alr-register-form-container>');
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
    beforeEach(inject(($rootScope,
      _$componentController_,
      _UsersModel_,
      _FormService_,
    ) => {
      scope = $rootScope.$new();
      $componentController = _$componentController_;
      UsersModel = _UsersModel_;
      FormService = _FormService_;
      newForm = {
        $valid: true,
        $setPristine: () => {},
      };
      controller = $componentController('alrRegisterFormContainer', { $scope: scope });
    }));

    it('should create a controller', () => {
      expect(controller).to.be.an('object');
    });

    it('should be attached to the scope', () => {
      expect(scope.alrRegisterFormContainerVm).to.deep.equal(controller);
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
          email: 'test@test.dev',
          address: {
            first_name: 'test',
            last_name: 'user',
          },
        };

        it('Should try to call the form service if the form is valid', done => {
          const stub = sinon.stub(FormService, 'register', () => Promise.resolve(true));
          controller.register(true, newForm, user)
            .then(() => {
              expect(stub).to.have.been.calledOnce;
              expect(stub).to.have.been.calledWithExactly(UsersModel, user, controller, newForm);
              stub.restore();
              done();
            })
            .catch(e => {
              done(new Error(e));
            });
        });

        it('shouldn\'t attempt to call the form service if form is invalid', () => {
          const spy = sinon.spy(FormService, 'register');
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
