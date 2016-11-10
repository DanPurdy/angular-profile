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

import AlrRegisterFormComplete
  from './components/register-form-complete/register-form-complete-component';
import AlrRegisterFormContainer
  from './components/register-form-container/register-form-container-component';

// ==============================================================================
//  Directives
// ==============================================================================

// ==============================================================================
//  Module
// ==============================================================================

const authRegisterModule = angular.module('angularProfile.authentication.register', [
  AlrRegisterFormComplete,
  AlrRegisterFormContainer,
])
  .config(authRegisterConfig);

export default authRegisterModule.name;
