import db from '../models';

const rolesCtrl = {
  /**
   * Grab all the roles in the db
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Void} Returns Void
   */
  index(req, res) {
    db.Role.findAll().then((roles) => {
      res.send(roles);
    });
  },

  /**
   * Create a new role
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Void} Returns Void
   */
  create(req, res) {
    db.Role.create(req.body)
      .then((role) => {
        res.status(201).send(role);
      })
      .catch((err) => {
        res.status(400).send(err.errors);
      });
  },


};

module.exports = rolesCtrl;
