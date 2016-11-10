// ==============================================================================
//
//  app/test.js
//
// ==============================================================================


/* eslint-disable no-unused-vars,import/no-extraneous-dependencies */
const testsContext = require.context('.', true, /.spec$/);
const mockApp = angular.module('mockApp', []);
const sinonChai = require('sinon-chai');

chai.should();
chai.use(sinonChai);

testsContext.keys().forEach(testsContext);
/* eslint-enable */
