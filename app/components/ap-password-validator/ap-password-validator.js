// =============================================================================
//
//  app/components/ap-password-validator/ap-password-validator-directive.js
//
// =============================================================================

'use-strict';

const passwordValidator = angular.module('apPasswordValidator', []);

/**
 * Password validator handles the validaton of passwords entered by users
 *
 * @returns {Object} Directive instantiation options
 */
function PasswordValidator() {
  'ngInject';

  return {
    require: 'ngModel',
    link: (scope, element, attrs, ngModel) => {
      const ctrl = ngModel;
      if (!ctrl) return; // do nothing if no ng-model
      const validator = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/);

      ctrl.$validators.passFormat = val => (
        validator.test(val)
      );
      ctrl.$validators.passLength = val => {
        if (val) {
          return val.length >= 4;
        }
        return false;
      };
    },
  };
}

passwordValidator.directive('apPassValid', PasswordValidator);

export default passwordValidator.name;
