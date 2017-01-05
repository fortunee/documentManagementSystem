/**
 * Import users controllers and authentication middlewares.
 */
import UsersCtrl from '../../app/controllers/usersCtrl';
import Authentication from '../../app/middlewares/auth';

const usersRoute = (router) => {
  // Get all users or create a new user
  router.route('/users')
   .post(UsersCtrl.createUser)
   .get(Authentication.verifyToken, Authentication.verifyAdmin, UsersCtrl.allUsers);

  // A single user endpoint
  router.route('/users/:username')
    .put(Authentication.verifyToken, UsersCtrl.editUser)
    .get(Authentication.verifyToken, UsersCtrl.getUser)
    .delete(Authentication.verifyToken, UsersCtrl.deleteUser);

  // User's login endpoint
  router.route('/users/login').post(UsersCtrl.login);

  // Users logout endpoint
  router.route('/users/logout').post(UsersCtrl.logout);
};

export default usersRoute;
