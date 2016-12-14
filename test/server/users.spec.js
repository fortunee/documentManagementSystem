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
 * Params user and role from the spec helper
 */
const userHelper = helper.user;
const roleHelper = helper.role;


/**
 * Field attributes that Should be unique and required
 */
const requiredFields = ['firstName', 'lastName', 'email', 'password', 'RoleId'];
const uniqueFields = ['username', 'email'];


/**
 * Initialize a user and a role for test
 */
let user, token;

describe('User', () => {
  /**
   * Build and populate the user and role tables
   * beforeEach test runs.
   */
  beforeEach(() =>
    db.Role.create(roleHelper)
      .then((role) => {
        userHelper.RoleId = role.id;
        user = db.User.build(userHelper);
      }));


  // clear database after a test is done
  afterEach(() => db.User.sequelize.sync({ force: true }));


  it('Should create a unique user', () => {
    user.save().then((newUser) => {
      const user2 = db.User.build(userHelper);
      user2.RoleId = newUser.RoleId;

      return user2.save()
        .then(newUser2 => expect(newUser2).not.to.exist)
        .catch(error =>
          expect(/SequelizeUnique/.test(error.name)).to.be.true);
    });
  });

  it('Should have a role defined for the new user', () => {
    user.save().then(newUser =>
      db.User.findById(newUser.id, { include: [db.Role] })
        .then((foundUser) => {
          expect(foundUser.Role.title).to.equal(roleHelper.title);
        }));
  });

  it('Should have both first and last names', () => {
    request.post('/api/users')
      .send(userHelper)
      .expect(201).end((err, res) => {
        token = res.body.token;
      });

    user.save().then((newUser) => {
      expect(newUser.firstName).not.to.equal('undefined');
      expect(newUser.lastName).not.to.equal('undefined');
    });
  });

  it('Should return all users to an admin', (done) => {
    request.get('/api/user')
      .set({ 'x-access-token': token })
      .expect(200);
    done();
  });
});
