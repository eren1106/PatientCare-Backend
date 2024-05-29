import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import errorHandler from './middleware/errorHandler';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/api', routes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
