// =============================================================================
//
//  app/routes/account/settings/components/settings-container/settings-container-component.spec.js
//
// =============================================================================

/* eslint-disable no-unused-expressions */

import settingsContainerModule from './settings-container-component';

let controller;
let scope;
let UsersModel;
let AuthenticationService;
let newForm;
let UserService;
let $injector;

const buttonOpts = { test: 'test' };
const testUser = {
  id: 1,
  email: 'test@test.com',
  address: {
    first_name: 'test',
    last_name: 'test',
  },
};

const testUserTwo = {
  id: 2,
  email: 'test@testing.com',
  address: {
    first_name: 'testing',
    last_name: 'testing',
  },
};

const updatedTestUser = Object.assign({ status: 'updated' }, testUser);

describe('Component: settings-container-component', () => {
  beforeEach(() => {
    angular.mock.module(settingsContainerModule);
    angular.mock.module($provide => {
      $provide.value('AuthenticationService', {
        getCurrentUser: () => testUser,
      });
      $provide.value('UsersModel', {
        initItem: () => Promise.resolve(testUserTwo),
      });
      $provide.value('UserService', {
        update: user => Promise.resolve(user),
      });
      $provide.value('FormService', {
        getUpdateButtonOptions: () => (
          buttonOpts
        ),
      });
      $provide.value('TokenModel', {
        getCurrentUserId: () => 1,
      });
      $provide.value('$state', {
        go: () => false,
      });
    });
    newForm = {
      $valid: true,
      $setPristine: () => {},
    };
  });

// ==============================================================================
//  Compilation
// ==============================================================================

  // describe('Compilation', () => {
  //   beforeEach(inject(($compile, $rootScope) => {
  //     scope = $rootScope.$new();
  //     element = angular.element('<settings-container></settings-container>');
  //     element = $compile(element)(scope);
  //   }));
  //
  //   it('should render the component', () => {
  //     const heading = element.find('legend');
  //     expect(heading.text()).to.equal('Address details');
  //   });
  // });

// ==============================================================================
//  Controller
// ==============================================================================

  describe('Controller', () => {
    beforeEach(
      inject(
        ($rootScope, $componentController, _AuthenticationService_, _UsersModel_, _$injector_) => {
          scope = $rootScope.$new();
          AuthenticationService = _AuthenticationService_;
          UsersModel = _UsersModel_;
          $injector = _$injector_;
          controller = $componentController(
            'settingsContainer',
            { $scope: scope },
            { onInit: () => false }, // prevent on intiation methods running
          );
        },
    ));

    it('should create a controller', () => {
      expect(controller).to.be.an('object');
    });

    it('should be attached to the scope', () => {
      expect(scope.settingsContainerVm).to.deep.equal(controller);
    });

    // ==============================================================================
    //  Constructor
    // ==============================================================================

    describe('Constructor', () => {
      it('should have the correct default options', () => {
        expect(controller.result).to.be.null;
        expect(controller.isSubmitting).to.be.false;
      });

      it('should have got the buttonOpts from our form service', () => {
        expect(controller.buttonOpts).to.deep.equal(buttonOpts);
      });
    });

    // ==============================================================================
    //  Methods
    // ==============================================================================

    describe('Methods', () => {
      // ==============================================================================
      //  getUserDetails
      // ==============================================================================

      describe('getUserDetails', () => {
        it('should try to load the logged in users details if the ID matches the parent ID',
          done => {
            const authSpy = sinon.spy(AuthenticationService, 'getCurrentUser');
            const userSpy = sinon.spy(UsersModel, 'initItem');
            controller.isLoading = true;
            controller.parentUser = 1;
            controller.getUserDetails(1)
              .then(() => {
                expect(authSpy).to.have.been.calledOnce;
                expect(userSpy).to.not.have.been.called;
                expect(controller.user).to.deep.equal(testUser);
                expect(controller.isLoading).to.be.false;
                authSpy.reset();
                userSpy.reset();
                done();
              })
              .catch(e => {
                done(new Error(e));
              });
          },
        );

        it('should try to load the specified user details if ID doesn\'t match the parent user ID',
          done => {
            const authSpy = sinon.spy(AuthenticationService, 'getCurrentUser');
            const userSpy = sinon.spy(UsersModel, 'initItem');
            controller.isLoading = true;
            controller.parentUser = 1;
            controller.getUserDetails(2)
              .then(() => {
                expect(userSpy).to.have.been.calledOnce;
                expect(authSpy).to.not.have.been.called;
                expect(controller.user).to.deep.equal(testUserTwo);
                expect(controller.isLoading).to.be.false;
                authSpy.reset();
                userSpy.reset();
                done();
              })
              .catch(e => {
                done(new Error(e));
              });
          });
      });

      // ==============================================================================
      //  OnSave
      // ==============================================================================

      describe('onSave', () => {
        it('Shouldn\'t set the user if the form is invalid', () => {
          expect(controller.user).to.be.null;
          controller.onSave(false, newForm, updatedTestUser);
          expect(controller.user).to.not.deep.equal(updatedTestUser);
          expect(controller.user).to.be.null;
        });

        it('Should set the user if the form is valid', () => {
          expect(controller.user).to.be.null;
          return controller.onSave(true, newForm, updatedTestUser)
            .then(() => {
              expect(controller.user).to.deep.equal(updatedTestUser);
            });
        });

        it('shouldn\'t attempt to call the User service if form is invalid', () => {
          UserService = $injector.get('UserService');
          const userService = sinon.spy(UserService, 'update');
          controller.onSave(false, {}, testUser);
          expect(userService).to.not.have.been.called;
        });

        it('should attempt to call the User service if form is valid', () => {
          UserService = $injector.get('UserService');
          const userService = sinon.spy(UserService, 'update');
          controller.onSave(true, newForm, testUser);
          expect(userService).to.have.been.calledOnce;
          expect(userService).to.have.been.calledWithExactly(testUser, controller, newForm);
        });

        it('should set the submitting flag if the form is valid', () => {
          expect(controller.isSubmitting).to.be.false;
          controller.onSave(true, newForm, testUser);
          expect(controller.isSubmitting).to.be.true;
        });
      });

      // ==============================================================================
      //  setActiveUser
      // ==============================================================================

      describe('setActiveUser', () => {
        it('should try to load the default settings route if the ID matches the parent ID',
          () => {
            const $state = $injector.get('$state');
            const stateSpy = sinon.spy($state, 'go');
            controller.parentUser = 1;
            controller.setActiveUser(1);
            expect(stateSpy).to.have.been.calledOnce;
            expect(stateSpy).to.have.been.calledWithExactly('angularProfile.account.settings');
            stateSpy.reset();
          },
        );

        it('should try to load the child settings route if the ID doesn\'t match the parent ID',
          () => {
            const $state = $injector.get('$state');
            const stateSpy = sinon.spy($state, 'go');
            controller.parentUser = 1;
            controller.setActiveUser(2);
            expect(stateSpy).to.have.been.calledOnce;
            expect(stateSpy).to.have.been.calledWithExactly(
              'angularProfile.account.child',
              { userId: 2 },
            );
            stateSpy.reset();
          },
        );
      });
    });
  });
});

/* eslint-enable */
