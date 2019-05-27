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
    const role = await db.Role.findById(req.decoded.RoleId)
      .catch(e => res.status(400).send(e));
    
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
    
    res.status(200).send(documents)
  },

  /**
   * Create a new document
   * @param {object} req Request object
   * @param {object} res Response object
   * @returns {object} document | error object
   */
  async createDoc(req, res) {
    req.body.OwnerId = req.decoded.UserId;
    
    const document = await db.Document.create(req.body)
      .catch(err => res.status(400).send(err.errors));
    
    res.status(201).send(document);
  },

  /**
   * Get a specific document
   * @param {object} req Request object
   * @param {object} res Response object
   * @returns {object} document | error
   */
  async getDoc(req, res) {
    const document = await db.Document.findById(req.params.id)
      .catch(e => res.status(400).send(e));
    
    if (!document) {
       return res.status(404)
         .send({
           message: `Document with the id: ${req.params.id} does not exit`
         });
     }
    
    const userRole = await db.Role.findById(req.decoded.RoleId)
      .catch(e => res.status(400).send(e));
    
    if (userRole.title === 'admin') {
       return res.status(200).send(document);
     } else {
       if (document.access === 'private' && document.OwnerId !== req.decoded.UserId) {
         return res.status(403)
           .send({ message: 'This is a private document' });
       }
       res.status(200).send(document);
     }
  },

  /**
   * Edit and update a specific document
   * @param {object} req
   * @param {object} res
   * @returns {object} updated document
   */
  async editDoc(req, res) {
     const document = await db.Document.findById(req.params.id)
       .catch(e => res.status(400).send(e));
     if (!document) {
       return res.status(404)
         .send({ message: 'Cannot edit a document that does not exist' });
     }

     if (document.OwnerId !== req.decoded.UserId) {
       return res.status(403)
         .send({ message: 'You are not the owner of this document' });
     }

     const updatedDoc = await document.update(req.body);
    
     return res.status(200).send(updatedDoc);
  },

  /**
   * Delete a specific document
   * @param {object} req
   * @param {object} res
   * @returns {void} Returns void
   */
  async deleteDoc(req, res) {
    const document = await db.Document.findById(req.params.id);
    
    if (!document) {
      return res.status(404)
        .send({ message: 'Cannot delete a document that does not exist' });
    }
    
    if (document.OwnerId !== req.decoded.UserId) {
      return res.status(403)
        .send({ message: 'This document does not belong to you' });
    }
    
    await document.destroy().catch(e => res.status(500).send(e));
    
    return res.send({ message: 'Document deleted.' }));
};

export default DocsCtrl;
