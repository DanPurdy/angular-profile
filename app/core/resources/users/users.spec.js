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

    describe('validateToken', () => {
      const token = false;
      const newRoute = `/users/activate/${token}`;

      it('should call the validateToken POST endpoint', () => {
        $httpBackend.expectPOST(`${newRoute}`).respond(token);

        usersResource.validateToken(token);
        $httpBackend.flush();
      });
    });

    // ==============================================================================
    //  invite
    // ==============================================================================

    describe('invite', () => {
      it('should call the correct child invite endpoint', () => {
        const userId = 1;
        const inviteRoute = `/users/${userId}/children/invite`;
        $httpBackend.expectPOST(`${inviteRoute}`).respond();

        usersResource.invite('test@test.com', userId);
        $httpBackend.flush();
      });
    });

    // ==============================================================================
    //  getPendingInvites
    // ==============================================================================

    describe('getPendingInvites', () => {
      it('should call the correct pending children response endpoint', () => {
        const userId = 1;
        const childRoute = `/users/${userId}/children/invite`;
        $httpBackend.whenGET(`${childRoute}`).respond([]);

        usersResource.getPendingInvites(userId);
        $httpBackend.expectGET(`${childRoute}`);
        $httpBackend.flush();
      });
    });

    // ==============================================================================
    //  inviteRespond
    // ==============================================================================

    describe('inviteRespond', () => {
      it('should call the correct child invite response endpoint', () => {
        const userId = 1;
        const childRoute = `/users/${userId}/children`;
        $httpBackend.expectPOST(`${childRoute}`).respond();

        usersResource.inviteRespond({ accept: true }, userId);
        $httpBackend.flush();
      });
    });

    // ==============================================================================
    //  getChildren
    // ==============================================================================

    describe('getChildren', () => {
      it('should call the correct children response endpoint', () => {
        const userId = 1;
        const childRoute = `/users/${userId}/children`;
        $httpBackend.whenGET(`${childRoute}`).respond([]);

        usersResource.getChildren(userId);
        $httpBackend.expectGET(`${childRoute}`);
        $httpBackend.flush();
      });
    });

    // ==============================================================================
    //  removeChild
    // ==============================================================================

    describe('removeChild', () => {
      it('should call the correct remove children response endpoint', () => {
        const userId = 1;
        const childId = 2;
        const childRoute = `/users/${userId}/children/${childId}`;
        $httpBackend.expectDELETE(`${childRoute}`).respond();

        usersResource.removeChild(userId, childId);
        $httpBackend.flush();
      });
    });

    // ==============================================================================
    //  removeInvite
    // ==============================================================================

    describe('removeInvite', () => {
      it('should call the correct remove children response endpoint', () => {
        const inviteId = 2;
        const inviteRoute = `/invites/${inviteId}`;
        $httpBackend.expectDELETE(`${inviteRoute}`).respond();

        usersResource.removeInvite(inviteId);
        $httpBackend.flush();
      });
    });

    // ==============================================================================
    //  getRegistrations
    // ==============================================================================

    describe('getRegistrations', () => {
      it('should call the correct registrations response endpoint', () => {
        const userId = 1;
        const registrationsRoute = `/users/${userId}/registrations`;
        $httpBackend.whenGET(`${registrationsRoute}`).respond([]);

        usersResource.getRegistrations(userId);
        $httpBackend.expectGET(`${registrationsRoute}`);
        $httpBackend.flush();
      });
    });

    // ==============================================================================
    //  getSearchCases
    // ==============================================================================

    describe('getSearchCases', () => {
      it('should call the correct search cases response endpoint', () => {
        const userId = 1;
        const searchCasesRoute = `/users/${userId}/search-cases`;
        $httpBackend.whenGET(`${searchCasesRoute}`).respond([]);

        usersResource.getSearchCases(userId);
        $httpBackend.expectGET(`${searchCasesRoute}`);
        $httpBackend.flush();
      });
    });

    // ==============================================================================
    //  getPayments
    // ==============================================================================

    describe('getPayments', () => {
      it('should call the correct search cases response endpoint', () => {
        const userId = 1;
        const paymentsRoute = `/users/${userId}/payments`;
        $httpBackend.whenGET(`${paymentsRoute}`).respond([]);

        usersResource.getPayments(userId);
        $httpBackend.expectGET(`${paymentsRoute}`);
        $httpBackend.flush();
      });
    });

    // ==============================================================================
    //  getCredits
    // ==============================================================================

    describe('getCredits', () => {
      it('should call the correct search cases response endpoint', () => {
        const userId = 1;
        const creditsRoute = `/users/${userId}/credits`;
        $httpBackend.whenGET(`${creditsRoute}`).respond([]);

        usersResource.getCredits(userId);
        $httpBackend.expectGET(`${creditsRoute}`);
        $httpBackend.flush();
      });
    });

    // ==============================================================================
    //  getPaymentForm
    // ==============================================================================

    describe('getPaymentForm', () => {
      it('should call the correct endpoint to load the credit payment form', () => {
        const userId = 1;
        const currency = { currency: 'GBP' };
        const paymentFormRoute = `/users/${userId}/payment-form-details`;
        $httpBackend.whenPOST(`${paymentFormRoute}`, currency).respond({});

        usersResource.getPaymentForm(userId, currency);
        $httpBackend.expectPOST(`${paymentFormRoute}`, currency);
        $httpBackend.flush();
      });
    });
  });
});

/* eslint-enable */
