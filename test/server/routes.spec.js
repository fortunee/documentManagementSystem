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


/**
 * Test suite ensures that the users login route returns an appropriate
 * response on any request
 */
describe('Users login route', () => {
  it('Should return a response on a post request', (done) => {
    request.post('/api/users/login').expect(200, done);
  });
});

/**
 * Test suite ensures that the users logout route returns an appropriate
 * response on any request
 */
describe('Users logout route', () => {
  it('Should return a response on a post request', (done) => {
    request.post('/api/users/logout').expect(200, done);
  });
});


/**
 * Ensures that documents route returns a response
 */
describe('Documents route', () => {
  it('Should return a response on a get request', (done) => {
    request.get('/api/documents').expect(200, done);
  });

  it('Should return a response on post request', (done) => {
    request.post('/api/documents').expect(200, done);
  });
});

/**
 * Ensure the documents route returns a response when a param is passed
 * to the route.
 */
describe('Documents route with param', () => {
  it('Should return a response a get request', (done) => {
    request.get('/api/documents/01').expect(200, done);
  });

  it('Should return a response on put request', (done) => {
    request.put('/api/documents/02').expect(200, done);
  });

  it('Shoule return a response on a delete request', (done) => {
    request.delete('/api/documents/02').expect(200, done);
  });
});


/**
 * Ensure that route for getting all documents belonging to
 * a specific user returns a response
 */
describe('Specific User documents', () => {
  it('Should return a response on a get request', (done) => {
    request.get('/api/users/fortune/documents').expect(200, done);
  });
});
