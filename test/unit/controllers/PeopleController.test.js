var request = require('supertest');

describe('homepage', function() {
  describe('index', function() {
    it('should return success', function (done) {
      request(sails.hooks.http.app)
        .get('/')
        .expect(200, done);
    });
  });

  describe('dashboard', function() {
    it('should return success', function (done) {
      request(sails.hooks.http.app)
        .get('/questions')
        .expect(200, done);
    });
  });

  describe('woman', function() {
    it('should return success', function (done) {
      request(sails.hooks.http.app)
        .get('/questions/1')
        .expect(200, done);
    });
  });

  describe('oldest', function() {
    it('should return success', function (done) {
      request(sails.hooks.http.app)
        .get('/questions/2')
        .expect(200, done);
    });
  });

  describe('agegap', function() {
    it('should return success', function (done) {
      request(sails.hooks.http.app)
        .get('/questions/3')
        .expect(200, done);
    });
  });

  describe('404', function() {
    it('should return 404', function (done) {
      request(sails.hooks.http.app)
        .get('/fonkynonseturi')
        .expect(404, done);
    });
  });
});
