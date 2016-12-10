import chai from 'chai';
import db from '../../app/models';
import app from '../../server';
import helper from '../specHelper';


/** Grab the expect method from chai */
const expect = chai.expect;


/**
 * Params user and role from the spec helper
 */
const userParams = helper.user;
const roleParams = helper.role;


/**
 * Field attributes that Should be unique and required
 */
const requiredFields = ['firstName', 'lastName', 'email', 'password', 'RoleId'];
const uniqueFields = ['username', 'email'];


/**
 * Initialize a user for test
 */
let user;


/**
 * Test suite for the user model
 */
describe('User model', () => {
  /**
   * Build and populate the user and role tables
   * beforeEach test runs.
   */
  beforeEach(() =>
    db.Role.create(roleParams)
      .then((role) => {
        userParams.RoleId = role.id;
        user = db.User.build(userParams);
      }));

  // clear database after a test done
  afterEach(() => db.User.sequelize.sync({ force: true }));


  /**
   * Test suite to ensure a User is created alongside it's
   * attributes.
   */
  describe('Create user', () => {
    it('Should create a User', () => expect(user).to.exist);

    it('Should have both first and last name', () => {
      expect(user.firstName).to.equal(userParams.firstName);
      expect(user.lastName).to.equal(userParams.lastName);
    });

    it('Should save a user with valid attributes', () =>
      user.save().then(newUser =>
        expect(newUser.firstName).to.equal(user.firstName)));

    it('Should have a role defined', () =>
      user.save().then(newUser =>
        db.User.findById(newUser.id, { include: [db.Role] })
          .then((foundUser) => {
            expect(foundUser.Role.title).to.equal(roleParams.title);
          })));

    it('Should create a new user and hash the password', () =>
      user.save().then(newUser =>
          expect(newUser.password).not.to.equal(userParams.password)));
  });


  /**
   * Test suite to ensure that an updated password is hashed
   */
  describe('Update User password', () => {
    it('Should hash updated password', () =>
     user.save().then(newUser =>
       newUser.update({ password: 'updatepass' })
         .then((updatedUser) => {
           expect(updatedUser.password).not.to.equal('updatepass');
         })
    ));
  });


  /**
   * Test suite to ensure that validations on required
   * fields are checked and is working properly
   */
  describe('Update Validations', () => {
    describe('Required Fields', () => {
      requiredFields.forEach((field) => {
        it(`Should fail without ${field} field`, () => {
          user[field] = null;

          return user.save()
            .then(newUser => expect(newUser).not.to.exist)
            .catch(error =>
              expect(/notNull/.test(error.message)).to.be.true);
        });
      });
    });


    /**
     * Test suite to ensure that validations are checked on unique
     * fields.
     */
    describe('Unique Fields', () => {
      uniqueFields.forEach((field) => {
        it(`Should fail for non unique ${field} field`, () =>
          user.save().then((newUser) => {
            const user2 = db.User.build(userParams);
            user2.RoleId = newUser.RoleId;

            return user2.save()
              .then(newUser2 => expect(newUser2).not.to.exist)
              .catch(error =>
                expect(/SequelizeUnique/.test(error.name)).to.be.true);
          }));
      });
    });

    // Ensures the user email is valid.
    it('Should fail for an invalid email', () => {
      user.email = 'fortune';
      return user.save()
        .then(newUser => expect(newUser).to.not.exist)
        .catch(error =>
          expect(/failed/.test(error.message)).to.be.true);
    });
  });


  /**
   * Test suite to ensure the password is valid
   * when hashed.
   */
  describe('Validate hashed password', () => {
    it('Should be valid for correct password', () =>
      user.save().then(newUser =>
        expect(newUser.validPassword(userParams.password)).to.be.true));

    it('Should be invalid for incorrect password', () =>
      user.save().then(newUser =>
        expect(newUser.validPassword('fortune')).to.be.false));
  });
});
