var request = require('supertest');

describe('PeopleController', function() {

  describe('list', function() {
    it('should redirect to /', function (done) {
      request(sails.hooks.http.app)
        .get('/people')
        .expect(200)
        .expect('location','/people', done);
    });
  });
});
