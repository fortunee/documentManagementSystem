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
 * Required document fields that should not be empty/null
 */
const requiredFields = ['title', 'content', 'OwnerId'];

/**
 * Initialize a document for test
 */
let document, token, regularToken;

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
        })
      );


  // clear database after a test done
  afterEach(() => db.Document.sequelize.sync({ force: true }));

  it('Ensures a newly created document has published date defined', () => {
    document.save().then((newDoc) => {
      expect(newDoc).to.have.property('createdAt');
      expect(newDoc.createdAt).not.to.equal('undefined');
    }).catch(error => expect(error).not.to.exist);
  });

  it('Should create a document with valid attributes', () =>
      document.save().then((newDoc) => {
        expect(newDoc.title).to.equal(document.title);
        expect(newDoc.content).to.equal(document.content);
      }).catch(err => expect(err).to.not.exist));

  it('Ensures a document access is set to public by default', () => {
    document.save().then((newDoc) => {
      expect(newDoc.access).to.equal('public');
    }).catch(error => expect(error).not.to.exist);
  });

  it('Ensures a private document can only be retrieved by the creator and admin',
  (done) => {
    docHelper.access = 'private';
    request.get('/api/documents/1')
      .set({ 'x-access-token': token })
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
    helper.document2.OwnerId = 1;
    db.Document.create(helper.document2)
      .then((newDoc) => {
        request.get('/api/documents/?limit=5')
          .set({ 'x-access-token': token })
          .expect(200).end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(res.body).to.have.length.of.at.most(5);
            for (let i = 0; i < res.body.length - 1; i += 1) {
              expect(res.body[i].id).to.be
                .above(res.body[i + 1].id);
            }
            done();
          });
      });
  });

  it('Should get all documents for a specific user', (done) => {
    request.get('/api/users/1/documents')
      .set({ 'x-access-token': token })
      .expect(200).end((err, res) => {
        if (err) return done(err);
        expect(Array.isArray(res.body)).to.equal(true);
        done();
      });
  });


  /**
   * Test suite for admin access to docs
   */
  describe('Admin access', () => {
    it('Should return all docs to an admin', (done) => {
      const accessTypes = ['role', 'public', 'private'];
      request.get('/api/documents')
        .set({ 'x-access-token': token })
        .expect(200).end((err, res) => {
          if (err) return done(err);
          res.body.forEach((doc) => {
            expect(accessTypes.includes(doc.access))
              .to.equal(true);
          });
          done();
        });
    });
  });

  /**
   * Test suite to ensure that validation checks work properly and
   * the required fields are not supplied empty.
   */
  describe('Validations', () => {
    describe('Required fields', () => {
      requiredFields.forEach((field) => {
        it(`Should fail without the ${field} field`, () => {
          document[field] = null;

          return document.save()
            .then(newDoc => expect(newDoc).to.not.exist)
            .catch(error => expect(/notNull/.test(error.message)).to.be.true);
        });
      });
    });

    it('Should fail when access field is not valid', () => {
      document.access = 'crap';
      return document.save()
        .then(newDoc => expect(newDoc).to.not.exist)
        .catch(error =>
          expect(/isIn failed/.test(error.message)).to.be.true);
    });
  });

  it('Should create a new document', (done) => {
    request.post('/api/documents')
      .set({ 'x-access-token': token })
      .send(helper.document3)
      .end(res => expect(res.body).to.exist)
      .expect(201)
      .catch(error => expect(400).to.exist);
    done();
  });

  it('Should fail if a document does not exist', (done) => {
    request.get('/api/documents/7')
      .set({ 'x-access-token': token })
      .expect(404);
    done();
  });
  
  it('Should be updated by the owner of the doc', () => {
    request.put('/api/documents/2')
      .set({ 'x-access-token': token })
      .send({ title: 'Hi updated' })
      .end(res => expect(res.body).to.exist)
      .catch(err => expect(err.message).to.exist);
  });
});
