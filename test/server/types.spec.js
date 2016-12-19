import chai from 'chai';
import supertest from 'supertest';
import db from '../../app/models';
import app from '../../app/config/app';
import helper from '../specHelper';

/**
 * Here is a request handler from supertest
 */
const request = supertest.agent(app);

/** Grab the expect method from chai */
const expect = chai.expect;

/**
 * Admin and Regular users
 */
const adminUser = helper.adminUser3;
const regularUser = helper.regularUser3;

/**
 * Declare token variables for test
 */
let adminToken, regularToken;

describe('Type', () => {
  before((done) => {
    request.post('/api/users')
      .send(adminUser)
      .expect(201)
      .end((err, res) => {
        adminToken = res.body.token;
      });

    request.post('/api/users')
      .send(regularUser)
      .end((err, res) => {
        regularToken = res.body.token;
        done();
      });
  });

  describe('Create type', () => {
    it('Ensures an admin can create a new type', (done) => {
      request.post('/api/types')
        .set({ 'x-access-token': adminToken })
        .send({ title: 'new type' })
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });

    it('Should have a unique type title', (done) => {
      request.post('/api/types')
        .set({ 'x-access-token': adminToken })
        .send({ title: 'new type' })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });

    it('Should fail if title is null', (done) => {
      request.post('/api/types')
        .set({ 'x-access-token': adminToken })
        .send({ title: null })
        .expect(400)
        .end((err, res) => {
          expect(res.body[0].message).to.equal('title cannot be null');
          done();
        });
    });
  });

  describe('Get types', () => {
    it('Should return all types', (done) => {
      request.get('/api/types')
        .set({ 'x-access-token': regularToken })
        .expect(200).end((err, res) => {
          expect(Array.isArray(res.body)).to.equal(true);
          expect(res.body[0].title).to.equal('letter');
          expect(res.body[1].title).to.equal('report');
          done();
        });
    });


    it('Should return a specific type', (done) => {
      request.get('/api/types/1')
        .set({ 'x-access-token': regularToken })
        .expect(200).end((err, res) => {
          expect(typeof res.body).to.equal('object');
          expect(res.body.title).to.equal('letter');
          expect(res.body.id).to.equal(1);
          done();
        });
    });

    it('Should fail if a type does not exist', (done) => {
      request.get('/api/types/5')
        .set({ 'x-access-token': regularToken })
        .expect(404).end((err, res) => {
          expect(typeof res.body).to.equal('object');
          expect(res.body).to.have.property('message');
          done();
        });
    });
  });

  describe('Update type', () => {
    it('Should edit and update type', (done) => {
      request.put('/api/types/3')
        .set({ 'x-access-token': adminToken })
        .send({ title: 'updated type' })
        .expect(201)
        .end((err, res) => {
          expect(typeof res.body).to.equal('object');
          expect(res.body.title).to.equal('updated type');
          expect(res.body.id).to.equal(3);
          done();
        });
    });

    it('Should fail if a type does not exist', (done) => {
      request.put('/api/types/10')
        .set({ 'x-access-token': adminToken })
        .send({ title: 'updated type' })
        .expect(404)
        .end((err, res) => {
          expect(typeof res.body).to.equal('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message)
            .to.equal('Cannot edit a type that does not exist');
          done();
        });
    });
  });

  describe('Delete type', () => {
    it('Should delete a type', (done) => {
      request.delete('/api/types/3')
        .set({ 'x-access-token': adminToken })
        .expect(202).end((err, res) => {
          expect(typeof res.body).to.equal('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Type deleted.');
          done();
        });
    });


    it('Should fail if a type does not exist', (done) => {
      request.delete('/api/types/10')
        .set({ 'x-access-token': adminToken })
        .expect(404).end((err, res) => {
          expect(typeof res.body).to.equal('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Cannot delete a type that does not exist');
          done();
        });
    });
  });
});
