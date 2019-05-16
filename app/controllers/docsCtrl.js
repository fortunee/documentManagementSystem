import db from '../models';
import helpers from './helpers';

const DocsCtrl = {

  /**
   * Gets all documents depending on who is requesting
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @returns {Void} Returns Void
   */
   async allDocs (req, res) {
    const role = await db.Role.findById(req.decoded.RoleId);
    
    if (role.title === 'admin') {
       helpers.isAdmin(req, res);
     } else {
       helpers.isNotAdmin(req, res);
     }
  },

  /**
   * Gets all documents belonging to a specific user
   * @param {object} req object
   * @param {object} res object
   * @returns {object} returns user's document or error object
   */
  async getUserDocuments(req, res) {
    const documents = await db.Document
      .findAll({ where: { OwnerId: req.params.id } })
      .catch(e => res.status(400).send(e));
    
    res.status(200).send(document)
  },

  /**
   * Create a new document
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @returns {Void} Returns Void
   */
  createDoc(req, res) {
    req.body.OwnerId = req.decoded.UserId;
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
   * @returns {Void} Returns Void
   */
  getDoc(req, res) {
    db.Document.findById(req.params.id)
     .then((document) => {
       if (!document) {
         return res.status(404)
           .send({
             message: `Document with the id: ${req.params.id} does not exit`
           });
       }

       db.Role.findById(req.decoded.RoleId)
         .then((role) => {
           if (role.title === 'admin') {
             res.send(document);
           } else {
             if (document.access === 'private'
                 && document.OwnerId !== req.decoded.UserId) {
               return res.status(403)
                 .send({ message: 'This is a private document' });
             }
             res.send(document);
           }
         });
     });
  },

  /**
   * Edit and update a specific document
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @returns {Void} Returns Void
   */
  editDoc(req, res) {
    db.Document.findById(req.params.id)
      .then((document) => {
        if (!document) {
          return res.status(404)
            .send({ message: 'Cannot edit a document that does not exist' });
        }

        if (document.OwnerId !== req.decoded.UserId) {
          return res.status(403)
            .send({ message: 'You are not the owner of this document' });
        }

        document.update(req.body)
          .then((updatedDocument) => {
            res.send(updatedDocument);
          });
      });
  },

  /**
   * Delete a specific document
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @returns {Void} Returns Void
   */
  deleteDoc(req, res) {
    db.Document.findById(req.params.id)
      .then((document) => {
        if (!document) {
          return res.status(404)
            .send({ message: 'Cannot delete a document that does not exist' });
        }

        if (document.OwnerId !== req.decoded.UserId) {
          return res.status(403)
            .send({ message: 'This document does not belong to you' });
        }

        document.destroy()
          .then(() => res.send({ message: 'Document deleted.' }));
      });
  }
};

export default DocsCtrl;
