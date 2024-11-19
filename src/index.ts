import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import bodyParser from "body-parser";
import routes from "./routes";
import errorHandler from "./middleware/errorHandler";
import swaggerDocs from "./utils/swagger";
import cors from "cors";
import cron from "node-cron";
import { createNewDailyPatientExercises } from "./crons/refreshExercisesCron";
import { setupRealtimeMessaging } from "./services/messaging.service";

const app = express();
const httpServer = createServer(app);

const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  credentials: true,
};

const io = new Server(httpServer, {
  cors: corsOptions,
  path: "/api/socket.io",
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(errorHandler);
app.use("/api", routes);

// CRON JOBS
cron.schedule("0 0 * * *", createNewDailyPatientExercises); // Schedule the refresh exercises cron job to run at midnight every day

// Real time messaging service
setupRealtimeMessaging();

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  swaggerDocs(app, PORT as number);
});

export { io }
