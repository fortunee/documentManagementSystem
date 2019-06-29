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
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @returns {Void} Returns Void
   */
  createType(req, res) {
    db.Type.create(req.body)
      .then((type) => {
        res.status(201).send(type);
      })
      .catch((err) => {
        res.status(400).send(err.errors);
      });
  },

  /**
   * Get a specific type
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @returns {Object} Response object
   */
  getType(req, res) {
    db.Type.findById(req.params.id)
      .then((type) => {
        if (!type) {
          return res.status(404)
            .send({ message: `Type with the id: ${req.params.id} does not exist` });
        }

        res.send(type);
      });
  },

  /**
   * Edit and update a specific type
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @returns {Response} Response object
   */
  editType(req, res) {
    db.Type.findById(req.params.id)
      .then((type) => {
        if (!type) {
          return res.status(404)
            .send({ message: 'Cannot edit a type that does not exist' });
        }

        type.update(req.body)
          .then((updatedType) => {
            res.send(updatedType);
          });
      });
  },

  /**
   * Delete a specific type
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @returns {Object} Response object
   */
  deleteType(req, res) {
    db.Type.findById(req.params.id)
      .then((type) => {
        if (!type) {
          return res.status(404)
            .send({ message: 'Cannot delete a type that does not exist' });
        }

        type.destroy()
          .then(() => res.send({ message: 'Type deleted.' }));
      });
  }
};

export default TypesCtrl;
