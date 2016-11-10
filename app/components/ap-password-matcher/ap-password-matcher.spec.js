// =============================================================================
//
//  app/components/ap-password-matcher/ap-password-matcher.spec.js
//
// =============================================================================

'use-strict';

/* eslint-disable no-unused-expressions */

import apPasswordMatcher from './ap-password-matcher';

describe('apPasswordMatcher', () => {
  const validTemplate = '<input ng-model="confirmation" ap-pass-match="original"></input>';
  let $scope;
  let $compile;
  let compiled;

  beforeEach(
    angular.mock.module(apPasswordMatcher),
  );

  beforeEach(inject((_$compile_, _$rootScope_) => {
    $scope = _$rootScope_.$new();
    $compile = _$compile_;
  }));

  describe('$validators setup', () => {
    it('does not throw when no ngModel controller is found', () => {
      const naTemplate = '<div ap-pass-match="original"></div>';
      compiled = $compile(naTemplate)($scope);
      $scope.$digest();
    });


    it('is limited to attribute invocation', () => {
      const spy = sinon.spy($scope, '$watch');
      const naTemplates = [
        '<div class="ap-pass-match"></div>',
        '<ap-pass-match></ap-pass-match>',
      ];

      naTemplates.forEach(templ => {
        compiled = $compile(templ)($scope);
        $scope.$digest();
        expect(spy).to.have.been.not.called;
      });
      spy.reset();
    });
  });

  describe('$validator passMatch', () => {
    it('returns true if no model value has been defined', () => {
      compiled = $compile(validTemplate)($scope);
      expect($scope.confirmation).to.be.undefined;
      $scope.$digest();
      expect(compiled.hasClass('ng-valid')).to.be.true;
    });


    it('returns true if $modelValue are identical', () => {
      $scope.confirmation = 'value';
      compiled = $compile(validTemplate)($scope);
      $scope.original = 'value';
      $scope.$digest();
      expect(compiled.hasClass('ng-valid')).to.be.true;
    });

    it('returns false if $modelValue are not identical', () => {
      $scope.confirmation = false;
      $scope.original = undefined;
      compiled = $compile(validTemplate)($scope);
      $scope.$digest();
      expect(compiled.hasClass('ng-valid')).to.be.false;
    });
  });

  describe('Form level validation', () => {
    let form;
    let element;
    const inputValue = 'testValue';

    beforeEach(() => {
      element = angular.element(
        `<form name="form">
        <input type="text" ng-model="test" name="test"></input>
        <input type="text"
          ap-pass-match="form.test" ng-model="testConfirm" name="testConfirm">
        </input>
        </form>`);
      $scope.test = inputValue;
      $compile(element)($scope);
      $scope.$digest();
      form = $scope.form;
    });

    it('should check if $viewValues are identical', () => {
      form.testConfirm.$setViewValue(inputValue);
      $scope.$digest();
      expect(form.testConfirm.$error.match).to.be.undefined;
    });

    it('should check if $viewValues are not identical', () => {
      form.testConfirm.$setViewValue(`${inputValue} falseValue`);
      $scope.$digest();
      expect(form.testConfirm.$error.passMatch).to.be.true;
    });

    it('should set $modelValue undefined if $viewValues are not identical', () => {
      form.testConfirm.$setViewValue(`${inputValue} falseValue`);
      $scope.$digest();
      expect(form.testConfirm.$modelValue).to.be.undefined;
    });
  });
});

/* eslint-enable */
