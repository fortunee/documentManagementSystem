import jwt from 'jsonwebtoken';
import db from '../models';

const secret = process.env.SECRET || 'jump drop mobs kicking it in';


const userFields = (user) => {
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

};

module.exports = userCtrl;
