import models from '../models/index';


/**
 * Initializes the models
 * and populates the db with seeder data
 *
 * @class InitSeeders
 */
class Seeders {

  /**
   * constructor - Initialize the class with models
   */
  constructor() {
    this.models = models;
  }


  /**
   * init - synchronizes data into the db
   *
   * @returns {type}  description
   */
  init() {
    this.models.sequelize.sync({ logging: false })
      .then(() => {
        this.users()
          .then(() => {
            this.roles()
              .then(() => {
                this.documents()
                  .catch((err) => {
                    throw new Error(err.message);
                  });
              })
              .catch((err) => {
                throw new Error(err.message);
              });
          })
          .catch((err) => {
            throw new Error(err.message);
          });
      });
  }


  /**
   * users - Users seed data
   *
   * @returns {Object}  result of create users
   */
  users() {
    const users = [{
      firstName: 'Fortune',
      lastName: 'Iyke',
      email: 'fortune@test.com',
      password: 'pass',
      role: 'admin',
    },
      {
        firstname: 'Morgan',
        lastname: 'Freeman',
        email: 'morgan@freeman.com',
        password: 'pass2',
        role: 'regular',
      },
      {
        firstname: 'Denzel',
        lastname: 'Washington',
        email: 'denzel@wash.com',
        password: 'denzel',
        role: 'regular',
      },
    ];
    return this.models.users.bulkCreate(users, { validate: true });
  }


  /**
   * roles - seed data for roles that can be assigned to users
   *
   * @returns {Object}  result of the created roles
   */
  roles() {
    const roles = [
      {
        title: 'admin',
      },
      {
        title: 'regular',
      }
    ];
    return this.models.roles.bulkCreate(roles, { validate: true });
  }


  /**
   * documents - seed data for documents
   *
   * @returns {Object}  result of the created documents
   */
  documents() {
    const documents = [
      {
        title: 'Hello world',
        content: 'This is just some random content',
        ownerId: 1,
        access: 'private',
        role: 'regular'
      },

      {
        title: 'Whats IT',
        content: 'Whats IT?Asked he, Its Iced Tea,Replied she!',
        ownerId: 1,
        access: 'public',
        role: 'admin'
      },

      {
        title: 'Bits',
        content: 'Anonymously sharing insecurities via bits and bytes.',
        ownerId: 1,
        access: 'public',
        role: 'regular'
      },

      {
        title: 'Smart Phones',
        content: 'After Messages, Massaging phones, They became smart!',
        ownerId: 1,
        access: 'private',
        role: 'admin'
      }
    ];
    return this.models.documents.bulkCreate(documents, { validate: true });
  }
}

export default new Seeders().init();
