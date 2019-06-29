import db from '../models';

const RolesCtrl = {
  /**
   * Grab all the roles in the db
   * @param {object} req
   * @param {object} res
   * @returns {object} roles
   */
  async allRoles(req, res) {
    const roles = await db.Role.findAll()
      .catch(e => res.status(500).send(e.errors));
    
    return res.status(200).send(roles);
  },

  /**
   * Create a new role
   * @param {object} req
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
   * @param {object} req
   * @param {object} res
   * @returns {object} role
   */
  async getRole(req, res) {
    const role = await db.Role.findById(req.params.id)
      .catch(err => res.status(400).send(err.errors));
    
    if (!role) {
      return res.status(404)
        .send({ message: `Role with the id: ${req.params.id} does not exit` });
    }

    return res.status(200).send(role);
  },

  /**
   * Edit and update a specific role
   * @param {object} req
   * @param {object} res
   * @returns {object} role
   */
  async editRole(req, res) {
    const role = await db.Role.findById(req.params.id)
      .catch(err => res.status(400).send(err.errors));
    
    if (!role) {
      return res.status(404)
        .send({ message: 'Cannot edit a role that does not exist' });
    }

    const updatedRole = await role.update(req.body)
    
    return res.status(200).send(updatedRole)
  },

  /**
   * Delete a role
   * @param {object} req
   * @param {object} res
   * @returns {object}
   */
  async deleteRole(req, res) {
    const role = await db.Role.findById(req.params.id);
    
    if (!role) {
      return res.status(404)
        .send({ message: 'Cannot delete a role that does not exist' });
    }

    await role.destroy();
    return res.status(200).send({ message: 'Role deleted.' })
  }
};

export default RolesCtrl;
