// =============================================================================
//
//  app/routes/account/settings/components/user-details/user-details-component.js
//
//
//
// =============================================================================

// import alrUserDetailsFormComponent
//   from '../../../../../../../components/alr-user-details-form/alr-user-details-form-component';
import UserDetailsController from './user-details-controller';

import template from './user-details.html';

const userDetailsModule = angular.module('userDetailsModule', [
  // alrUserDetailsFormComponent,
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
