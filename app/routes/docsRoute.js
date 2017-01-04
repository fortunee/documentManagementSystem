/**
 * Import documents controllers and authentication middlewares.
 */
import DocsCtrl from '../../app/controllers/docsCtrl';
import Authentication from '../../app/middlewares/auth';

const docsRoute = (router) => {
  /**
   *   Get all documents or create a new document
   */
  router.route('/documents')
    .get(Authentication.verifyToken, DocsCtrl.allDocs)
    .post(Authentication.verifyToken, DocsCtrl.createDoc);

  /**
   * Get, Update and delete a specific document
   */
  router.route('/documents/:id')
    .get(Authentication.verifyToken, DocsCtrl.getDoc)
    .put(Authentication.verifyToken, DocsCtrl.editDoc)
    .delete(Authentication.verifyToken, DocsCtrl.deleteDoc);

  /**
   * Get all documents belonging to a specific user.
   */
  router.route('/users/:id/documents')
    .get(Authentication.verifyToken, DocsCtrl.getUserDocuments);
};

export default docsRoute;
