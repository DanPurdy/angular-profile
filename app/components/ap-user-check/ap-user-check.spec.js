// =============================================================================
//
//  app/components/ap-user-check/ap-user-check.spec.js
//
// =============================================================================

'use-strict';

/* eslint-disable no-unused-expressions */
import apUserCheck from './ap-user-check';

describe('apUserCheck', () => {
  const validEmailTemplate = '<input ng-model="confirmation" ap-user-check="email"></input>';
  const validUserTemplate = '<input ng-model="confirmation" ap-user-check="username"></input>';
  let $scope;
  let $compile;
  let compiled;
  let UserService;
  let $q;
  let sandbox;

  beforeEach(() => {
    angular.mock.module(apUserCheck);
    angular.mock.module($provide => {
      $provide.value('UserService', {
        checkAvailability: () => false,
      });
    });
  });

  beforeEach(inject((_$compile_, _$rootScope_, _UserService_, _$q_) => {
    $scope = _$rootScope_.$new();
    $compile = _$compile_;
    UserService = _UserService_;
    $q = _$q_;
  }));

  describe('$validators setup', () => {
    it('does not throw when no valid parameter is supplied', () => {
      const naTemplate = '<div ap-user-check></div>';
      compiled = $compile(naTemplate)($scope);
      $scope.$digest();
    });

    it('is limited to attribute invocation', () => {
      const spy = sinon.spy($scope, '$watch');
      const naTemplates = [
        '<div class="ap-user-check"></div>',
        '<ap-user-check></ap-user-check>',
      ];

      naTemplates.forEach(templ => {
        compiled = $compile(templ)($scope);
        $scope.$digest();
        expect(spy).to.have.been.not.called;
      });
      spy.reset();
    });
  });

  describe('$validator emailAvailable', () => {
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('returns true if no model value has been defined', () => {
      compiled = $compile(validEmailTemplate)($scope);
      expect($scope.confirmation).to.be.undefined;
      $scope.$digest();
      expect(compiled.hasClass('ng-valid')).to.be.true;
    });

    it('returns true if the email is unique', () => {
      sandbox.stub(UserService, 'checkAvailability', () => $q.when({ exists: false }));
      $scope.confirmation = 'value@test.dev';
      compiled = $compile(validEmailTemplate)($scope);
      $scope.$digest();
      expect(compiled.hasClass('ng-valid')).to.be.true;
    });

    it('returns false if the email is not unique', () => {
      sandbox.stub(UserService, 'checkAvailability', () => $q.when({ exists: true }));
      $scope.confirmation = 'value@test.dev';
      compiled = $compile(validEmailTemplate)($scope);
      $scope.$digest();
      expect(compiled.hasClass('ng-valid')).to.be.false;
    });

    it('returns false if the API call is unsuccessful', () => {
      sandbox.stub(UserService, 'checkAvailability', () => $q.when());
      $scope.confirmation = 'value@test.dev';
      compiled = $compile(validEmailTemplate)($scope);
      $scope.$digest();
      expect(compiled.hasClass('ng-valid')).to.be.false;
    });
  });

  describe('$validator userNameValid', () => {
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('returns true if no model value has been defined', () => {
      compiled = $compile(validUserTemplate)($scope);
      expect($scope.confirmation).to.be.undefined;
      $scope.$digest();
      expect(compiled.hasClass('ng-valid')).to.be.true;
    });

    it('returns true if the user name is unique', () => {
      sandbox.stub(UserService, 'checkAvailability', () => $q.when({ exists: false }));
      $scope.confirmation = 'testuser';
      compiled = $compile(validUserTemplate)($scope);
      $scope.$digest();
      expect(compiled.hasClass('ng-valid')).to.be.true;
    });

    it('returns false if the user name is not unique', () => {
      sandbox.stub(UserService, 'checkAvailability', () => $q.when({ exists: true }));
      $scope.confirmation = 'testuser';
      compiled = $compile(validUserTemplate)($scope);
      $scope.$digest();
      expect(compiled.hasClass('ng-valid')).to.be.false;
    });

    it('returns false if the API call is unsuccessful', () => {
      sandbox.stub(UserService, 'checkAvailability', () => $q.when());
      $scope.confirmation = 'testuser';
      compiled = $compile(validUserTemplate)($scope);
      $scope.$digest();
      expect(compiled.hasClass('ng-valid')).to.be.false;
    });
  });
});
/* eslint-enable */
