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
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Void} no returns
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


};

module.exports = typesCtrl;
