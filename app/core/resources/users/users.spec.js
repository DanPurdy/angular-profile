// ==============================================================================
//
//  app/core/resources/users/users.spec.js
//
//
//
// ==============================================================================

/* eslint-disable no-unused-expressions */

import UsersResource from './users';

describe('UsersResource', () => {
  let usersResource;
  let Restangular;
  let $httpBackend;

  beforeEach(angular.mock.module('mockApp', 'restangular'));

  beforeEach(inject($injector => {
    Restangular = $injector.get('Restangular');
    $httpBackend = $injector.get('$httpBackend');
    usersResource = new UsersResource(Restangular);
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should set the route correctly', () => {
    expect(usersResource.route).to.equal('users');
  });

  it('should have "Restangular" property set to Restangular', () => {
    expect(usersResource.Restangular).to.deep.equal(Restangular);
  });

  it('should inherit the abstract resources methods', () => {
    expect(usersResource.getList).to.exist;
  });

  describe('methods', () => {
    describe('checkAvailability', () => {
      const route = '/users/check';
      const item = {
        parameter: 'email',
        value: 'test@test.dev',
      };
      const expectedResponse = { exists: true };

      it('should call the checkAvailability POST resource', () => {
        $httpBackend.whenPOST(`${route}`, item).respond(expectedResponse);

        usersResource.checkAvailability(item)
          .then(response => {
            expect(Restangular.stripRestangular(response)).to.deep.equal(expectedResponse);
          });
        $httpBackend.expectPOST(`${route}`);
        $httpBackend.flush();
      });
    });

    describe('register', () => {
      const route = '/users/register';
      const item = {
        email: 'email',
      };
      const expectedResponse = Object.assign({ id: 1 }, item);

      it('should call the checkAvailability POST resource', () => {
        $httpBackend.expectPOST(`${route}`, item).respond(expectedResponse);

        usersResource.register(item)
          .then(response => {
            expect(Restangular.stripRestangular(response)).to.deep.equal(expectedResponse);
          });
        $httpBackend.flush();
      });
    });
  });
});

/* eslint-enable */
