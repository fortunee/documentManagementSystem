/**
 * app modules
 */
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import routes from '../routes/index';

/**
 * Instantiate express and grab the router
 */
const app = express();
const router = express.Router();

/**
 * Use morgan to log request details to the
 * console.
 */
app.use(morgan('combined'));

/**
 * configure app to use the bodyParser,
 * in order to enhance our POST request
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * Use express router on our routes
 */
routes(router);

// Register routes
app.use('/api', router);

// expose the server to supertest
export default app;
