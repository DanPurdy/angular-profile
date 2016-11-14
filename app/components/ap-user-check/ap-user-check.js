// =============================================================================
//
//  app/components/ap-user-check/ap-user-check.js
//
// =============================================================================

'use-strict';

const userCheck = angular.module('apUserCheck', []);

/**
 * User check handles the availability of usernames/emails entered by users
 *
 * @param {Object} UserService - Our User service
 * @param {Object} $q - Angular Async provider helper service
 * @returns {Object} Directive instantiation options
 */
function UserCheck(UserService, $q) {
  'ngInject';

  return {
    require: '?ngModel',
    restrict: 'A',
    link: (scope, element, attrs, ngModel) => {
      const ctrl = ngModel;
      if (!ctrl || !attrs.apUserCheck) return;

      ctrl.$asyncValidators.emailAvailable = (modelVal, viewVal) => {
        const deferred = $q.defer();

        if (!modelVal || !viewVal) {
          deferred.resolve();
        } else {
          const value = modelVal || viewVal;

          if (attrs.apUserCheck !== 'email') {
            deferred.resolve();
          }

          UserService.checkAvailability('email', value)
          .then(data => {
            if (data && data.exists) {
              return deferred.reject();
            } else if (!data) {
              return Promise.reject('No data');
            }
            return deferred.resolve();
          })
          .catch(() => deferred.reject());
        }

        return deferred.promise;
      };

      ctrl.$asyncValidators.userNameValid = (modelVal, viewVal) => {
        const deferred = $q.defer();

        if (!modelVal || !viewVal) {
          deferred.resolve();
        } else {
          const value = modelVal || viewVal;

          if (attrs.apUserCheck !== 'username') {
            deferred.resolve();
          }

          UserService.checkAvailability('username', value)
            .then(data => {
              if (data && data.exists) {
                return deferred.reject();
              } else if (!data) {
                return Promise.reject('No data');
              }
              return deferred.resolve();
            })
            .catch(() => deferred.reject());
        }

        return deferred.promise;
      };
    },
  };
}

userCheck.directive('apUserCheck', UserCheck);

export default userCheck.name;
