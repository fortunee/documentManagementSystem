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

};

module.exports = typesCtrl;
