// ==============================================================================
//
//  app/core/resources/abstract-resurce.spec.js
//
//
//
// ==============================================================================

/* eslint-disable no-unused-expressions */

import AbstractResource from '../resources/abstract-resource';

describe('AbstractResource', () => {
  const route = '/test';
  const id = '1';
  const item = {
    _id: id,
    test: 'test',
  };
  const collection = [item];
  let restangularized;
  let abstractResource;
  let Restangular;
  let $httpBackend;

  beforeEach(angular.mock.module('mockApp', 'restangular'));

  beforeEach(inject($injector => {
    Restangular = $injector.get('Restangular');
    $httpBackend = $injector.get('$httpBackend');
  }));

  beforeEach(() => {
    restangularized = Restangular.restangularizeElement(null, angular.copy(item), route, {});
    abstractResource = new AbstractResource(Restangular, route);
  });

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  // ==============================================================================
  //  get
  // ==============================================================================
  describe('get', () => {
    it('should call GET resource with `id`', () => {
      $httpBackend.whenGET(`${route}/${id}`).respond(item);

      abstractResource.get(`${id}`)
        .then(respond => {
          expect(Restangular.stripRestangular(respond)).to.deep.equal(item);
        });

      $httpBackend.expectGET(`${route}/${id}`);
      $httpBackend.flush();
    });
  });

  // ==============================================================================
  //  getList
  // ==============================================================================

  describe('getList', () => {
    it('should call GET LIST resource', () => {
      $httpBackend.whenGET(`${route}`).respond(collection);

      abstractResource.getList()
        .then(respond => {
          expect(Restangular.stripRestangular(respond)).to.deep.equal(collection);
        });

      $httpBackend.expectGET(`${route}`);
      $httpBackend.flush();
    });
  });

  // ==============================================================================
  //  create
  // ==============================================================================
  describe('create', () => {
    it('should call POST resource', () => {
      $httpBackend.whenPOST(`${route}`, item).respond(item);

      abstractResource.create(item).then(respond => {
        expect(Restangular.stripRestangular(respond)).to.deep.equal(item);
      });

      $httpBackend.expectPOST(`${route}`);
      $httpBackend.flush();
    });
  });

  // ==============================================================================
  //  update
  // ==============================================================================

  describe('update', () => {
    it('should call PUT resource', () => {
      $httpBackend.whenPUT(`${route}/${id}`, item).respond(() => [200, item]);

      abstractResource.update(restangularized).then(respond => {
        expect(Restangular.stripRestangular(respond)).to.deep.equal(item);
      });

      $httpBackend.expectPUT(`${route}/${id}`, item);
      $httpBackend.flush();
    });
  });

  // ==============================================================================
  //  delete
  // ==============================================================================

  describe('delete', () => {
    it('should call DELETE resource', () => {
      $httpBackend.whenDELETE(`${route}/${id}`).respond(() => [200, item]);

      abstractResource.delete(id).then(respond => {
        expect(Restangular.stripRestangular(respond)).to.deep.equal(item);
      });
      $httpBackend.expectDELETE(`${route}/${id}`);
      $httpBackend.flush();
    });
  });
});

/* eslint-enable */
