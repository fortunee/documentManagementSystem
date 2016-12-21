import chai from 'chai';
import supertest from 'supertest';
import db from '../../app/models';
import app from '../../app/config/app';
import helper from '../specHelper';

/**
 * Here is a request handler from supertest
 */
const request = supertest.agent(app);

/**
 * Grab the expect method from chai
 */
const expect = chai.expect;

/**
 * Admin and Regular users
 */
const adminUser = helper.adminUser;
const regularUser = helper.regularUser;
const testUser = helper.testUser;

/**
 * Initialize a username and tokens for the tests
 */
let adminToken, regularToken, regularUsername;

describe('User', () => {
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
        regularUsername = res.body.user.username;
        done();
      });
  });

  after(() => db.User.sequelize.sync({ force: true }));

  describe('Create, login and logout user', () => {
    it('Should create a new user with valid attributes', (done) => {
      request.post('/api/users')
        .send(testUser)
        .expect(201)
        .end((err, res) => {
          expect(res.body.user).to.have.property('firstName');
          expect(res.body.user).to.have.property('lastName');
          expect(res.body.user).to.have.property('username');
          expect(res.body.user).to.have.property('email');
          expect(res.body.user).to.have.property('RoleId');
          done();
        });
    });

    it('Should fail if an invalid email is supplied', (done) => {
      request.post('/api/users')
        .send({ email: 'invalid email' })
        .expect(400)
        .end((err, res) => {
          expect(typeof res.error).to.equal('object');
          expect(/cannot be null/.test(res.error.text)).to.equal(true);
          done();
        });
    });

    it('Should create a unique user', (done) => {
      request.post('/api/users')
        .send(regularUser)
        .expect(409)
        .end((err, res) => {
          expect(/There's a user with this email/.test(res.body.message)).to.equal(true);
          done();
        });
    });

    it('Should login a user', (done) => {
      request.post('/api/users/login')
        .send(regularUser)
        .expect(200)
        .end((err, res) => {
          expect(typeof res.body).to.equal('object');
          expect(res.body).to.have.property('token');
          expect(res.body.token).not.to.equal(null);
          done();
        });
    });
  });

  it('Should fail with invalid credentials', (done) => {
    request.post('/api/users/login')
    .send({ email: 'invalid@email', password: 'pass' })
    .expect(401)
    .end((err, res) => {
      expect(typeof res.body).to.equal('object');
      expect(res.body).to.have.property('message');
      expect(res.body.message)
        .to.equal('Authentication failed due to invalid credentials.');
      done();
    });
  });

  it('Should logout a user', (done) => {
    request.post('/api/users/logout')
      .end((err, res) => {
        expect(typeof res.body).to.equal('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Successfully logged out.');
        done();
      });
  });

  describe('Get user', () => {
    it('Should return all users to an admin', (done) => {
      request.get('/api/users')
        .set({ 'x-access-token': adminToken })
        .expect(200)
        .end((err, res) => {
          expect(Array.isArray(res.body)).to.equal(true);
          expect(res.body[0]).to.have.property('id');
          expect(res.body[0]).to.have.property('firstName');
          expect(res.body[0]).to.have.property('lastName');
          expect(res.body[0]).to.have.property('username');
          expect(res.body[0]).to.have.property('email');
          done();
        });
    });

    it('Should fail to return all users to a non admin', (done) => {
      request.get('/api/users')
        .set({ 'x-access-token': regularToken })
        .expect(403)
        .end((err, res) => {
          expect(typeof res.body).to.equal('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message)
            .to.equal('Access forbidden, you are not an admin!');
          done();
        });
    });

    it('Should return a specific user', (done) => {
      request.get(`/api/users/${regularUsername}`)
        .set({ 'x-access-token': adminToken })
        .expect(200)
        .end((err, res) => {
          expect(typeof res.body).to.equal('object');
          expect(res.body.username).to.equal(regularUsername);
          expect(res.body.email).to.equal(regularUser.email);
          expect(res.body.firstName).to.equal(regularUser.firstName);
          expect(res.body.lastName).to.equal(regularUser.lastName);
          done();
        });
    });

    it('Should fail if a users does not exist', (done) => {
      request.get('/api/users/notexist')
        .set({ 'x-access-token': adminToken })
        .expect(404)
        .end((err, res) => {
          expect(typeof res.body).to.equal('object');
          expect(res.body.message)
            .to.equal('User with username: notexist does not exist');
          done();
        });
    });

    it('Should fail if a token is invalid', (done) => {
      request.get(`/api/users/${regularUsername}`)
        .set({ 'x-access-token': 'invalid token' })
        .expect(401)
        .end((err, res) => {
          expect(typeof res.body).to.equal('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message)
            .to.equal('Authentication failed due to invalid token!');
          done();
        });
    });

    it('Should fail if a token is not supplied', (done) => {
      request.get('/api/users/notexist')
        .expect(401)
        .end((err, res) => {
          expect(typeof res.body).to.equal('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message)
            .to.equal('Authentication required to access this route!');
          done();
        });
    });
  });

  describe('Update a user', () => {
    it('Should edit and update a user', (done) => {
      request.put(`/api/users/${regularUsername}`)
        .set({ 'x-access-token': regularToken })
        .send({
          firstName: 'John',
          lastName: 'Doe',
          password: 'newpassword'
        })
        .expect(200)
        .end((err, res) => {
          expect(typeof res.body).to.equal('object');
          expect(res.body.firstName).to.equal('John');
          expect(res.body.lastName).to.equal('Doe');
          done();
        });
    });

    it('Should fail to update a user that does not exist', (done) => {
      request.put('/api/users/notexist')
        .set({ 'x-access-token': regularToken })
        .expect(404)
        .end((err, res) => {
          expect(typeof res.body).to.equal('object');
          expect(res.body.message).to.equal('Cannot edit a user that does not exist');
          done();
        });
    });
  });

  describe('Delete a user', () => {
    it('Should fail to delete a user by a different user', (done) => {
      request.delete(`/api/users/${regularUsername}`)
        .set({ 'x-access-token': adminToken })
        .expect(403)
        .end((err, res) => {
          expect(typeof res.body).to.equal('object');
          expect(res.body.message)
            .to.equal('Oops! you cant delete someone else');
          done();
        });
    });

    it('Should find and delete a user', (done) => {
      request.delete(`/api/users/${regularUsername}`)
        .set({ 'x-access-token': regularToken })
        .expect(200)
        .end((err, res) => {
          expect(typeof res.body).to.equal('object');
          expect(res.body.message).to.equal('User deleted.');
          done();
        });
    });

    it('Should fail to delete a user that does not exist', (done) => {
      request.delete('/api/users/notexist')
        .set({ 'x-access-token': regularToken })
        .expect(404)
        .end((err, res) => {
          expect(typeof res.body).to.equal('object');
          expect(res.body.message)
            .to.equal('Cannot delete a user that does not exist');
          done();
        });
    });
  });
});
