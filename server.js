/**
 * app modules
 */
import express from 'express';
import bodyParser from 'body-parser';

/**
 * Instantiate express and grab the router
 */
const app = express();
const router = express.Router();

/**
 * configure app to use the bodyParser, 
 * in order to enhance our POST request
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * Configure default port
 */
const port = process.env.PORT || 8080;


// Use our router
router.get('/', (req, res) => {
  res.json({ message: 'Welcome buddy, you got me!' });
});

// Register routes
app.use('/api', router);

// start the server
app.listen(port);

// eslint-disable-next-line
console.log(`Hey you can find me @ => http://localhost:${port}`);

// expose the server to supertest
export default app;
