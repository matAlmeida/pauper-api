import Express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'express-cors';
import bodyParser from 'body-parser';

import routes from '~/routes';
import { catchAll, notFound } from './middlewares/error';

const app = Express();

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(routes);

app.use(notFound);
app.use(catchAll);

export default app;
