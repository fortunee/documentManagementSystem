import jwt from 'jsonwebtoken';
import { User } from '../models';

const secret = process.env.SECRET || 'jump drop mobs kicking it in';

/**
 * All user fields and set values to the
 * specific fields
 * @param {object}  user object
 * @returns {object} user fields object
 */
const allUserFields = (user) => ({
  id: user.id,
  username: user.username,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  RoleId: user.RoleId,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt
});

/**
 * Users controller
 */
const UsersCtrl = {

  /**
   * Login a user
   * @param {object} req
   * @param {object} res
   * @returns {object} user
   */
  async login(req, res) {
    const user = await User.findOne({ where: { email: req.body.email } })
      .catch(e => res.status(400).send(e));
    if (user && user.validPassword(req.body.password)) {
      const token = jwt.sign({
        UserId: user.id,
        RoleId: user.RoleId
      }, secret, { expiresIn: '2 days' });
      return res.status(200).send({ token, expiresIn: '2 days' });
    }
    return res.status(401)
      .send({ message: 'Authentication failed due to invalid credentials.' });
  },

  /**
   * logout - Logout a user
   *
   * @param  {objec} req - request Object
   * @param  {object} res - response Object
   * @returns {object} object
   */
  logout(req, res) {
    res.send({ message: 'Successfully logged out.' });
  },

  /**
   * Grab all users with their fields
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @returns {object} Returns user object
   */
  async allUsers(req, res) {
    const users = await User.findAll({
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
    });
   res.status(200).send(users);
  },

  /**
   * Create a new user
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @returns {object} User object
   */
  async createUser(req, res) {
    const existingUser = await User.findOne({ where: { email: req.body.email } })
      .catch(err => res.status(400).send(err.errors));
    
    if (existingUser) {
      return res.status(400)
        .send({ message: `There's a user with this email: ${req.body.email}` });
    }

    if (!req.body.RoleId) {
      req.body.RoleId = 2;
    }
    
    const newUser = await User.create(req.body)
      .catch(err => res.status(400).send(err.errors));
    
    const token = jwt.sign({
      UserId: newUser.id,
      RoleId: newUser.RoleId
    }, secret, { expiresIn: '2 days' });

    const user = allUserFields(newUser);
    return res.status(201).send({ token, expiresIn: '2 days', user });
  },

  /**
  * Get a specific user
  * @param {object} req - Request object
  * @param {object} res - Response object
  * @returns {object} User
  */
  async getUser(req, res) {
    const user = await User.findOne({ where: { username: req.params.username } })
      .catch(err => res.status(400).send(err.errors));
    if (!user) {
       return res.status(404)
         .send({ message: `User with username: ${req.params.username} does not exist` });
     }

     user = allUserFields(user);
     return res.status(200).send(user);
  },

  /**
   * Edit and update a specific user
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} Response object
   */
  editUser(req, res) {
    User.findOne({ where: { username: req.params.username } })
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
    User.findOne({ where: { username: req.params.username } })
      .then((user) => {
        if (!user) {
          return res.status(404)
            .send({ message: 'Cannot delete a user that does not exist' });
        }

        if (user.id !== req.decoded.UserId) {
          return res.status(403)
            .send({ message: 'Oops! you cant delete someone else' });
        }

        user.destroy()
          .then(() => res.send({ message: 'User deleted.' }));
      });
  }
};

export default UsersCtrl;
