// ==============================================================================
//
//  app/core/models/token/token.spec.js
//
// ==============================================================================

/* eslint-disable no-unused-expressions */

import TokenModel from './token';
import UsersResource from '../../resources/users/users';

describe('TokenModel', () => {
  const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyJ9.eyJleHAiOjE0NTg2ODUwMzgsInVzZXJuYW1lIjoibG9mdGRpZ2l0YWwiLCJpZCI6NSwiaWF0IjoiMTQ1ODY0OTAzOCJ9.nk4pl_ZDxxU7ohp3vuR3kRErZB8uBlDDlZATnmQYklbZ6mCcW9dIrgeq5gqgmozThj1zDfhiKtQBrnNfse1UzdUd0LIs2XRRRMLjJLZfSxXCky2I0o9qSx7bHJisuYUX6CZOouH6-qY-Ntg4wx_DltS3j5qlxo3H0vN4NLJ-2xbsZ5-JYv2Yd80g-X8HI1EW6Z8KH5mKtEdi6SPSJT6mZrt4jI02UYrDfOFbQtpnS2IL5Ei1CfXU9m-FmhsgI_30EktvfXFR5_huRw1a16Mo1nc87dQLQ0Lslo01WsqIi4k9_XP5MAogw8wmob_xs7KB4nro6LVrJze4upDQRBK9rMHVE733MXHGIXcUTfUN-EcZYyDI-vP3ctoIsZOh1EZCCn073O3Skd2nhz7FcqYNt0wawAVRhOtyVXc-NSxcVOIy6UuS-6GMVCrJod5Heilf5NIU3ruuDquJ73vPmJzVmWzAzQYRPK7J2edcvLDZpktee392KFwYouWbzukAUVGXU9oNjJ0Gh042dvRcpvYXKSVz26FnMPem5coNZw0C0ukKZYtbgWrFYWu8PXLZzFgIlrrkaOvoUzaaFSWlySGGBBrcJ7U1JIJFtre3Do7iupG-Rw_b38A36-qV-BYsCNHyRXRYLUrc5qYR5gFoLOOwkkrWjhrbtGQ0Zi7RriJWcz8'; // eslint-disable-line max-len
  const user = {
    username: 'test',
    email: 'test@test.dev',
    password: 't3sT',
    firstName: 'test',
    lastName: 'user',
  };
  let tokenModel;
  let store;
  let jwtHelper;
  let usersResource;

  beforeEach(
    angular.mock.module('mockApp', 'angular-jwt', 'angular-storage'),
  );

  beforeEach(inject($injector => {
    store = $injector.get('store');
    jwtHelper = $injector.get('jwtHelper');
    usersResource = new UsersResource();
    tokenModel = new TokenModel(store, jwtHelper, usersResource);
  }));

  // ==============================================================================
  //  constructor
  // ==============================================================================

  describe('constructor', () => {
    it('should have "store" property', () => {
      expect(tokenModel.store).to.exist;
      expect(tokenModel.store).to.deep.equal(store);
    });

    it('should have "jwtHelper" property', () => {
      expect(tokenModel.jwtHelper).to.exist;
      expect(tokenModel.jwtHelper).to.deep.equal(jwtHelper);
    });

    it('should have "UsersResource" property', () => {
      expect(tokenModel.UsersResource).to.exist;
      expect(tokenModel.UsersResource).to.deep.equal(usersResource);
    });

    it('should have a null cachedCurrentUser on startup', () => {
      expect(tokenModel.cachedCurrentUser).to.not.be.undefined;
      expect(tokenModel.cachedCurrentUser).to.be.null;
    });

    it('should have a null cachedToken on startup', () => {
      expect(tokenModel.cachedToken).to.not.be.undefined;
      expect(tokenModel.cachedToken).to.be.null;
    });

    it('should have a null decoded token on startup', () => {
      expect(tokenModel.decoded).to.not.be.undefined;
      expect(tokenModel.decoded).to.be.null;
    });

    it('should have a userStore property', () => {
      expect(tokenModel.userStore).to.exist;
      expect(tokenModel.userStore).to.be.a('string');
    });

    it('should have a tokenStore property', () => {
      expect(tokenModel.tokenStore).to.exist;
      expect(tokenModel.tokenStore).to.be.a('string');
    });
  });

  // ==============================================================================
  //  set
  // ==============================================================================

  describe('set', () => {
    it('should set the token', () => {
      const storeSpy = sinon.spy(tokenModel.store, 'set');

      tokenModel.set(token);

      expect(tokenModel.cachedToken).to.equal(token);

      expect(storeSpy).to.have.been.called;
      expect(storeSpy).calledWithMatch(tokenModel.tokenStore, token);
      storeSpy.reset();
    });
  });

  // ==============================================================================
  //  unset
  // ==============================================================================

  describe('unset', () => {
    it('should unset the token', () => {
      const storeSpy = sinon.spy(tokenModel.store, 'remove');
      tokenModel.cachedToken = token;
      tokenModel.cachedCurrentUser = user;
      tokenModel.tokenStore = 'tokenTest';
      tokenModel.userStore = 'userTest';

      tokenModel.unset();

      expect(tokenModel.cachedToken).to.not.be.undefined;
      expect(tokenModel.cachedToken).to.be.null;
      expect(tokenModel.cachedCurrentUser).to.not.be.undefined;
      expect(tokenModel.cachedCurrentUser).to.be.null;

      expect(storeSpy).to.have.been.calledTwice;
      expect(storeSpy).to.have.been.calledWith(tokenModel.tokenStore);
      expect(storeSpy).to.have.been.calledWith(tokenModel.userStore);
      storeSpy.reset();
    });
  });

  // ==============================================================================
  //  get
  // ==============================================================================

  describe('get', () => {
    it('should get the cached token', () => {
      const stub = sinon.stub(tokenModel.store, 'get', () => token);

      tokenModel.cachedToken = 'NOTATOKEN';

      expect(tokenModel.get()).to.not.equal(token);
      expect(tokenModel.get()).to.equal(tokenModel.cachedToken);
      stub.restore();
    });

    it('should get the stored token if cached token is empty and cache it', () => {
      const stub = sinon.stub(tokenModel.store, 'get', () => token);

      expect(tokenModel.cachedToken).to.not.be.undefined;
      expect(tokenModel.cachedToken).to.be.null;
      const result = tokenModel.get();
      expect(result).to.equal(token);
      expect(tokenModel.cachedToken).to.equal(token);
      stub.restore();
    });
  });

  // ==============================================================================
  //  getCurrentUser
  // ==============================================================================

  describe('getCurrentUser', () => {
    it('should return our current user if cached', () => {
      tokenModel.cachedCurrentUser = user;

      expect(tokenModel.getCurrentUser()).to.deep.equal(user);
    });

    it('should return our current user from the store if cache is empty', () => {
      const stub = sinon.stub(tokenModel.store, 'get', () => user);

      expect(tokenModel.cachedCurrentUser).to.be.null;
      expect(tokenModel.getCurrentUser()).to.deep.equal(user);
      stub.restore();
    });

    it('should return an empty object if our user isn\'t stored', () => {
      const stub = sinon.stub(tokenModel.store, 'get', () => false);

      expect(tokenModel.cachedCurrentUser).to.be.null;
      expect(tokenModel.getCurrentUser()).to.exist;
      expect(tokenModel.getCurrentUser()).to.be.an('object');
      expect(tokenModel.getCurrentUser()).to.deep.equal({});
      stub.restore();
    });
  });

  // ==============================================================================
  //  getCurrentUserId
  // ==============================================================================

  describe('getCurrentUserId', () => {
    it('should return our current user ID if cached', () => {
      tokenModel.cachedCurrentUser = user;

      expect(tokenModel.getCurrentUserId()).to.equal(user._id);
    });

    it('should return our current user ID from the store if cache is empty', () => {
      const stub = sinon.stub(tokenModel.store, 'get', () => user);

      expect(tokenModel.cachedCurrentUser).to.be.null;
      expect(tokenModel.getCurrentUserId()).to.equal(user._id);
      stub.restore();
    });

    it('should return undefined if our user isn\'t stored', () => {
      const stub = sinon.stub(tokenModel.store, 'get', () => false);

      expect(tokenModel.cachedCurrentUser).to.be.null;
      expect(tokenModel.getCurrentUserId()).to.be.undefined;
      stub.restore();
    });
  });

  // ==============================================================================
  //  updateCurrentUser
  // ==============================================================================

  describe('updateCurrentUser', () => {
    it('should update our current user store', () => {
      sinon.stub(tokenModel.UsersResource, 'get', () => Promise.resolve(user));

      return tokenModel.updateCurrentUser()
        .then(response => {
          expect(response).to.deep.equal(user);
        });
    });

    it('should update our current user cache', () => {
      const stub = sinon.stub(tokenModel.UsersResource, 'get', () => Promise.resolve(user));
      const storeSpy = sinon.spy(tokenModel.store, 'set');

      return tokenModel.updateCurrentUser().then(newUser => {
        expect(newUser).to.deep.equal(user);
        expect(tokenModel.cachedCurrentUser).to.deep.equal(user);
        expect(storeSpy).to.have.been.calledOnce;
        expect(storeSpy).to.have.been.calledWith(tokenModel.userStore, user);
        stub.restore();
        storeSpy.reset();
      });
    });
  });

  // ==============================================================================
  //  isExpired
  // ==============================================================================

  describe('isExpired', () => {
    it('should return true if the token is expired', () => {
      const stub = sinon.stub(tokenModel, 'get', () => user);
      const jwtStub = sinon.stub(tokenModel.jwtHelper, 'isTokenExpired', () => true);

      expect(tokenModel.isExpired()).to.be.true;
      stub.restore();
      jwtStub.restore();
    });

    it('should return false if the token is not expired', () => {
      const stub = sinon.stub(tokenModel, 'get', () => user);
      const jwtStub = sinon.stub(tokenModel.jwtHelper, 'isTokenExpired', () => false);

      expect(tokenModel.isExpired()).to.be.false;
      stub.restore();
      jwtStub.restore();
    });

    it('should return false if the token doesn\'t exist', () => {
      const stub = sinon.stub(tokenModel, 'get', () => null);

      expect(tokenModel.isExpired()).to.be.false;
      stub.restore();
    });
  });
});

/* eslint-enable */
