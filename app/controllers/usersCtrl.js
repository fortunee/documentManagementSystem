import jwt from 'jsonwebtoken';
import db from '../models';

const secret = process.env.SECRET || 'jump drop mobs kicking it in';


/**
 * All user fields and set values to the
 * specific fields
 * @param {Object}  user object
 * @returns {Object} user fields object
 */
const allUserFields = (user) => {
  const fields = {
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    RoleId: user.RoleId,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };

  return fields;
};


/**
 * Users controller
 */
const userCtrl = {

  /**
   * Login a user
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} Response object
   */
  login(req, res) {
    db.User.findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (user && user.validPassword(req.body.password)) {
          const token = jwt.sign({
            UserId: user.id,
            RoleId: user.RoleId
          }, secret, { expiresIn: '2 days' });

          res.send({ token, expiresIn: '2 days' });
        } else {
          res.status(401)
            .send({ message: 'Authentication failed due to invalid credentials.' });
        }
      });
  },


  /**
   * logout - Logout a user
   *
   * @param  {Objec} req - Request Object
   * @param  {Object} res - Response Object
   * @returns {Void}     Returns Void
   */
  logout(req, res) {
    res.send({ message: 'Successfully logged out.' });
  },

  /**
   * Grab all users with their fields
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Void} Returns Void
   */
  allUsers(req, res) {
    db.User.findAll({
      fields: [
        'id',
        'username',
        'firstName',
        'lastName',
        'email',
        'RoleId',
        'createdAt',
        'updatedAt'
      ]
    }).then((users) => {
      res.send(users);
    });
  },

  /**
   * Create a new user
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} Response object
   */
  createUser(req, res) {
    db.User.findOne({ where: { email: req.body.email } })
      .then((userExists) => {
        if (userExists) {
          return res.status(400)
            .send({ message: `There's a user with this email: ${req.body.email}` });
        }

        db.User.create(req.body)
          .then((user) => {
            // user.RoleId = 2;
            const token = jwt.sign({
              UserId: user.id,
              RoleId: user.RoleId
            }, secret, { expiresIn: '2 days' });

            user = allUserFields(user);
            res.status(201).send({ token, expiresIn: '2 days', user });
          })
          .catch((err) => {
            res.status(400).send(err.errors);
          });
      });
  },

  /**
  * Get a specific user
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} Response object
  */
  getUser(req, res) {
    db.User.findOne({ where: { username: req.params.username } })
     .then((user) => {
       if (!user) {
         return res.status(404)
           .send({ message: `User with username: ${req.params.username} does not exist` });
       }

       user = allUserFields(user);
       res.send(user);
     });
  },

  /**
   * Edit and update a specific user
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} Response object
   */
  editUser(req, res) {
    db.User.findOne({ where: { username: req.params.username } })
      .then((user) => {
        if (!user) {
          return res.status(404)
            .send({ message: 'Cannot edit a user that does not exist' });
        }

        user.update(req.body)
          .then((updatedUser) => {
            updatedUser = allUserFields(updatedUser);

            res.send(updatedUser);
          });
      });
  },

  /**
   * Delete a specific user
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} Response object
   */
  deleteUser(req, res) {
    db.User.findOne({ where: { username: req.params.username } })
      .then((user) => {
        if (!user) {
          return res.status(404)
            .send({ message: 'Cannot delete a user that does not exist' });
        }

        user.destroy()
          .then(() => res.send({ message: 'User deleted.' }));
      });
  }
};

module.exports = userCtrl;
