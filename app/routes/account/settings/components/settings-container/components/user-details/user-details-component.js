// =============================================================================
//
//  app/routes/account/settings/components/user-details/user-details-component.js
//
// =============================================================================

// import apUserDetailsFormComponent
//   from '../../../../../../../components/ap-user-details-form/ap-user-details-form-component';
import UserDetailsController from './user-details-controller';

import template from './user-details.html';

const userDetailsModule = angular.module('userDetailsModule', [
  // apUserDetailsFormComponent,
])
  .component('userDetails', {
    template,
    controller: UserDetailsController,
    controllerAs: 'userDetailsVm',
    bindings: {
      user: '<',
      isSubmitting: '<',
      result: '<',
      onSave: '&',
    },
  },
);

export default userDetailsModule.name;
