import faker from 'faker';

if (process.env.NODE_ENV !== 'test') {
  process.exit(1);
}


module.exports = {
  role: {
    title: 'admin'
  },
  type: {
    title: 'letter'
  },
  user: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  },

  user2: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  },

  document: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph()
  }
};
