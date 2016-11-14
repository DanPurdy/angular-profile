// =============================================================================
//
//  app/components/ap-email-valid/ap-email-valid.js
//
// =============================================================================

'use-strict';

const emailValid = angular.module('apEmailValid', []);

/**
 * email validator handles the validaton of emails entered by users
 *
 * @returns {Object} Directive instantiation options
 */
function EmailValid() {
  'ngInject';

  return {
    require: '?ngModel',
    restrict: 'A',
    link: (scope, element, attrs, ngModel) => {
      const ctrl = ngModel;
      if (!ctrl) return; // do nothing if no ng-model
      const validator = new RegExp(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      );

      ctrl.$validators.emailValid = val => (
        validator.test(val)
      );
    },
  };
}

emailValid.directive('apEmailValid', EmailValid);

export default emailValid.name;
