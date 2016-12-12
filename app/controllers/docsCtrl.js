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
   * Gets all documents belonging to a specific user
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @returns {Void} Returns
   */
  getUserDocuments(req, res) {
    db.Document.findAll({ where: { OwnerId: req.params.id } })
      .then((documents) => {
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

  /**
   * Get a specific document
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @returns {Object} Response object
   */
  getDoc(req, res) {
    db.Document.findById(req.params.id)
      .then((document) => {
        if (!document) {
          return res.status(404)
            .send({ message: `Document with the id: ${req.params.id} does not exit` });
        }

        res.send(document);
      });
  },

  /**
   * Edit and update a specific document
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @returns {Object} Response object
   */
  editDoc(req, res) {
    db.Document.findById(req.params.id)
      .then((document) => {
        if (!document) {
          return res.status(404)
            .send({ message: 'Cannot edit a document that does not exist' });
        }

        document.update(req.body)
          .then((updatedDocument) => {
            res.send(updatedDocument);
          });
      });
  },
};
