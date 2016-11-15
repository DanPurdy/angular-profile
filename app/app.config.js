import {
  ACCESS_LEVELS,
  BASE_API_URL,
  HEADER_API_VERSION,
} from './core/constants/constants';


/**
 * Our apps config function. We require this within our main app module
 *
 * @param {Object} $stateProvider - The ui router state provider service
 * @param {Object} $locationProvider - The angular location provider service
 * @param {Object} $windowProvider - The angular window provider service
 * @param {Object} $urlRouterProvider - The ui router url router provider service
 * @param {Object} RestangularProvider - Restangulars provider service
 */
export default angular.module('angularProfile')
  .config((
    $stateProvider,
    $locationProvider,
    $windowProvider,
    $urlRouterProvider,
    RestangularProvider,
  ) => {
    'ngInject';

    const $window = $windowProvider.$get();

    $stateProvider.state('angularProfile', {
      url: '',
      abstract: true,
      template: '<div ui-view></div>',
      data: {
        access: ACCESS_LEVELS.public,
      },
    }).state('angularProfile.root', {
      url: '/',
      template: 'Hello',
      data: {
        access: ACCESS_LEVELS.public,
      },
    });
    $urlRouterProvider.otherwise('404');

    if ($window.history && $window.history.pushState) {
      $locationProvider.html5Mode({
        enabled: true,
        requireBase: true,
      });
    }

    RestangularProvider
      .setBaseUrl(BASE_API_URL)
      .setDefaultHeaders({
        Accept: HEADER_API_VERSION,
      });
  });
