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
          <input ng-model="model.testVal" id="testID" name="inputTest" ap-pass-valid>
        </form>`);
    $compile(element)($scope);
    $rootScope.$digest();
    form = $scope.testForm;
  }));

  describe('$validators setup', () => {
    it('should have custom validators assigned', () => {
      expect(form.inputTest.$validators).to.not.be.empty;
    });

    it('should have custom passLength validator assigned', () => {
      expect(form.inputTest.$validators.passLength).to.not.be.undefined;
    });

    it('should have custom passFormat validator assigned', () => {
      expect(form.inputTest.$validators.passFormat).to.not.be.undefined;
    });
  });

  describe('$validator passLength', () => {
    it('should not be valid when a value of 0 characters is supplied', () => {
      form.inputTest.$setViewValue('');
      expect(form.inputTest.$error.passLength).to.be.true;
    });

    it('should not be valid when a value less than 4 characters is supplied', () => {
      form.inputTest.$setViewValue('tes');
      expect(form.inputTest.$error.passLength).to.be.true;
    });

    it('should be valid when a value 4 characters long is supplied', () => {
      form.inputTest.$setViewValue('test');
      expect(form.inputTest.$error.passLength).to.be.undefined;
    });

    it('should be valid when a value more than 8 characters long is supplied', () => {
      form.inputTest.$setViewValue('testtesttest');
      expect(form.inputTest.$error.passLength).to.be.undefined;
    });
  });

  describe('$validator passFormat', () => {
    it('should not be valid when no value supplied', () => {
      form.inputTest.$setViewValue('');
      expect(form.inputTest.$error.passFormat).to.be.true;
    });

    it('should not be valid when only lower case letters are supplied', () => {
      form.inputTest.$setViewValue('test');
      expect(form.inputTest.$error.passFormat).to.be.true;
    });

    it('should not be valid when only upper case letters are supplied', () => {
      form.inputTest.$setViewValue('TEST');
      expect(form.inputTest.$error.passFormat).to.be.true;
    });

    it('should not be valid when only numbers are supplied', () => {
      form.inputTest.$setViewValue('1234');
      expect(form.inputTest.$error.passFormat).to.be.true;
    });

    it('should not be valid when only lower case and upper case letters are supplied', () => {
      form.inputTest.$setViewValue('tT');
      expect(form.inputTest.$error.passFormat).to.be.true;
    });

    it('should not be valid when only lower case letters and numbers are supplied', () => {
      form.inputTest.$setViewValue('12');
      expect(form.inputTest.$error.passFormat).to.be.true;
    });

    it('should not be valid when only upper case letters and numbers are supplied', () => {
      form.inputTest.$setViewValue('T1');
      expect(form.inputTest.$error.passFormat).to.be.true;
    });

    it('should be valid when one lower case letter, upper case letter and number are supplied',
      () => {
        form.inputTest.$setViewValue('tT1');
        expect(form.inputTest.$error.passFormat).to.be.undefined;
      });
  });
});

/* eslint-enable */
