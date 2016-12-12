import db from '../models';


const docsCtrl = {
  /**
   * Gets all documents
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @returns {Void} Returns Void
   */
  allDocs(req, res) {
    const query = {
      limit: req.query.limit || null,
      offset: req.query.offset || null
    };

    db.Document.findAll(query).then((documents) => {
      res.send(documents);
    });
  },
};
