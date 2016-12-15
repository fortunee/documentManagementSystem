// import chai from 'chai';
// import supertest from 'supertest';
// import db from '../../app/models';
// import helper from '../specHelper';
// import app from '../../server';
//
// /**
//  * Here is a request handler from supertest
//  */
// const request = supertest.agent(app);
//
// /** Grab the expect method from chai */
// const expect = chai.expect;
//
// /**
//  * Document, Type and User helper
//  */
// const docHelper = helper.document;
// const typeHelper = helper.type;
// const userHelper = helper.user;
// const roleHelper = helper.role;
//
//
// describe('Search documents', () => {
//   let adminToken;
//   let userToken;
//
//   before((done) => {
//     db.Role.create(roleHelper);
//     request.post('/api/users')
//       .send(userHelper)
//       .expect(200).end((err, res) => {
//         adminToken = res.body.token;
//       });
//   });
//
//   it('Should create a new regular user', (done) => {
//     roleHelper.title = 'regular';
//     db.Role.create(roleHelper);
//     request.post('/api/users')
//       .send(userHelper)
//       .expect(200).end((err, res) => {
//         userToken = res.body.token;
//         done();
//       });
//   });
//
//   it('should return documents that can be accessed only be a specified role',
//     (done) => {
//       request.get('/api/documents/query?limit=5&role=admin')
//         .set({ 'x-access-token': adminToken })
//         .expect(200).end((err, res) => {
//           if (err) {
//             return done(err);
//           }
//           expect(res.body).to.be.instanceof(Array);
//           expect(res.body).to.have.lengthOf(1);
//           done();
//         });
//     });
//
//   it('should return an empty array if document do not exist for a role',
//     (done) => {
//       request.get('/api/documents/query?limit=5&role=Observer')
//         .set({ 'x-access-token': adminToken })
//         .expect(200).end((err, res) => {
//           if (err) {
//             return done(err);
//           }
//           expect(res.body).to.be.instanceof(Array);
//           expect(res.body).to.have.lengthOf(0);
//           done();
//         });
//     });
//
//   it('should return documents that were published on a certain date',
//     (done) => {
//       request.get(`/api/documents/query?limit=5&date=${new Date().toISOString().substr(0, 10)}`)
//         .set({ 'x-access-token': adminToken })
//         .expect(200).end((err, res) => {
//           if (err) {
//             return done(err);
//           }
//           expect(res.body).to.have.lengthOf(5);
//           done();
//         });
//     });
//
//   it('should print appropriate message if document do not exist for a date',
//     (done) => {
//       request.get('/api/documents/query?limit=5&date=2016-10-01')
//         .set({ 'x-access-token': adminToken })
//         .expect(200).end((err, res) => {
//           if (err) {
//             return done(err);
//           }
//           expect(res.body).to.be.instanceof(Array);
//           expect(res.body).to.have.lengthOf(0);
//           done();
//         });
//     });
//
//   it('should return only public documents to guests', (done) => {
//     request.get(`/api/documents/query?date=${new Date().toISOString().substr(0, 10)}`)
//       .expect(200).end((err, res) => {
//         if (err) {
//           return done(err);
//         }
//         expect(res.body).to.be.instanceof(Array);
//         expect(res.body).to.have.lengthOf(2);
//         done();
//       });
//   });
//
//   it('should show users their private documents and public documents',
//     (done) => {
//       request.get(`/api/documents/query?date=${new Date().toISOString().substr(0, 10)}`)
//         .set({ 'x-access-token': userToken })
//         .expect(200).end((err, res) => {
//           if (err) {
//             return done(err);
//           }
//           expect(res.body).to.be.instanceof(Array);
//           expect(res.body).to.have.lengthOf(4);
//           done();
//         });
//     });
//
//   it('should return all documents to admins', (done) => {
//     request.get(`/api/documents/query?date=${new Date().toISOString().substr(0, 10)}`)
//       .set({ 'x-access-token': adminToken })
//       .expect(200).end((err, res) => {
//         if (err) {
//           return done(err);
//         }
//         expect(res.body).to.be.instanceof(Array);
//         expect(res.body).to.have.lengthOf(9);
//         done();
//       });
//   });
// });
