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

    const isPublicRoute = toState => (
      ['authentication.login.form', 'authentication.register.form'].indexOf(toState.name) !== -1
    );

    const isErrorRoute = toState => (
      ['403', '404', '500'].indexOf(toState.name) !== -1
    );

    // Watch for any state changes and handle route authentication etc
    const loadStateStart = $rootScope // eslint-disable-line no-unused-vars
      .$on('$stateChangeStart', (event, toState) => { // eslint-disable-line consistent-return
        if (toState.name === 'angularProfile.root') {
          event.preventDefault();
          $state.go('authentication.login.form');
        }
        if (!('data' in toState) || !('access' in toState.data)) {
          event.preventDefault();
          $state.go('403');
        } else if (AuthenticationService.isAuthenticated()) {
          if (isPublicRoute(toState) && !AuthenticationService.isExpired()) {
            event.preventDefault();
            $state.go('angularProfile.account.settings');
          } else if (AuthenticationService.isExpired() && !isPublicRoute(toState)) {
            event.preventDefault();
            $state.go('authentication.login.form', { expired: true });
          } else if (
            !AuthenticationService.isAuthorized(toState.data.access) &&
            !isPublicRoute(toState)
          ) {
            event.preventDefault();
            $state.go('403');
          }
        } else if (!AuthenticationService.isAuthenticated()) {
          if (!isPublicRoute(toState) && !isErrorRoute(toState)) {
            event.preventDefault();
            $state.go('authentication.login.form');
          }
        }
      });

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

    // Add a request interceptor to make sure our token is injected into the headers for all calls
    Restangular.addFullRequestInterceptor((element, operation, route, url, headers, params) => {
      const currentHeaders = headers;
      if (route !== AUTH_URL) {
        currentHeaders.Authorization = TokenModel.get();
      }
      if (AuthenticationService.isExpired()) {
        $state.go('authentication.login.form', { expired: true });
        return false;
      }

      return {
        element,
        params,
        currentHeaders,
      };
    });
    /* eslint-enable */
  });
