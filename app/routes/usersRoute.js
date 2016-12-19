/**
 * Import users controllers and authentication middlewares.
 */
import usersCtrl from '../../app/controllers/usersCtrl';
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
  router.route('/users/login').post(usersCtrl.login);

  // Users logout endpoint
  router.route('/users/logout').post(usersCtrl.logout);
};

export default userRoute;
