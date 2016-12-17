import faker from 'faker';

if (process.env.NODE_ENV !== 'test') {
  process.exit(1);
}


module.exports = {
  role: {
    title: 'admin'
  },
  role2: {
    title: 'regular'
  },
  type: {
    title: 'letter'
  },
  adminUser: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    RoleId: 1
  },

  adminUser2: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    RoleId: 1
  },

  adminUser3: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    RoleId: 1
  },

  adminUser4: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    RoleId: 1
  },

  regularUser: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    RoleId: 2
  },

  regularUser2: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    RoleId: 2
  },

  regularUser3: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    RoleId: 2
  },

  regularUser4: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    RoleId: 2
  },

  testUser: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    RoleId: 2
  },

  document: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph()
  },

  document2: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph()
  },

  document3: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph()
  }
};
