import chai from 'chai';
import models from '../../app/models';

/** Grab the expect method from chai */
const expect = chai.expect;


/**
 * Test suite to ensure that all models exist.
 */
describe('Models', () => {
  it('Should ensure User model exists', () => expect(models.User).to.exist);
  it('Should ensure Role model exists', () => expect(models.Role).to.exist);
  it('Should ensure Type model exists', () => expect(models.Type).to.exist);
  it('Should ensure Document model exists', () => expect(models.Document).to.exist);
});
