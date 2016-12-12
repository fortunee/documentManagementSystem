import db from '../models';

const rolesCtrl = {
  /**
   * Grab all the roles in the db
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Void} Returns Void
   */
  allRoles(req, res) {
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
  createRole(req, res) {
    db.Role.create(req.body)
      .then((role) => {
        res.status(201).send(role);
      })
      .catch((err) => {
        res.status(400).send(err.errors);
      });
  },

  /**
   * Grab a specific role
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @returns {Object} Response object
   */
  getRole(req, res) {
    db.Role.findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(404)
            .send({ message: `Role with the id: ${req.params.id} does not exit` });
        }

        res.send(role);
      });
  },

};

module.exports = rolesCtrl;
