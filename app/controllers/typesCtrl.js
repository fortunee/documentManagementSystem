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


};

module.exports = typesCtrl;
