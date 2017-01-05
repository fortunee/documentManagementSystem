import usersRoute from './usersRoute';
import docsRoute from './docsRoute';
import rolesRoute from './rolesRoute';
import typesRoute from './typesRoute';

// Configure routes
const routes = (router) => {
  usersRoute(router);
  docsRoute(router);
  rolesRoute(router);
  typesRoute(router);
};

export default routes;
