// ==============================================================================
//
//  app/core/constants/constants.js
//
// ==============================================================================

// ==============================================================================
//  App
// ==============================================================================

export const AUTH_URL = 'authenticate';
// See the webpack config for __API_URL__ definition
export const BASE_API_URL = __API_URL__; // eslint-disable-line no-undef
export const HEADER_API_VERSION = 'application/json;version=1.0';
export const USER_PROFILE_STATUSES = Object.freeze({ ENABLED: 'enabled', DISABLED: 'disabled' });

// ==============================================================================
//  User Roles / Permissions
// ==============================================================================

export const USER_ROLES = Object.freeze({
  USER: 'ROLE_USER',
  ADMIN: 'ROLE_ADMIN',
});

export const ACCESS_LEVELS = Object.freeze({
  public: ['*'],
  user: [USER_ROLES.USER, USER_ROLES.ADMIN],
  admin: [USER_ROLES.ADMIN],
});

// ==============================================================================
// Date
// ==============================================================================

export const SHORT_DATE_FORMAT = 'dd/MM/yy';
