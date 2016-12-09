import supertest from 'supertest';
import chai from 'chai';
import db from '../../app/models';
import app from '../../server';
import helper from '../specHelper';

/**
 * Here is a request handler from supertest
 */
const request = supertest.agent(app);

/** Grab the expect method from chai */
const expect = chai.expect;


/**
 * Params user and role from the spec helper
 */
const userParams = helper.user;
const roleParams = helper.role;


/**
 * Field attributes that Should be unique and are required
 */
const requiredFields = ['firstName', 'lastName', 'email', 'password', 'RoleId'];
const uniqueFields = ['username', 'email'];

let user;
describe('User model', () => {
  beforeEach(() =>
    db.Role.create(roleParams)
      .then((role) => {
        userParams.RoleId = role.id;
        user = db.User.build(userParams);
      }));

  // clear database after a test done
  afterEach(() => db.User.sequelize.sync({ force: true }));

  describe('Create user', () => {
    it('Should create a User instance', () => expect(user).to.exist);

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
          expect(newUser.password).to.not.equal(userParams.password)));
  });

  describe('Update User', () => {
    it('Should hash updated password', () =>
     user.save().then(newUser =>
       newUser.update({ password: 'newpassword' })
         .then((updatedUser) => {
           expect(updatedUser.password).to.not.equal('newpassword');
         })
    ));
  });

  describe('Update Validations', () => {
    describe('Required Fields', () => {
      requiredFields.forEach((field) => {
        it(`fails without ${field}`, () => {
          user[field] = null;

          return user.save()
            .then(newUser => expect(newUser).to.not.exist)
            .catch(err =>
              expect(/notNull/.test(err.message)).to.be.true);
        });
      });
    });

    describe('UNIQUE attributes', () => {
      uniqueFields.forEach((attr) => {
        it(`fails for non unique ${attr}`, () =>
          user.save().then((newUser) => {
            const user2 = db.User.build(userParams);
            user2.RoleId = newUser.RoleId;

            return user2.save()
              .then(newUser2 => expect(newUser2).to.not.exist)
              .catch(err =>
                expect(/SequelizeUniqueConstraintError/.test(err.name)).to.be.true);
          }));
      });
    });

    it('fails for invalid email', () => {
      user.email = 'invalid email';
      return user.save()
        .then(newUser => expect(newUser).to.not.exist)
        .catch(err =>
          expect(/isEmail failed/.test(err.message)).to.be.true);
    });
  });

  describe('user.validPassword', () => {
    it('valid for correct password', () =>
      user.save().then(newUser =>
        expect(newUser.validPassword(userParams.password)).to.be.true));

    it('invalid for incorrect password', () =>
      user.save().then(newUser =>
        expect(newUser.validPassword('invalid password')).to.be.false));
  });
});
