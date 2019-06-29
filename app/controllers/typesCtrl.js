import db from '../models';

const TypesCtrl = {
  /**
   * Grab all types (ie. document types)
   * @param {object} req
   * @param {object} res
   * @returns {object} types
   */
  async allTypes(req, res) {
    const types = await db.Type.findAll();
    return res.send(types);
  },

  /**
   * Create a new type
   * @param {object} req
   * @param {object} res
   * @returns {object} type
   */
  async createType(req, res) {
    const type = await db.Type.create(req.body)
      .catch(err => res.status(400).send(err.errors));
    
    return res.status(201).send(type);
  },

  /**
   * Get a specific type
   * @param {object} req
   * @param {object} res
   * @returns {object} response object
   */
  async getType(req, res) {
    const type = await db.Type.findById(req.params.id);
    if (!type) {
      return res.status(404)
        .send({ message: `Type with the id: ${req.params.id} does not exist` });
    }
    return res.status(200).send(type);
  },

  /**
   * Edit and update a specific type
   * @param {object} req
   * @param {object} res
   * @returns {object} response object
   */
  async editType(req, res) {
    const type = await db.Type.findById(req.params.id);
    
    if (!type) {
      return res.status(404)
        .send({ message: 'Cannot edit a type that does not exist' });
    }
    
    const updatedType = await type.update(req.body);
    return res.status(200).send(updatedType);
  },

  /**
   * Delete a specific type
   * @param {object} req
   * @param {object} res
   * @returns {object} response object
   */
  async deleteType(req, res) {
    const type = await db.Type.findById(req.params.id);
    if (!type) {
      return res.status(404)
        .send({ message: 'Cannot delete a type that does not exist' });
    }
    await type.destroy();
    return res.status(200).send({ message: 'Type deleted.' });
  }
};

export default TypesCtrl;
