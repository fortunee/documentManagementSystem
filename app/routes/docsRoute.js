/**
 * Import users controllers and authentication middlewares.
 */
import docsCtrl from '../../app/controllers/docsCtrl';
import Authentication from '../../app/middlewares/auth';

const docRoute = (router) => {
  /**
   *   Get all documents or create a new document
   */
  router.route('/documents')
    .get(Authentication.verifyToken, docsCtrl.allDocs)
    .post(Authentication.verifyToken, docsCtrl.createDoc);


  /**
   * Get, Update and delete a specific document
   */
  router.route('/documents/:id')
    .get(Authentication.verifyToken, docsCtrl.getDoc)
    .put(Authentication.verifyToken, docsCtrl.editDoc)
    .delete(Authentication.verifyToken, docsCtrl.deleteDoc);


  /**
   * Get all documents belonging to a specific user.
   */
  router.route('/users/:id/documents')
    .get(Authentication.verifyToken, docsCtrl.getUserDocuments);
};

export default docRoute;
