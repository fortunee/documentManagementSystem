const faker = require('faker');

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Users', [
      {
        id: 1,
        username: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 2,
        username: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Users', {
      id: [1, 2]
    });
  }
};
