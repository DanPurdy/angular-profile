// ==============================================================================
//
//  app.js
//
// ==============================================================================
/* eslint-disable import/first */
// Animation
import 'angular-animate';
// Router
import 'angular-ui-router';
// Angular Storage
import 'angular-storage';
// Angular JWT
import 'angular-jwt';
// ng-messages
import 'angular-messages';
// Restangular
/* eslint-disable */
let _ = window._ || require('lodash'); // Required for Restangular to work when importing
/* eslint-enable */
import 'restangular'; // eslint-disable-line import/first

// Icons
import 'font-awesome/css/font-awesome.css'; // eslint-disable-line import/first
// Bootstrap
import 'bootstrap-css-only/css/bootstrap.css'; // eslint-disable-line import/first
// Custom Styles
import './styles/main.scss'; // eslint-disable-line import/first
// import 'ui.bootstrap';
const uiBootstrap = require('angular-ui-bootstrap');

// ==============================================================================
//  Core - Resources
// ==============================================================================

import './core/resources/resources.config';
import coreServicesModule from './core/services/services.config';

// ==============================================================================
//  Route Modules
// ==============================================================================

import authentication from './routes/authentication/authentication.module';
import errorRoutes from './routes/error/error.module';
import userAccount from './routes/account/account.module';

// ==============================================================================
//  Components
// ==============================================================================

// import alrLoginModule from './components/alr-login/alr-login-component';

// import AlrContainerModule from './components/alr-container/alr-container-component';

/* eslint-enable */

// ==============================================================================
//  App Module
// ==============================================================================

const alr = angular.module('angularProfile', [
  // UI Router should be top for all other dependencies
  'ui.router',
  'ngAnimate',
  'angular-jwt',
  'angular-storage',
  'ngMessages',
  'restangular',
  uiBootstrap,
  'angularProfile.coreResources',
  coreServicesModule,
  authentication,
  errorRoutes,
  // AlrContainerModule,
  // alrLoginModule,
  userAccount,
]);

export default alr;