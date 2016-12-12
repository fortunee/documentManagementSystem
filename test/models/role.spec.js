import chai from 'chai';
import db from '../../app/models';
import helper from '../specHelper';


/** Grab the expect method from chai */
const expect = chai.expect;

/**
 * Initialize a role for test
 */
let role;
/**
 * Test suite to ensure the Role model works as it should.
 */
describe('Role model', () => {
  beforeEach(() => {
    role = db.Role.build(helper.role);
  });

  // clear database after a test done
  afterEach(() => db.Role.sequelize.sync({ force: true }));

  it('Should create a role instance', () => expect(role).to.exist);

  it('Should ensure the required field is not empty', () => {
    role.title = null;

    role.save().then(newRole => expect(newRole).not.to.exist)
    .catch(error =>
      expect(/notNull/.test(error.message)).to.be.true);
  });

  it('Should ensure the unique fields works fine', () => {

  });
});
