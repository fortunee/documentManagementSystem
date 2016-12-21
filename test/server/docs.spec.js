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
const adminUser = helper.adminUser4;
const regularUser = helper.regularUser4;
const testUser = helper.testUser2;

/**
 * Declare document and token variables for test
 */
let document, adminToken, regularToken, testToken;

describe('Document', () => {
  before((done) => {
    request.post('/api/users')
      .send(adminUser)
      .end((err, res) => {
        adminToken = res.body.token;
      });

    request.post('/api/users')
      .send(regularUser)
      .end((err, res) => {
        regularToken = res.body.token;
      });

    request.post('/api/users')
      .send(testUser)
      .end((err, res) => {
        testToken = res.body.token;
        done();
      });
  });

  describe('Create document', () => {
    it('Should have a published date defined', (done) => {
      request.post('/api/documents')
        .set({ 'x-access-token': adminToken })
        .send(helper.document)
        .expect(201)
        .end((err, res) => {
          document = res.body;
          expect(res.body).to.have.property('createdAt');
          expect(res.body.createdAt).not.to.equal(null);
          done();
        });
    });

    it('Should have valid attributes', (done) => {
      expect(document).to.have.property('title');
      expect(document).to.have.property('content');
      done();
    });

    it('Should set its access to public by default', (done) => {
      expect(document.access).to.equal('public');
      done();
    });

    it('Should fail to create a document without valid attributes', (done) => {
      request.post('/api/documents')
        .set({ 'x-access-token': adminToken })
        .send({ title: null })
        .expect(400)
        .end((err, res) => {
          expect(res.body[0].message).to.equal('title cannot be null');
          done();
        });
    });
  });

  describe('Get document', () => {
    before((done) => {
      request.post('/api/documents')
        .set({ 'x-access-token': regularToken })
        .send(helper.document2)
        .end((err, res) => {
          done();
        });
    });

    it('Should return a private document only to its owner', (done) => {
      request.get('/api/documents/7')
        .set({ 'x-access-token': regularToken })
        .expect(200).end((err, res) => {
          expect(typeof res.body).to.equal('object');
          expect(res.body.access).to.equal('private');
          expect(res.body.title).to.equal(helper.document2.title);
          done();
        });
    });

    it('Should not return a private document to another user', (done) => {
      request.get('/api/documents/7')
        .set({ 'x-access-token': testToken })
        .expect(403).end((err, res) => {
          expect(typeof res.body).to.equal('object');
          expect(res.body.message).to.equal('This is a private document');
          done();
        });
    });

    it('Should return a role access document to a user with the same role', (done) => {
      request.get('/api/documents/8')
        .set({ 'x-access-token': testToken })
        .expect(200).end((err, res) => {
          expect(typeof res.body).to.equal('object');
          expect(res.body.access).to.equal('role');
          done();
        });
    });

    it('Should get all documents for a specific user', (done) => {
      request.get('/api/users/1/documents')
        .set({ 'x-access-token': regularToken })
        .expect(200).end((err, res) => {
          if (err) return done(err);
          expect(Array.isArray(res.body)).to.equal(true);
          expect(res.body[0].OwnerId).to.equal(1);
          done();
        });
    });

    it('Should return all documents to the admin', (done) => {
      request.get('/api/documents')
        .set({ 'x-access-token': adminToken })
        .expect(200).end((err, res) => {
          expect(typeof res.body).to.equal('object');
          done();
        });
    });

    it('Should be limited to a specific number and an offset', (done) => {
      request.get('/api/documents/?limit=2&start=3')
        .set({ 'x-access-token': adminToken })
        .expect(200).end((err, res) => {
          if (err) return done(err);
          expect(Array.isArray(res.body)).to.equal(true);
          expect(res.body.length).to.equal(2);
          expect(res.body[0].id).to.equal(4);
          done();
        });
    });

    it('Should return documents starting from the most recent', (done) => {
      request.get('/api/documents/')
        .set({ 'x-access-token': adminToken })
        .expect(200).end((err, res) => {
          if (err) return done(err);
          expect(Array.isArray(res.body)).to.equal(true);
          expect(res.body[0].id).not.to.equal(1);
          done();
        });
    });

    it('Should not return all documents to a non admin', (done) => {
      request.get('/api/documents')
        .set({ 'x-access-token': regularToken })
        .expect(200).end((err, res) => {
          expect(Array.isArray(res.body)).to.equal(true);
          done();
        });
    });

    it('Should return a private document to the admin', (done) => {
      request.get('/api/documents/7')
        .set({ 'x-access-token': adminToken })
        .expect(200).end((err, res) => {
          expect(typeof res.body).to.equal('object');
          expect(res.body.access).to.equal('private');
          expect(res.body.title).to.equal(helper.document2.title);
          done();
        });
    });

    it('Should fail if a document does not exist', (done) => {
      request.get('/api/documents/30')
        .set({ 'x-access-token': adminToken })
        .expect(404).end((err, res) => {
          expect(typeof res.body).to.equal('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message)
            .to.equal('Document with the id: 30 does not exit');
          done();
        });
    });
  });

  describe('Search', () => {
    it('Should be based on a search criteria', (done) => {
      request.get('/api/documents/?access=public')
        .set({ 'x-access-token': testToken })
        .expect(200).end((err, res) => {
          if (err) return done(err);
          expect(Array.isArray(res.body)).to.equal(true);
          expect(res.body[0].access).to.equal('public');
          done();
        });
    });

    it('Should be limited by a specific number', (done) => {
      request.get('/api/documents/?limit=4')
        .set({ 'x-access-token': adminToken })
        .expect(200).end((err, res) => {
          if (err) return done(err);
          expect(Array.isArray(res.body)).to.equal(true);
          expect(res.body.length).to.equal(4);
          done();
        });
    });

    it('Should be ordered by published date', (done) => {
      request.get('/api/documents/')
        .set({ 'x-access-token': adminToken })
        .expect(200).end((err, res) => {
          if (err) return done(err);
          expect(Array.isArray(res.body)).to.equal(true);
          expect(res.body[0].id).not.to.equal(1);
          done();
        });
    });

    it('Should have been created by a specified role', (done) => {
      request.get('/api/documents/')
        .set({ 'x-access-token': adminToken })
        .expect(200).end((err, res) => {
          if (err) return done(err);
          expect(Array.isArray(res.body)).to.equal(true);
          expect(res.body[0].OwnerId).not.to.equal(null);
          done();
        });
    });
  });

  describe('Update document', () => {
    it('Should edit and update a document by the owner', (done) => {
      request.put('/api/documents/6')
        .set({ 'x-access-token': adminToken })
        .send({ title: 'doc title updated' })
        .expect(200)
        .end((err, res) => {
          expect(typeof res.body).to.equal('object');
          expect(res.body.title).to.equal('doc title updated');
          done();
        });
    });

    it('Should fail if the document is not owned by you', (done) => {
      request.put('/api/documents/6')
        .set({ 'x-access-token': testToken })
        .send({ title: 'doc title updated' })
        .expect(403)
        .end((err, res) => {
          expect(typeof res.body).to.equal('object');
          expect(res.body.message)
            .to.equal('You are not the owner of this document');
          done();
        });
    });

    it('Should fail if the document does not exist', (done) => {
      request.put('/api/documents/60')
        .set({ 'x-access-token': adminToken })
        .send({ title: 'doc title updated' })
        .expect(404)
        .end((err, res) => {
          expect(typeof res.body).to.equal('object');
          expect(res.body.message)
            .to.equal('Cannot edit a document that does not exist');
          done();
        });
    });
  });

  describe('Delete a document', () => {
    it('Should delete a document', (done) => {
      request.delete('/api/documents/6')
        .set({ 'x-access-token': adminToken })
        .expect(200)
        .end((err, res) => {
          expect(typeof res.body).to.equal('object');
          expect(res.body.message).to.equal('Document deleted.');
          done();
        });
    });

    it('Should fail if document is not owned by you', (done) => {
      request.delete('/api/documents/7')
        .set({ 'x-access-token': adminToken })
        .expect(403)
        .end((err, res) => {
          expect(typeof res.body).to.equal('object');
          expect(res.body.message)
            .to.equal('This document does not belong to you');
          done();
        });
    });

    it('Should fail if document does not exist', (done) => {
      request.delete('/api/documents/20')
        .set({ 'x-access-token': regularToken })
        .expect(404)
        .end((err, res) => {
          expect(typeof res.body).to.equal('object');
          expect(res.body.message)
            .to.equal('Cannot delete a document that does not exist');
          done();
        });
    });
  });
});
