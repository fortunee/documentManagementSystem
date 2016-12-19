import userRoute from './usersRoute';
import docRoute from './docsRoute';
import roleRoute from './rolesRoute';
import typeRoute from './typesRoute';

// Configure routes
const routes = (router) => {
  userRoute(router);
  docRoute(router);
  roleRoute(router);
  typeRoute(router);
};

export default routes;
