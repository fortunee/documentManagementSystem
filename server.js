/**
 * app modules
 */
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv/config';
import morgan from 'morgan';
import dotenv from 'dotenv/config';
import routes from './app/routes/index';

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

/**
 * Configure default port
 */
const port = process.env.PORT || 8080;

// start the server
app.listen(port);

// eslint-disable-next-line
console.log(`Hey you can find me @ => http://localhost:${port}`);

// expose the server to supertest
export default app;
