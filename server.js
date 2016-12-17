import app from './app/config/app';

/**
 * Configure default port
 */
const port = process.env.PORT || 5050;

// start the server
app.listen(port);

// eslint-disable-next-line
console.log(`Hey you can find me @ => http://localhost:${port}`);
