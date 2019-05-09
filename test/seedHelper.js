import faker from 'faker';
import bcrypt from 'bcrypt-nodejs';
import db from '../app/models';

/**
 * SeedData class to populate database with default data
 * @class SeedData
 */
class SeedData {
  /**
   * Creates new instance of password helper
   * and setup models for use in class
   * @method constructor
   */
  constructor() {
    this.models = db;
  }

  /**
   * Perform the populating sequentially
   * @method init
   * @return {Void} No Return
   */
  async init() {
    try {
      await this.models.sequelize.sync({ force: true });
      await this.rolesData();
      await this.usersData();
      await this.typesData();
      await this.documentsData();
      
      return 'Seed data initialization complete...'
    } catch (e) {
      return e
    }
  }

  /**
   * Populates database with user data
   * @method usersData
   * @returns {Object} Created users
   */
  usersData() {
    const users = [{
      username: faker.internet.userName(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: 'admin@mail.com',
      password: this.hashPass('code'),
      RoleId: 1,
    },
      {
        username: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: 'fortune@mail.com',
        password: this.hashPass('pass'),
        RoleId: 2,
      },
      {
        username: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: 'ekeruo@mail.com',
        password: this.hashPass('password'),
        RoleId: 2,
      },
    ];
    return this.models.User.bulkCreate(users);
  }

  /**
   * Populates database with default roles
   * @method setupRoles
   * @returns {object} Promise
   */
  rolesData() {
    const roles = [{
      title: 'admin',
    },
      {
        title: 'regular',
      },
    ];
    return this.models.Role.bulkCreate(roles);
  }

  /**
   * Populates database with default types
   * @method typesData
   * @returns {object} Promise
   */
  typesData() {
    const types = [{
      title: 'letter',
    },
      {
        title: 'report',
      },
    ];
    return this.models.Type.bulkCreate(types);
  }

  /**
   * Populates database with default documents
   * @method documentsData
   * @returns {Object} Promise
   */
  documentsData() {
    const docs = [
      {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        OwnerId: 1,
        access: 'private',
        TypeId: 1
      },
      {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        OwnerId: 2,
        access: 'public',
        TypeId: 2
      },
      {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        OwnerId: 3,
        access: 'private',
        TypeId: 1
      },
      {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        OwnerId: 2,
        access: 'private',
        TypeId: 1

      },
      {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        OwnerId: 1,
        access: 'public',
        TypeId: 2
      },
      {
        id: 8,
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        OwnerId: 2,
        access: 'role',
        TypeId: 2
      },
    ];
    return this.models.Document.bulkCreate(docs);
  }

  /**
  * Generate a hash from a password string
  * @method generate
  * @param {String} pword
  * @return {String} hashed password
  */
  hashPass(pword) {
    return bcrypt.hashSync(this.pword, bcrypt.genSaltSync(8));
  }
}

export default new SeedData().init();
