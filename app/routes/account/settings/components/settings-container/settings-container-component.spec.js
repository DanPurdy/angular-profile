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
let $injector;

const dummyPass = 'test';
const testUser = {
  _id: 1,
  email: 'test@test.com',
  firstName: 'test',
  lastName: 'test',
  password: 't3sT',
};

const dummyUser = Object.assign({}, testUser, { password: dummyPass });

const testUserTwo = {
  _id: 2,
  email: 'test@testing.com',
  firstName: 'testing',
  lastName: 'testing',
};

const updatedTestUser = Object.assign({ status: 'updated' }, testUser);

describe('Component: settings-container-component', () => {
  beforeEach(() => {
    angular.mock.module(settingsContainerModule);
    angular.mock.module($provide => {
      $provide.value('AuthenticationService', {
        getCurrentUser: () => testUser,
        updateCurrentUser: () => true,
      });
      $provide.value('UsersModel', {
        save: input => Promise.resolve(input),
        initItem: () => Promise.resolve(testUserTwo),
      });
      $provide.value('UserService', {
        onUpdateSuccess: () => true,
        onUpdateFailure: () => true,
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
    });

    // ==============================================================================
    //  Methods
    // ==============================================================================

    describe('Methods', () => {
      // ==============================================================================
      //  getUserDetails
      // ==============================================================================

      describe('getUserDetails', () => {
        it('should try to load the logged in users details',
          done => {
            const authSpy = sinon.spy(AuthenticationService, 'getCurrentUser');
            controller.isLoading = true;
            return controller.getUserDetails(1)
              .then(() => {
                expect(authSpy).to.have.been.calledOnce;
                expect(controller.user).to.deep.equal(testUser);
                expect(controller.isLoading).to.be.false;
                authSpy.reset();
                done();
              })
              .catch(e => {
                done(new Error(e));
              });
          },
        );
      });

      // ==============================================================================
      //  setupDummyUser
      // ==============================================================================

      describe('setupDummyUser', () => {
        it('should return our user object with dummy password', () => {
          controller.dummyPass = dummyPass;
          controller.user = testUser;
          expect(controller.setupDummyUser()).to.deep.equal(dummyUser);
        });
      });

      // ==============================================================================
      //  compareUsers
      // ==============================================================================

      describe('compareUsers', () => {
        it('should return our user object with correct password if dummy pass is present', () => {
          const newUser = Object.assign({}, testUser, { password: dummyPass });
          const expected = Object.assign({}, testUser);
          controller.dummyPass = dummyPass;
          controller.user = testUser;
          expect(controller.compareUsers(newUser)).to.deep.equal(expected);
        });

        it('should return our user object with correct password if password is updated', () => {
          const newUser = Object.assign({}, testUser, { password: 'new' });
          const expected = Object.assign({}, testUser, { password: 'new' });
          controller.dummyPass = dummyPass;
          controller.user = testUser;
          expect(controller.compareUsers(newUser)).to.deep.equal(expected);
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

        it('Should set the user if the form is valid', done => {
          expect(controller.user).to.be.null;
          return controller.onSave(true, newForm, updatedTestUser)
            .then(() => {
              expect(controller.user).to.deep.equal(updatedTestUser);
              done();
            }).catch(e => {
              done(new Error(e));
            });
        });

        it('shouldn\'t attempt to call the User service if form is invalid', () => {
          UsersModel = $injector.get('UsersModel');
          const usersModel = sinon.spy(UsersModel, 'save');
          controller.onSave(false, {}, testUser);
          expect(usersModel).to.not.have.been.called;
        });

        it('should attempt to call the User service if form is valid', done => {
          UsersModel = $injector.get('UsersModel');
          const usersModel = sinon.spy(UsersModel, 'save');
          controller.onSave(true, newForm, testUser)
            .then(() => {
              expect(usersModel).to.have.been.calledOnce;
              expect(usersModel).to.have.been.calledWithExactly(testUser);
              done();
            }).catch(e => {
              done(new Error(e));
            });
        });

        it('should set the submitting flag if the form is valid', () => {
          expect(controller.isSubmitting).to.be.false;
          controller.onSave(true, newForm, testUser);
          expect(controller.isSubmitting).to.be.true;
        });
      });
    });
  });
});

/* eslint-enable */
