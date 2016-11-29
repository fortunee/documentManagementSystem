import app from '../../server';
import supertest from 'supertest';
import chai from 'chai';

/**
 * Here is a request handler from supertest
 */
const request = supertest.agent(app);

/** Grab the expect method from chai */ 
const expect = chai.expect;
/**
 * Ensure the freaking index route loads properly
 */
describe('GET /', () => {
    it('Should return a 200 ok with a JSON', (done) => {
        request
            .get('/')
            .set('Accept', 'application/json')
            .expect(200, done);
    })
})