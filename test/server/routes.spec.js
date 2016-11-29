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
 * Ensure the freaking api route loads properly
 */
describe('GET /api', () => {
  it('Should return a 200 ok with a JSON', (done) => {
    request
       .get('/api')
       .set('Accept', 'application/json')
       .expect(200, done);
  });
});
