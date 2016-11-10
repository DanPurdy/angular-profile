// ==============================================================================
//
//  app/core/models/resources/authentication/authentication.spec.js
//
//
//
// ==============================================================================

/* eslint-disable no-unused-expressions */

import { AUTH_URL } from '../../constants/constants';
import AuthenticationResource from './authentication';

describe('AuthenticationResource', () => {
  const credentials = {
    _username: 'test',
    _password: 'testtest',
  };
  const authUrl = `/${AUTH_URL}`;
  let authenticationResource;
  let Restangular;
  let $httpBackend;

  beforeEach(
    angular.mock.module('mockApp', 'restangular'),
  );

  // inject dependencies
  beforeEach(inject($injector => {
    Restangular = $injector.get('Restangular');
    $httpBackend = $injector.get('$httpBackend');
  }));

  // Create a new instance of our resource
  beforeEach(() => {
    authenticationResource = new AuthenticationResource(Restangular);
  });

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should set the login route correctly', () => {
    expect(authenticationResource.route).to.equal(AUTH_URL);
  });

  it('should have "Restangular" property set to Restangular', () => {
    expect(authenticationResource.Restangular).to.deep.equal(Restangular);
  });

  it('should call the login check endpoint with the provided `credentials`', () => {
    $httpBackend.whenPOST('/login_check', credentials).respond(() => [200]);

    const spy = sinon.spy(authenticationResource, 'login');

    authenticationResource.login(credentials).then(() => {
      spy.should.have.been.calledWith(credentials);
      spy.should.have.been.calledOnce;
    });

    $httpBackend.expectPOST(authUrl, credentials);
    $httpBackend.flush();
    spy.reset();
  });

  it('should call the logout endpoint', () => {
    $httpBackend.whenGET('/logout').respond(() => [200, []]);

    const spy = sinon.spy(authenticationResource, 'logout');

    authenticationResource.logout()
      .then(response => {
        expect(Restangular.stripRestangular(response)).to.deep.equal([]);
        spy.should.have.been.calledOnce;
      });

    $httpBackend.expectGET('/logout');
    $httpBackend.flush();
    spy.reset();
  });
});

/* eslint-enable */
