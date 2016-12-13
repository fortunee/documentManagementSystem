import userRoute from './usersRoute';
import docRoute from './docsRoute';

// Configure routes
const routes = (router) => {
  userRoute(router);
  docRoute(router);
};

export default routes;
