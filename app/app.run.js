import { ACCESS_LEVELS, AUTH_URL } from './core/constants/constants';

/**
 * Our apps config function. We require this within our main app module
 *
 * @param {Object} $rootScope - The root scope provider
 * @param {Object} AuthenticationService - Our authentication service
 * @param {Object} TokenModel - Our token model
 * @param {Object} $state - Ui router $state object
 * @param {Object} Restangular - Restangular
 * @param {Object} ErrorService - Our error service
 * @param {Object} $log - Angulars log provider
 */
export default angular.module('angularProfile')
  .run((
    $rootScope,
    AuthenticationService,
    TokenModel,
    $state,
    Restangular,
    $log,
  ) => {
    'ngInject';

    /* eslint-disable no-param-reassign */
    $rootScope.currentUser = AuthenticationService.getCurrentUser();
    $rootScope.ACCESS_LEVELS = ACCESS_LEVELS;
    $rootScope.messages = [];

    // TODO remimplement later and look into angular permissions
    // rootscope on methods should be assigned to variables in order to be deleted
    // in a $destroy event handler
    // https://github.com/Gillespie59/eslint-plugin-angular/blob/master/docs/on-watch.md
    // Watch for any state changes and handle route authentication etc
    // const loadStateStart = $rootScope // eslint-disable-line no-unused-vars
    //   .$on('$stateChangeStart', (event, toState) => {
    //     ErrorService.clearErrors();
    //     $rootScope.isLoading = true;
    //     if (!('data' in toState) || !('access' in toState.data)) {
    //       event.preventDefault();
    //       $state.go('403');
    //     } else if (!AuthenticationService.isAuthorized(toState.data.access) &&
    //       toState.name !== 'auth.login'
    //     ) {
    //       event.preventDefault();
    //       if (AuthenticationService.isAuthenticated() && AuthenticationService.isExpired()) {
    //         $state.go('auth.login');
    //       } else if (AuthenticationService.isAuthenticated()) {
    //         $state.go('403');
    //       } else if (!AuthenticationService.isAuthenticated() &&
    //         $state.current.name === 'auth.login'
    //       ) {
    //         $rootScope.isLoading = false;
    //         return;
    //       } else {
    //         $state.go('auth.login');
    //       }
    //     } else if (
    //       AuthenticationService.isAuthenticated() &&
    //       toState.name === 'auth.login' &&
    //       !AuthenticationService.isExpired()
    //     ) {
    //       event.preventDefault();
    //       $state.go('helpdesk.dashboard.enquiries');
    //     }
    //   });

    // Watch for our state change success
    const loadStateComplete = $rootScope // eslint-disable-line no-unused-vars
      .$on('$stateChangeSuccess', () => {
        $rootScope.isLoading = false;
      });

    // Watch and handle any state change errors
    const loadStateError = $rootScope // eslint-disable-line no-unused-vars
      .$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
        $rootScope.isLoading = false;
        event.preventDefault();
        $log.error(error.stack);
        $state.go('500');
      });
    // Watch for logout events and handle them
    const logoutHandler = $rootScope // eslint-disable-line no-unused-vars
      .$on('loggedOut', () => {
        $rootScope.status.loggedIn = false;
      });

    // Add a request interceptor to make sure our token is injected into the headers for all calls
    Restangular.addFullRequestInterceptor((element, operation, route, url, headers, params) => {
      const currentHeaders = headers;
      if (route !== AUTH_URL) {
        currentHeaders.Authorization = TokenModel.get();
      }

      return {
        element,
        params,
        currentHeaders,
      };
    });
    /* eslint-disable */
    // Restangular.setErrorInterceptor((response) => {
    //   if (response.config.method === 'GET') {
    //     switch (response.status) {
    //       case 404:
    //         $state.go('404');
    //         ErrorService.registerError(
    //           'err',
    //           'You tried to access a resource that either doesn\'t exist or you\'re ' +
    //           'not authorised to access.'
    //         );
    //         return false;
    //       case 403:
    //         if (AuthenticationService.isExpired()) {
    //           $state.go('/login');
    //           ErrorService.registerError(
    //             'warn',
    //             'Your session expired, please login and try again');
    //         } else {
    //           $state.go('403');
    //           ErrorService.registerError(
    //             'warn',
    //             'You tried to access a resource for which you don\'t have access. ' +
    //             'If you feel this is incorrect please contact an admin.'
    //           );
    //         }
    //         return false;
    //       default:
    //         // we return true here as if the error isn't handled we'll catch it further up the chain
    //         return true;
    //     }
    //   }
    //
    //   if (response.config.method === 'POST') {
    //     switch (response.status) {
    //       case 400:
    //         $rootScope.loading = false;
    //         ErrorService.registerError(
    //           'warn',
    //           'Something just went wrong with the data you tried to send. Please try again.'
    //         );
    //         // return true so our form service can handle the error also
    //         return true;
    //       case 403:
    //         // ErrorService.registerError(
    //         //   'err',
    //         //   'It looks like you don\'t have the correct permissions to do that. ' +
    //         //   'If you feel this is incorrect please contact an admin user.'
    //         // );
    //         /*
    //          * 403's aren't handled by our form service so we class it as handled
    //          * once this is done here.
    //          */
    //         return false;
    //       default:
    //         // we return true here as if the error isn't handled we'll catch it further up the chain
    //         return true;
    //     }
    //   }
    //
    //   return true; // error not handled
    // });
    /* eslint-enable */
    /* eslint-enable */
  });
