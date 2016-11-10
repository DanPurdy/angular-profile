// ==============================================================================
//
//  app/core/models/users/users.spec.js
//
// ==============================================================================

/* eslint-disable no-unused-expressions */

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
  });
});
/* eslint-enable */
