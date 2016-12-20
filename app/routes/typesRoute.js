/**
 * Import types controllers and authentication middlewares.
 */
import TypesCtrl from '../../app/controllers/typesCtrl';
import Authentication from '../../app/middlewares/auth';


const typesRoute = (router) => {
  router.route('/types')
    .get(Authentication.verifyToken, TypesCtrl.allTypes)
    .post(Authentication.verifyToken, TypesCtrl.createType);

  router.route('/types/:id')
    .get(Authentication.verifyToken, TypesCtrl.getType)
    .put(Authentication.verifyToken, TypesCtrl.editType)
    .delete(Authentication.verifyToken, TypesCtrl.deleteType);
};

export default typesRoute;
