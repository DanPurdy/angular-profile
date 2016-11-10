// ==============================================================================
//
//  app/core/models/users/users.spec.js
//
//
//
// ==============================================================================

/* eslint-disable no-unused-expressions */

import { BASE_API_URL } from '../../constants/constants';
import { APP_URL, ST_REDIRECT_URL_RULE, SUCCESS_REDIRECT_URL } from '../../constants/payments';

import UsersModel from './users';
import UsersResource from '../../resources/users/users';

angular.mock.module('angularProfile');

describe('UsersModel', () => {
  let usersModel;
  let usersResource;
  let Restangular;

  beforeEach(
    angular.mock.module('mockApp', 'restangular'),
  );

  beforeEach(inject($injector => {
    Restangular = $injector.get('Restangular');
  }));

  beforeEach(() => {
    usersResource = new UsersResource(Restangular, 'users');
    usersModel = new UsersModel(usersResource);
  });
  describe('instantiation', () => {
    it('should have "resource" property', () => {
      expect(usersModel.resource).to.exist;
    });

    it('resource property should be UsersResource', () => {
      expect(usersModel.resource).to.deep.equal(usersResource);
    });

    it('should have extended our abstract properties', () => {
      expect(usersModel.item).to.exist;
      expect(usersModel.item).to.be.empty;
      expect(usersModel.item).to.be.an('object');
      expect(usersModel.collection).to.exist;
      expect(usersModel.collection).to.be.empty;
      expect(usersModel.collection).to.be.an('array');
    });

    it('should have extended our abstract methods', () => {
      expect(usersModel.initItem).to.exist;
    });
  });

  describe('methods', () => {
    describe('checkAvailability', () => {
      it('should have a checkAvailability method', () => {
        expect(usersModel.checkAvailability).to.be.a('function');
      });

      it('should pass arguments in an object to our resource', () => {
        const stub = sinon.stub(usersModel.resource, 'checkAvailability', () => false);

        usersModel.checkAvailability('username', 'test@test.dev');
        expect(stub).to.have.been.calledWithExactly(
          {
            parameter: 'username',
            value: 'test@test.dev',
          });
        stub.restore();
      });

      it('should assign a parameter of username by default', () => {
        const stub = sinon.stub(usersModel.resource, 'checkAvailability', () => false);

        usersModel.checkAvailability();
        expect(stub).to.have.been.calledWithExactly(
          {
            parameter: 'username',
            value: undefined,
          });
        stub.restore();
      });
    });

    describe('register', () => {
      const item = {
        id: 1,
        test: 'test',
        cas: 'cas',
      };

      it('should have a register method', () => {
        expect(usersModel.register).to.be.a('function');
      });

      it('should pass our registration object to our resource register method', () => {
        const stub = sinon.stub(usersModel.resource, 'register', () => Promise.resolve(true));

        usersModel.register(item);

        expect(stub).to.have.been.calledWithExactly(item);
      });

      it('should save the response to our item property and return it', done => {
        expect(usersModel.getItem()).to.deep.equal({});

        const stub = sinon.stub(usersModel.resource, 'register', () => Promise.resolve(item));

        usersModel.register(item)
          .then(result => {
            expect(Restangular.stripRestangular(result)).to.deep.equal(item);
            expect(result).to.deep.equal(item);
            stub.should.have.been.calledWith(item);
            stub.should.have.been.calledOnce;
            done();
          }).catch(error => {
            done(error);
          });

        stub.restore();
      });

      it('should return an empty response warning', done => {
        expect(usersModel.getItem()).to.deep.equal({});

        const stub = sinon.stub(usersModel.resource, 'register', () => Promise.resolve());

        usersModel.register(item)
          .then(result => {
            expect(result).to.be.undefined;
            done();
          }).catch(error => {
            expect(error).to.equal('Empty Response');
            done();
          });

        stub.restore();
      });
    });

    // ==============================================================================
    //  invite
    // ==============================================================================

    describe('invite', () => {
      it('should call the invite method of our user resource', done => {
        const stub = sinon.stub(usersResource, 'invite', () => Promise.resolve(true));
        usersModel.invite('test@test.com', 1)
          .then(() => {
            expect(stub).to.have.been.calledOnce;
            expect(stub).to.have.been.calledWithExactly('test@test.com', 1);
            done();
          })
          .catch(e => {
            done(new Error(e));
          });
        stub.restore();
      });
    });

    // ==============================================================================
    //  getPendingInvites
    // ==============================================================================

    describe('getPendingInvites', () => {
      it('should call the getPendingInvites method of our user resource', done => {
        const stub = sinon.stub(usersResource, 'getPendingInvites', () => Promise.resolve([]));
        usersModel.getPendingInvites(1)
          .then(() => {
            expect(stub).to.have.been.calledOnce;
            expect(stub).to.have.been.calledWithExactly(1);
            done();
          })
          .catch(e => {
            done(new Error(e));
          });
        stub.restore();
      });
    });

    // ==============================================================================
    //  acceptInvite
    // ==============================================================================

    describe('acceptInvite', () => {
      it('should call the invite respond method of our user resource', done => {
        const stub = sinon.stub(usersResource, 'inviteRespond', () => Promise.resolve(true));
        const response = { accept: true };
        usersModel.acceptInvite(1)
          .then(() => {
            expect(stub).to.have.been.calledOnce;
            expect(stub).to.have.been.calledWithExactly(response, 1);
            done();
          })
          .catch(e => {
            done(new Error(e));
          });
        stub.restore();
      });
    });

    // ==============================================================================
    //  rejectInvite
    // ==============================================================================

    describe('rejectInvite', () => {
      it('should call the invite respond method of our user resource', done => {
        const stub = sinon.stub(usersResource, 'inviteRespond', () => Promise.resolve(true));
        const response = { accept: false };
        usersModel.rejectInvite(1)
          .then(() => {
            expect(stub).to.have.been.calledOnce;
            expect(stub).to.have.been.calledWithExactly(response, 1);
            done();
          })
          .catch(e => {
            done(new Error(e));
          });
        stub.restore();
      });
    });

    // ==============================================================================
    //  getChildren
    // ==============================================================================

    describe('getChildren', () => {
      it('should call the getChildren method of our user resource', done => {
        const stub = sinon.stub(usersResource, 'getChildren', () => Promise.resolve(true));
        usersModel.getChildren(1)
          .then(() => {
            expect(stub).to.have.been.calledOnce;
            expect(stub).to.have.been.calledWithExactly(1);
            done();
          })
          .catch(e => {
            done(new Error(e));
          });
        stub.restore();
      });
    });

    // ==============================================================================
    //  removeChild
    // ==============================================================================

    describe('removeChild', () => {
      it('should call the removeChild method of our user resource', done => {
        const stub = sinon.stub(usersResource, 'removeChild', () => Promise.resolve(true));
        usersModel.removeChild(1, 2)
          .then(() => {
            expect(stub).to.have.been.calledOnce;
            expect(stub).to.have.been.calledWithExactly(1, 2);
            done();
          })
          .catch(e => {
            done(new Error(e));
          });
        stub.restore();
      });
    });

    // ==============================================================================
    //  removeInvite
    // ==============================================================================

    describe('removeInvite', () => {
      it('should call the removeInvite method of our user resource', done => {
        const stub = sinon.stub(usersResource, 'removeInvite', () => Promise.resolve(true));
        usersModel.removeInvite(2)
          .then(() => {
            expect(stub).to.have.been.calledOnce;
            expect(stub).to.have.been.calledWithExactly(2);
            done();
          })
          .catch(e => {
            done(new Error(e));
          });
        stub.restore();
      });
    });

    // ==============================================================================
    //  validateToken
    // ==============================================================================

    describe('validateToken', () => {
      it('should have a validateToken method', () => {
        expect(usersModel.validateToken).to.be.a('function');
      });

      it('should pass our token to our resource validateToken method', () => {
        const stub = sinon.stub(usersModel.resource, 'validateToken', () => Promise.resolve(true));

        usersModel.validateToken('test');

        expect(stub).to.have.been.calledWithExactly('test');
      });
    });

    // ==============================================================================
    //  getRegistrations
    // ==============================================================================

    describe('getRegistrations', () => {
      it('should call the getRegistrations method of our user resource', done => {
        const stub = sinon.stub(usersResource, 'getRegistrations', () => Promise.resolve(true));
        usersModel.getRegistrations(1)
          .then(() => {
            expect(stub).to.have.been.calledOnce;
            expect(stub).to.have.been.calledWithExactly(1);
            done();
          })
          .catch(e => {
            done(new Error(e));
          });
        stub.restore();
      });
    });

    // ==============================================================================
    //  getSearchCases
    // ==============================================================================

    describe('getSearchCases', () => {
      it('should call the getSearchCases method of our user resource', done => {
        const stub = sinon.stub(usersResource, 'getSearchCases', () => Promise.resolve(true));
        usersModel.getSearchCases(1)
          .then(() => {
            expect(stub).to.have.been.calledOnce;
            expect(stub).to.have.been.calledWithExactly(1);
            done();
          })
          .catch(e => {
            done(new Error(e));
          });
        stub.restore();
      });
    });

    // ==============================================================================
    //  getPayments
    // ==============================================================================

    describe('getPayments', () => {
      it('should call the getPayments method of our user resource', done => {
        const stub = sinon.stub(usersResource, 'getPayments', () => Promise.resolve(true));
        usersModel.getPayments(1)
          .then(() => {
            expect(stub).to.have.been.calledOnce;
            expect(stub).to.have.been.calledWithExactly(1);
            done();
          })
          .catch(e => {
            done(new Error(e));
          });
        stub.restore();
      });
    });

    // ==============================================================================
    //  getCredits
    // ==============================================================================

    describe('getCredits', () => {
      it('should call the getCredits method of our user resource', done => {
        const stub = sinon.stub(usersResource, 'getCredits', () => Promise.resolve(true));
        usersModel.getCredits(1)
          .then(() => {
            expect(stub).to.have.been.calledOnce;
            expect(stub).to.have.been.calledWithExactly(1);
            done();
          })
          .catch(e => {
            done(new Error(e));
          });
        stub.restore();
      });
    });

    // ==============================================================================
    //  getPaymentForm
    // ==============================================================================

    describe('getPaymentForm', () => {
      it('should call the getPaymentForm method of our user resource', done => {
        const stub = sinon.stub(usersResource, 'getPaymentForm', () => Promise.resolve(true));
        usersModel.getPaymentForm(1, 'GBP')
          .then(() => {
            expect(stub).to.have.been.calledOnce;
            expect(stub).to.have.been.calledWithExactly(1, { currency: 'GBP' });
            done();
          })
          .catch(e => {
            done(new Error(e));
          });
        stub.restore();
      });
    });

    // ==============================================================================
    //  calculateCredits
    // ==============================================================================

    describe('calculateCredits', () => {
      const creditResponse = [
        {
          id: 1,
          credits: 4,
        },
        {
          id: 2,
          credits: 6,
        },
      ];
      it('should correctly calculate the number of credits a user has', () => {
        expect(usersModel.calculateCredits(creditResponse)).to.equal(10);
      });

      it('should return 0 if an empty response is passed to it', () => {
        expect(usersModel.calculateCredits([])).to.equal(0);
      });
    });

    // ==============================================================================
    //  updateResponse
    // ==============================================================================

    describe('updateResponse', () => {
      it('should update the correct key values', () => {
        // TODO Remove this when '/api' is removed from the response url in the form data
        const tempResponseUrl = BASE_API_URL.substring(0, BASE_API_URL.length - 4);
        const testData = {
          orderreference: 'W0000000001',
          successfulurlnotification: '/api/test',
          declinedurlnotification: '/api/decline',
          ruleidentifier: ['str-1'],
        };
        const expectedOutput = {
          orderreference: 'W0000000001',
          successfulurlnotification: `${tempResponseUrl}/api/test`,
          declinedurlnotification: `${tempResponseUrl}/api/decline`,
          ruleidentifier: ['str-1', ST_REDIRECT_URL_RULE],
          successfulurlredirect: `${APP_URL}${SUCCESS_REDIRECT_URL}${testData.orderreference}`,
        };

        const output = usersModel.updateResponse(testData);
        expect(output).to.deep.equal(expectedOutput);
      });
    });
  });
});
/* eslint-enable */
