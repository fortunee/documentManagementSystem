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

  /**
   * Create a new document
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @returns {Void} Returns Void
   */
  createDoc(req, res) {
    db.Document.create(req.body)
      .then((document) => {
        res.status(201).send(document);
      })
      .catch((err) => {
        res.status(400).send(err.errors);
      });
  },
};
