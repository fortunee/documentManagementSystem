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
