import supertest from 'supertest';
import chai from 'chai';
import app from '../../server';
import db from '../../app/models';
import specHelper from '../specHelper';


/** Grab the expect method from chai */
const expect = chai.expect;


/**
 * Here is a request handler from supertest
 */
const request = supertest.agent(app);

// user and token instance for test purposes
let user, token;

describe('User Ctrl', () => {
  describe('Created user with a token', () => {
    beforeEach(() =>
      db.Role.create(specHelper.role)
        .then((role) => {
          specHelper.user.RoleId = role.id;
          return db.User.create(specHelper.user);
        }).then((newUser) => {
          user = newUser;
          request.post('/api/users/login')
            .send(specHelper.user)
            .end((error, res) => {
              token = res.body.token;
            });
        }));
  });
});
