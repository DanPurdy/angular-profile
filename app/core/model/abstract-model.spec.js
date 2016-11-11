// ==============================================================================
//
//  app/core/models/abstract-model.spec.js
//
// ==============================================================================

/* eslint-disable no-unused-expressions */

import AbstractModel from './abstract-model';
import AbstractResource from '../resources/abstract-resource';

describe('AbstractModel', () => {
  const route = 'test';
  const id = '1';
  const item = {
    _id: id,
    test: 'test',
    cas: 'cas',
  };
  const collection = [item];
  let abstractResource;
  let abstractModel;
  let Restangular;

  beforeEach(
    angular.mock.module('mockApp', 'restangular'),
  );

  beforeEach(inject($injector => {
    Restangular = $injector.get('Restangular');
  }));

  beforeEach(() => {
    abstractResource = new AbstractResource(Restangular, route);
    abstractModel = new AbstractModel(abstractResource);
  });

  // ==============================================================================
  //  initialisation
  // ==============================================================================

  describe('initialisation', () => {
    it('should have "resource" property', () => {
      expect(abstractModel.resource).to.exist;
    });

    it('it\'s resource should equal the injected resource', () => {
      expect(abstractModel.resource).to.deep.equal(abstractResource);
    });

    it('should have empty "item" property object', () => {
      expect(abstractModel.item).to.deep.equal({});
    });

    it('should have empty "collection" array', () => {
      expect(abstractModel.collection.length).to.equal(0);
    });
  });

  // ==============================================================================
  //  setters/getters
  // ==============================================================================

  describe('setters/getters', () => {
    it('to set/get item', () => {
      expect(abstractModel.getItem()).to.deep.equal({});
      abstractModel.setItem(item);
      expect(abstractModel.getItem()).to.deep.equal(item);
    });

    it('to set/get collection', () => {
      expect(abstractModel.getCollection().length).to.equal(0);
      abstractModel.setCollection(collection);
      expect(abstractModel.getCollection().length).to.equal(1);
    });

    describe('getItemById', () => {
      it('should get item by id from collection', () => {
        abstractModel.setCollection(collection);
        expect(abstractModel.getItemById(id)).to.deep.equal(item);
      });
    });
  });

  // ==============================================================================
  //  initItem
  // ==============================================================================

  describe('initItem', () => {
    it('should init item with GET request', () => {
      expect(abstractModel.getItem()).to.deep.equal({});

      const stub = sinon.stub(abstractModel.resource, 'get', () => Promise.resolve(item));

      abstractModel.initItem(id).then(result => {
        expect(Restangular.stripRestangular(result)).to.deep.equal(item);
        expect(Restangular.stripRestangular(result)).to.not.deep.equal(4);
        stub.should.have.been.calledWith(id);
        stub.should.have.been.calledOnce;
      });

      stub.restore();
    });

    it('should init item without GET request', () => {
      const spy = sinon.spy(abstractModel.resource, 'get');

      abstractModel.setItem(item);
      expect(abstractModel.getItem()).to.deep.equal(item);

      abstractModel.initItem(null).then(() => {
        expect(abstractModel.getItem()).to.deep.equal({});
        spy.should.have.not.been.called;
      });

      spy.reset();
    });
  });

  // ==============================================================================
  //  initCollection
  // ==============================================================================

  describe('initCollection', () => {
    it('should init collection with GET LIST request', () => {
      const stub = sinon.stub(abstractModel.resource, 'getList', () => Promise.resolve(collection));

      expect(abstractModel.getCollection().length).to.equal(0);
      return abstractModel.initCollection().then(() => {
        expect(abstractModel.collection.length).to.equal(1);
        expect(abstractModel.getCollection().length).to.equal(1);
        expect(Restangular.stripRestangular(abstractModel.getCollection()[0])).to.deep.equal(item);

        expect(stub).calledOnce;
        stub.restore();
      });
    });
  });

  // ==============================================================================
  //
  //  save
  // ==============================================================================

  describe('save', () => {
    it('should update item in collection', () => {
      const itemUpdated = Object.assign({}, item);
      const stub = sinon.stub(abstractModel.resource, 'update', () => Promise.resolve(true));

      itemUpdated.test = 'test-updated';
      itemUpdated.newAttribute = 'new-attribute';

      abstractModel.collection = [{
        _id: '2',
        test: 'test-2',
      }, collection[0]];
      expect(abstractModel.getCollection()[1].newAttribute).to.be.undefined;

      return abstractModel.save(itemUpdated).then(() => {
        expect(abstractModel.getCollection()[1]._id).to.equal(item._id);
        expect(abstractModel.getCollection()[1].test).to.equal(itemUpdated.test);
        expect(abstractModel.getCollection()[1].newAttribute).to.be.defined;
        expect(abstractModel.getCollection()[1].newAttribute).to.equal(itemUpdated.newAttribute);
        expect(stub).calledOnce;
        stub.should.have.been.calledWith(itemUpdated);
        stub.restore();
      });
    });

    it('should create item and push item to collection with new id', () => {
      const newItem = Object.assign({}, item);
      newItem._id = null;
      const stub = sinon.stub(abstractModel.resource, 'create', () => Promise.resolve(item));

      expect(abstractModel.getCollection().length).to.equal(0);

      return abstractModel.save(newItem).then(() => {
        expect(abstractModel.getCollection()[0]._id).to.equal(item._id);
        expect(stub).calledOnce;
        stub.should.have.been.calledWith(newItem);
        stub.restore();
      });
    });
  });

  // ==============================================================================
  //  delete
  // ==============================================================================

  describe('delete', () => {
    it('should delete item from collection', () => {
      const stub = sinon.stub(abstractModel.resource, 'delete', () => Promise.resolve({}));

      abstractModel.setCollection(collection);
      expect(abstractModel.getCollection().length).to.equal(1);

      return abstractModel.delete(item).then(() => {
        expect(abstractModel.getCollection().length).to.equal(0);
        stub.should.have.been.calledWith(item._id);
        expect(stub).called;
      });
    });
  });

  // ==============================================================================
  //  search
  // ==============================================================================

  describe('search', () => {
    const terms = {
      _id: 1,
      status: 'complete',
    };
    it('should call our abstract resource with the correct terms', () => {
      const stub = sinon.stub(abstractResource, 'search', () => Promise.resolve(true));
      abstractModel.search(terms);
      expect(stub).to.have.been.calledOnce;
      expect(stub).to.have.been.calledWithExactly(terms);
      stub.restore();
    });
  });
});
/* eslint-enable */
