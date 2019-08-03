import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import routes from '../routes/index';

const app = express();
const router = express.Router();

app.use(morgan('combined'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(router);

app.use('/api', router);

export default app;
