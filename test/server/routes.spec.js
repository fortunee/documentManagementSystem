import supertest from 'supertest';
import chai from 'chai';
import app from '../../server';

/**
 * Here is a request handler from supertest
 */
const request = supertest.agent(app);

/** Grab the expect method from chai */
const expect = chai.expect;

/**
 * Ensure the freaking /users route loads properly
 */
describe('Users Route /api/users', () => {
  it('Should return a 200 ok on get request', (done) => {
    request
      .get('/api/users')
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('Should return a 200 ok response on a post request', (done) => {
    request
      .post('/api/users')
      .expect(200, done);
  });
});

/**
 * Test suite to ensure that /users/:username route with a param of
 * username returns a 200 ok response on a put, get or delete request.
 */
describe('users/:username route with a username param', () => {
  it('Should return a 200 ok response on a put request', (done) => {
    request
      .put('/api/users/fortune')
      .expect(200, done);
  });

  it('Should return a 200 ok response on a get request', (done) => {
    request
      .get('/api/users/fortune')
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('Should return a 200 ok response on a delete request', (done) => {
    request
      .delete('/api/users/fortune')
      .expect(200, done);
  });
});
