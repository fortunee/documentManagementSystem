/**
 * Import roles controllers and authentication middlewares.
 */
import rolesCtrl from '../../app/controllers/rolesCtrl';
import Authentication from '../../app/middlewares/auth';


const rolesRoute = (router) => {
  router.route('/roles')
    .get(Authentication.verifyToken, Authentication.verifyAdmin, rolesCtrl.allRoles)
    .post(Authentication.verifyToken, Authentication.verifyAdmin, rolesCtrl.createRole);

  router.route('/roles/:id')
    .get(Authentication.verifyToken, Authentication.verifyAdmin, rolesCtrl.getRole)
    .put(Authentication.verifyToken, Authentication.verifyAdmin, rolesCtrl.editRole)
    .delete(Authentication.verifyToken, Authentication.verifyAdmin, rolesCtrl.deleteRole);
};

export default rolesRoute;
