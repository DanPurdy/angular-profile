// =============================================================================
//
//  app/components/ap-email-valid/ap-email-valid.spec.js
//
// =============================================================================

'use-strict';

/* eslint-disable no-unused-expressions */

import apEmailValid from './ap-email-valid';

describe('apEmailValid', () => {
  let $scope;
  let form;

  beforeEach(
    angular.mock.module(apEmailValid),
  );

  beforeEach(inject(($compile, $rootScope) => {
    $scope = $rootScope.$new();

    const element = angular.element(
      `<form name="testForm">
          <input ng-model="model.testVal" id="testID" name="inputTest" ap-email-valid>
        </form>`);
    $compile(element)($scope);
    $rootScope.$digest();
    form = $scope.testForm;
  }));

  describe('$validators setup', () => {
    it('should have custom validators assigned', () => {
      expect(form.inputTest.$validators).to.not.be.empty;
    });

    it('should have custom emailValid validator assigned', () => {
      expect(form.inputTest.$validators.emailValid).to.not.be.undefined;
    });

    it('should have custom passFormat validator assigned', () => {
      expect(form.inputTest.$validators.emailValid).to.not.be.undefined;
    });
  });

  describe('$validator emailValid', () => {
    it('should not be valid when a value of 0 characters is supplied', () => {
      form.inputTest.$setViewValue('');
      expect(form.inputTest.$error.emailValid).to.be.true;
    });

    it('should not be valid when a value less than 4 characters is supplied', () => {
      form.inputTest.$setViewValue('tes');
      expect(form.inputTest.$error.emailValid).to.be.true;
    });

    it('should be valid when a valid email is supplied', () => {
      form.inputTest.$setViewValue('test@test.dev');
      expect(form.inputTest.$error.emailValid).to.be.undefined;
    });

    it('should not be valid when an invalid email is passed', () => {
      form.inputTest.$setViewValue('testtes@.');
      expect(form.inputTest.$error.emailValid).to.be.true;
    });
  });
});

/* eslint-enable */
