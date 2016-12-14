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
 * Role and User helpers
 */
const roleHelper = helper.role;
const userHelper = helper.user;

/**
 * Initialize a role and a token for test
 */
let role, token;
/**
 * Role test suite
 */
describe('Role', () => {
  beforeEach(() => {
    // role = db.Role.build(roleHelper);
    db.Role.create(roleHelper)
      .then((newRole) => {
        role = newRole;
        userHelper.RoleId = newRole.id;
      });
  });

  // clear database after test done
  afterEach(() => db.Role.sequelize.sync({ force: true }));

  /**
   * Create a user and use the generated token
   */
  it('Should create a new user', () => {
    request.post('/api/users')
      .send(userHelper)
      .expect(201).end((err, res) => {
        token = res.body.token;
      });
  });

  it('Ensures an admin can create a new role', (done) => {
    request.post('/api/roles')
      .set({ 'x-access-token': token })
      .send(roleHelper)
      .expect(201);
    done();
  });

  it('Ensures the role has a unique title', () => {
    role.save().then((newRole) => {
      const role2 = db.Role.build(roleHelper);
      role2.title = newRole.title;

      return role2.save()
        .then(newRole2 => expect(newRole2).not.to.exist)
        .catch(error =>
          expect(/SequelizeUnique/.test(error.name)).to.be.true);
    });
  });

  it('Ensures the roles can only be retrieved by an admin', () => {
    request.get('/api/role')
      .set({ 'x-access-token': token })
      .expect(200);
  });

  it('Should have atleast an admin and a regular role', () => {
    const role2 = db.Role.build(roleHelper);
    role2.title = 'regular';
    expect(role.title).to.equal('admin');
    expect(role2.title).to.equal('regular');
  });

  it('Ensures the required title field is not empty', () => {
    role.title = null;

    return role.save()
        .then(newRole => expect(newRole).not.to.exist)
        .catch(error =>
          expect(/notNull/.test(error.message)).to.be.true);
  });
});
