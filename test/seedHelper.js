import faker from 'faker';
import bcrypt from 'bcrypt-nodejs';
import db from '../app/models';

/**
 * Seeder class to populate database with default data
 * @class Seeder
 */
class Seeder {
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
  init() {
    this.models.sequelize.sync({ force: true })
      .then(() => {
        this.setUpRoles()
          .then(() => {
            this.setUpUsers()
              .then(() => {
                this.setUpTypes()
                .then(() => {
                  this.setUpDocuments()
                    .catch((err) => {
                      // eslint-disable-next-line
                      console.log(err);
                    });
                })
                .catch((err) => {
                  // eslint-disable-next-line
                  console.log(err);
                });
              })
              .catch((err) => {
                // eslint-disable-next-line
                console.log(err);
              });
          })
          .catch((err) => {
            // eslint-disable-next-line
            console.log(err);
          });
      });
  }

  /**
   * Populates database with user data
   * @method setUpUsers
   * @returns {Void} No Return
   */
  setUpUsers() {
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
  setUpRoles() {
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
   * Populates database with default roles
   * @method setupRoles
   * @returns {object} Promise
   */
  setUpTypes() {
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
   * @method setUpDocuments
   * @returns {Object} Promise
   */
  setUpDocuments() {
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

export default new Seeder().init();
