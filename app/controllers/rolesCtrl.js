import db from '../models';

const RolesCtrl = {
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

  /**
   * Edit and update a specific role
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @returns {Object} Response Object
   */
  editRole(req, res) {
    db.Role.findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(404)
            .send({ message: 'Cannot edit a role that does not exist' });
        }

        role.update(req.body)
          .then((updatedRole) => {
            res.send(updatedRole);
          });
      });
  },

  /**
   * Delete a role
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @returns {Object} Response object
   */
  deleteRole(req, res) {
    db.Role.findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(404)
            .send({ message: 'Cannot delete a role that does not exist' });
        }

        role.destroy()
          .then(() => res.send({ message: 'Role deleted.' }));
      });
  }

};

export default RolesCtrl;
