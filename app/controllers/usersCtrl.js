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
    lastNamse: user.lastName,
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
          return res.status(409)
            .send({ message: `There's no user with this email: ${req.body.email}` });
        }

        db.User.create(req.body)
          .then((user) => {
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
  * @param {Object} req Request object
  * @param {Object} res Response object
  * @returns {Object} Response object
  */
  getUser(req, res) {
    db.User.findById(req.params.id)
     .then((user) => {
       if (!user) {
         return res.status(404)
           .send({ message: `User with the id: ${req.params.id} does not exist` });
       }

       user = allUserFields(user);
       res.send(user);
     });
  },

  /**
   * Edit and update a specific user
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @returns {Object} Response object
   */
  editUser(req, res) {
    db.User.findById(req.params.id)
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
};

module.exports = userCtrl;
