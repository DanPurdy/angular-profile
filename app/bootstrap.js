// ==============================================================================
//
//  bootstrap.js
//
//
//
// ==============================================================================

// Import polyfills for es6 to es5
import 'babel-polyfill';

// Import angular
import 'angular';

// Import our app module
import apModule from './app';

// Core - Models
import './core/model/model.config';

// Core - Services
import './core/services/services.config';

// app config and run settings
import './app.config';
import './app.run';

// bootstrap angular
angular.element(document).ready(() => {
  angular.bootstrap(document, [apModule.name], {
    strictDi: true,
  });
});
