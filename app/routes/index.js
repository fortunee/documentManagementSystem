import userRoute from './userRoute';
import docRoute from './docRoute';

// Configure routes
const routes = (router) => {
  userRoute(router);
  docRoute(router);
};

export default routes;
