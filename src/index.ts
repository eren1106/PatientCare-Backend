import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import errorHandler from './middleware/errorHandler';
import swaggerDocs from './utils/swagger';
import cors from 'cors';
import cron from 'node-cron';
import { createNewDailyPatientExercises } from './crons/refreshExercisesCron';

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(errorHandler);
app.use('/api', routes);

// CRON JOBS
cron.schedule('0 0 * * *', createNewDailyPatientExercises); // Schedule the refresh exercises cron job to run at midnight every day

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  swaggerDocs(app, PORT as number);
});
