// import supertest from 'supertest';
// import chai from 'chai';
// import app from '../../server';
// import db from '../../app/models';
// import specHelper from '../specHelper';
//
//
// /** Grab the expect method from chai */
// const expect = chai.expect;
//
// /**
//  * Params user and role from the spec helper
//  */
// const userParams = specHelper.user;
// const roleParams = specHelper.role;
//
// /**
//  * Here is a request handler from supertest
//  */
// const request = supertest.agent(app);
//
// // user and token instance for test purposes
// let user, token;
//
// describe('User Ctrl', () => {
//   describe('Created user with a token', () => {
//     beforeEach(() =>
//       db.Role.create(roleParams)
//         .then((role) => {
//           userParams.RoleId = role.id;
//           return db.User.create(userParams);
//         })
//         .then((newUser) => {
//           user = newUser;
//           request.post('/api/users/login')
//             .send(userParams)
//             .end((err, res) => {
//               token = res.body.token;
//             });
//         }));
//
//     // clear database after test is done
//     afterEach(() => db.User.sequelize.sync({ force: true }));
//
//     describe('Get all users', () => {
//       it('Should get all users if a token is provided', (done) => {
//         request.get('/api/users')
//           .set({ Authorization: token })
//           .end((err, res) => {
//             expect(res.status).to.equal(200);
//             done();
//           });
//       });
//     });
//   });
// });
