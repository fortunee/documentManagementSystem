/**
 * @TODO: Add and import users controllers
 * alongside authentication and authentication.
 */

const userRoute = (router) => {
  // Get all users or create a new user
  router.route('/users')
   .post((req, res) => {
     res.send({ message: 'post some data to users endpoint' });
   })
   .get((req, res) => {
     res.send({ message: 'Get all users' });
   });

  // A single user endpoint
  router.route('/users/:username')
    .put((req, res) => {
      res.send({ message: 'Update some user' });
    })
    .get((req, res) => {
      res.send({ message: 'Get a specific user' });
    })
    .delete((req, res) => {
      res.send({ message: 'Delete a specific user' });
    });

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

