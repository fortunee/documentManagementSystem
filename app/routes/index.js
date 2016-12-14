import userRoute from './usersRoute';
import docRoute from './docsRoute';
import roleRoute from './rolesRoute';

// Configure routes
const routes = (router) => {
  userRoute(router);
  docRoute(router);
  roleRoute(router);
};

export default routes;
