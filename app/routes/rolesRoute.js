/**
 * Import roles controllers and authentication middlewares.
 */
import RolesCtrl from '../../app/controllers/rolesCtrl';
import Authentication from '../../app/middlewares/auth';


const rolesRoute = (router) => {
  router.route('/roles')
    .get(Authentication.verifyToken, Authentication.verifyAdmin, RolesCtrl.allRoles)
    .post(Authentication.verifyToken, Authentication.verifyAdmin, RolesCtrl.createRole);

  router.route('/roles/:id')
    .get(Authentication.verifyToken, Authentication.verifyAdmin, RolesCtrl.getRole)
    .put(Authentication.verifyToken, Authentication.verifyAdmin, RolesCtrl.editRole)
    .delete(Authentication.verifyToken, Authentication.verifyAdmin, RolesCtrl.deleteRole);
};

export default rolesRoute;
