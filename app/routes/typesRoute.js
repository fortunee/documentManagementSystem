/**
 * Import types controllers and authentication middlewares.
 */
import typesCtrl from '../../app/controllers/typesCtrl';
import Authentication from '../../app/middlewares/auth';


const typesRoute = (router) => {
  router.route('/types')
    .get(Authentication.verifyToken, typesCtrl.allTypes)
    .post(Authentication.verifyToken, typesCtrl.createType);

  router.route('/types/:id')
    .get(Authentication.verifyToken, typesCtrl.getType)
    .put(Authentication.verifyToken, typesCtrl.editType)
    .delete(Authentication.verifyToken, typesCtrl.deleteType);
};

export default typesRoute;
