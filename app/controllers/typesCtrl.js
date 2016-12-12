const db = require('../models');

const typesCtrl = {
  /**
   * Grab all types (ie. document types)
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @returns {Void} Returns Void
   */
  allTypes(req, res) {
    db.Type.findAll().then((types) => {
      res.send(types);
    });
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
            .send({ message: 'Cannot edit a role that does not exist' });
        }

        type.update(req.body)
          .then((updatedType) => {
            res.send(updatedType);
          });
      });
  },

};

module.exports = typesCtrl;
