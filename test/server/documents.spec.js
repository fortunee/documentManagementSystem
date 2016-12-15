import chai from 'chai';
import supertest from 'supertest';
import db from '../../app/models';
import helper from '../specHelper';
import app from '../../server';

/**
 * Here is a request handler from supertest
 */
const request = supertest.agent(app);

/** Grab the expect method from chai */
const expect = chai.expect;

/**
 * Document, Type and User helper
 */
const docHelper = helper.document;
const typeHelper = helper.type;
const userHelper = helper.user;
const roleHelper = helper.role;

/**
 * Initialize a document for test
 */
let document, token;

/**
 * Test suite for the document model
 */
describe('Document model', () => {
  /**
   * Build and populate the document and type tables
   * beforeEach test runs.
   */
  beforeEach(() =>
      db.Role.create(roleHelper)
        .then((role) => {
          userHelper.RoleId = role.id;
          return db.User.create(userHelper);
        })
        .then((user) => {
          docHelper.OwnerId = user.id;
          return db.Document.create(docHelper);
        })
        .then((newDocument) => {
          document = newDocument;
          request.post('/api/users/login')
            .send(userHelper)
            .end((err, res) => {
              token = res.body.token;
            });
        }));

  // clear database after a test done
  afterEach(() => db.Document.sequelize.sync({ force: true, logging: false }));

  it('Ensures a newly created document has published date defined', () => {
    document.save().then((newDoc) => {
      expect(newDoc).to.have.property('createdAt');
      expect(newDoc.createdAt).not.to.equal('undefined');
    }).catch(error => expect(error).not.to.exist);
  });

  it('Ensures a document access is set to public by default', () => {
    document.save().then((newDoc) => {
      expect(newDoc.access).to.equal('public');
    }).catch(error => expect(error).not.to.exist);
  });

  it('Ensures a private document can only be retrieved by the creator', (done) => {
    docHelper.access = 'private';
    request.get('/api/documents/1').set({ 'x-access-token': token })
        .expect(200).end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
          expect(document.access).to.equal('private');
        });
  });

  it('Ensures users with the same role can retrieve an access role document', (done) => {
    docHelper.access = 'role';
    request.get('/api/documents/1').set({ 'x-access-token': token })
        .expect(200).end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
          expect(document.access).to.equal('role');
        });
  });

  it('Should be limited to a specific number in query params', (done) => {
    request.get('/api/documents/?limit=5')
      .set({ 'x-access-token': token })
      .expect(200).end((err, res) => {
        if (err) {
          return done(err);
        }
        for (let i = 0; i < res.body.length - 1; i += 1) {
          expect(res.body[i].createdAt).to.be.at
            .least(res.body[i + 1].createdAt);
        }
        done();
      });
  });
});
