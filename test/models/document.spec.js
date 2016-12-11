import chai from 'chai';
import db from '../../app/models';
import helper from '../specHelper';

/** Grab the expect method from chai */
const expect = chai.expect;

/**
 * Params document, a type and a user from the spec helper
 */
const docParams = helper.document;
const typeParams = helper.type;
const userParams = helper.user;
const roleParams = helper.role;


/**
 * Required document fields that should not be empty/null
 */
const requiredFields = ['title', 'content', 'OwnerId'];

/**
 * Initialize a document for test
 */
let document;

/**
 * Test suite for the document module
 */
describe('Document model', () => {
  /**
   * Build and populate the document and type tables
   * beforeEach test runs.
   */
  beforeEach(() =>
   db.Role.create(helper.role).then((role) => {
     userParams.RoleId = role.id;
     return db.User.create(userParams)
       .then((user) => {
         docParams.OwnerId = user.id;
         document = db.Document.build(docParams);
       });
   })
  );

  // clear database after a test done
  afterEach(() => db.Document.sequelize.sync({ force: true }));


  /**
   * Test suite ensure a new document is created with a published
   * date alongside other valid attributes.
   */
  describe('Create document', () => {
    it('Should create a new document', () => expect(document).to.exist);

    it('Should have a published date of each created document defined', () => {
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
  });


  /**
   * Test suite to ensure that each newly created document has
   * the access set to public by default.
   */
  describe('Document access', () => {
    it('Should set document access to public by default', () => {
      document.save().then((newDoc) => {
        expect(newDoc.access).to.equal('public');
      }).catch(error => expect(error).not.to.exist);
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
});
