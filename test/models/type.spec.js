import chai from 'chai';
import db from '../../app/models';
import helper from '../specHelper';


/** Grab the expect method from chai */
const expect = chai.expect;

/**
 * Initialize a type for test
 */
let type;


/**
 * Test suite to ensure the Type model works fine.
 */
describe('Type model', () => {
  beforeEach(() => {
    type = db.Type.build(helper.type);
  });

  // Clear db after test is done
  afterEach(() => db.Type.sequelize.sync({ force: true }));

  it('Should create a type instance', () => expect(type).to.exist);

  it('Should have a title field', () => {
    type.save()
      .then(newType => expect(newType).to.exist)
      .catch(error => expect(error.message).not.to.exist);
  });
});
