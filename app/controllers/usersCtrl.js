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
};

module.exports = userCtrl;
