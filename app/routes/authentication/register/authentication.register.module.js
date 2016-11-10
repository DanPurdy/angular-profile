// ==============================================================================
//
//  app/routes/authentication/register/authentication.register.module.js
//
// ==============================================================================

// ==============================================================================
//  Config
// ==============================================================================

import authRegisterConfig from './authentication.register.config';

// ==============================================================================
//  Components
// ==============================================================================

import ApRegisterFormContainer
  from './components/register-form-container/register-form-container-component';

// ==============================================================================
//  Directives
// ==============================================================================

// ==============================================================================
//  Module
// ==============================================================================

const authRegisterModule = angular.module('angularProfile.authentication.register', [
  ApRegisterFormContainer,
])
  .config(authRegisterConfig);

export default authRegisterModule.name;
