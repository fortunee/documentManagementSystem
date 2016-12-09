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
 * Field attributes that Should be unique and not empty
 */
const notNullAttrs = ['firstName', 'lastName', 'email', 'password', 'RoleId'];
const uniqueAttrs = ['username', 'email'];

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

  describe('Update user', () => {
    it('Should hash update password', () =>
     user.save().then(newUser =>
       newUser.update({ password: 'newpassword' })
         .then((updatedUser) => {
           expect(updatedUser.password).to.not.equal('newpassword');
         })
    ));
  });
});
