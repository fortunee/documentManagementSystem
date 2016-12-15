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
const typeHelper = helper.type;
const roleHelper = helper.role;
const userHelper = helper.user;

/**
 * Initialize a role and a token for test
 */
let type, role, token;
/**
 * Role test suite
 */
describe('Type', () => {
  beforeEach(() => {
    type = db.Type.build(roleHelper);
    db.Role.create(roleHelper)
      .then((newRole) => {
        role = newRole;
        userHelper.RoleId = newRole.id;
      });
    db.Type.create(typeHelper)
      .then((newType) => {
        // type = newType;
        userHelper.TypeId = newType.id;
      });
  });

  // clear database after test done
  afterEach(() => db.Role.sequelize.sync({ force: true, logging: false }));

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

  it('Ensures an authenticated user can create a new type', (done) => {
    request.post('/api/types')
      .set({ 'x-access-token': token })
      .send(typeHelper)
      .expect(201);
    done();
  });

  it('Ensures the type has a unique title', () => {
    type.save().then((newType) => {
      const type2 = db.Role.build(typeHelper);
      type2.title = newType.title;

      return type2.save()
        .then(newType2 => expect(newType2).not.to.exist)
        .catch(error =>
          expect(/SequelizeUnique/.test(error.name)).to.be.true);
    });
  });

  it('Ensures the types can be fetched', () => {
    request.get('/api/types')
      .set({ 'x-access-token': token })
      .expect(200);
  });

  it('Ensures a type can be updated', (done) => {
    typeHelper.title = 'medical';
    request.put('/api/types/1')
      .set({ 'x-access-token': token })
      .send(typeHelper)
      .expect(201);
    done();
  });

  it('Ensures a type can be deleted', (done) => {
    request.delete('/api/types/1')
      .set({ 'x-access-token': token })
      .expect(200);
    done();
  });

  it('Ensures the required title field is not empty', () => {
    type.title = null;
    // const type2 = db.Type.build(typeHelper);
    return type.save()
        .then(newType => expect(newType).not.to.exist)
        .catch(error =>
          expect(/notNull/.test(error.message)).to.be.true);
  });
});
