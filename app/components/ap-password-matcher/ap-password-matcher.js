// =============================================================================
//
//  app/components/ap-password-matcher/ap-password-matcher.js
//
// =============================================================================

'use-strict';

const passwordMatcher = angular.module('apPasswordMatcher', []);

/**
 * Password validator handles the validaton of passwords entered by users
 *
 * @param {Function} $parse - Angular $parse method
 * @returns {Object} Directive instantiation options
 */
function PasswordMatcher($parse) {
  'ngInject';

  return {
    require: '?ngModel',
    restrict: 'A',
    link: (scope, element, attrs, ngModel) => {
      const ctrl = ngModel;
      if (!ctrl || !attrs.apPassMatch) return;

      const matchGetter = $parse(attrs.apPassMatch);
      const getMatchValue = () => {
        let match = matchGetter(scope);
        if (angular.isObject(match) && {}.hasOwnProperty.call(match, '$viewValue')) {
          match = match.$viewValue;
        }
        return match;
      };

      ctrl.$validators.passMatch = (modelVal, viewVal) => {
        const matcher = modelVal || viewVal;
        const match = getMatchValue();
        return match === matcher;
      };
    },
  };
}

passwordMatcher.directive('apPassMatch', PasswordMatcher);

export default passwordMatcher.name;
