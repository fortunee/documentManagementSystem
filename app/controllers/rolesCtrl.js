import db from '../models';

const RolesCtrl = {
  /**
   * Grab all the roles in the db
   * @param {object} req
   * @param {object} res
   * @returns {void}
   */
  async allRoles(req, res) {
    const roles = await db.Role.findAll()
      .catch(e => res.status(500).send(e.errors));
    
    res.status(200).send(roles);
  },

  /**
   * Create a new role
   * @param {bject} req
   * @param {object} res
   * @returns {void}
   */
  async createRole(req, res) {
    const role = await db.Role.create(req.body)
      .catch(err => res.status(400).send(err.errors));
    
    res.status(201).send(role);
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
