/**
 * Import users and documents controllers
 * alongside authentication and authentication.
 */
import usersCtrl from '../../app/controllers/usersCtrl';
import docsCtrl from '../../app/controllers/docsCtrl';
import Authentication from '../../app/middlewares/auth';

const userRoute = (router) => {
  // Get all users or create a new user
  router.route('/users')
   .post(usersCtrl.createUser)
   .get(Authentication.verifyToken, Authentication.verifyAdmin, usersCtrl.allUsers);

  // A single user endpoint
  router.route('/users/:username')
    .put(Authentication.verifyToken, usersCtrl.editUser)
    .get(Authentication.verifyToken, usersCtrl.getUser)
    .delete(Authentication.verifyToken, usersCtrl.deleteUser);

  // User's login endpoint
  router.route('/users/login').post((req, res) => {
    res.send({ message: 'login endpoint' });
  });

  // Users logout endpoint
  router.route('/users/logout').post((req, res) => {
    res.send({ message: 'logout endpoint' });
  });
};

export default userRoute;
