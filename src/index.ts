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

const app = express();
const httpServer = createServer(app);

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true,
};

const io = new Server(httpServer, {
  cors: corsOptions,
  path: "/api/socket.io",
});

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(errorHandler);
app.use("/api", routes);

// CRON JOBS
cron.schedule("0 0 * * *", createNewDailyPatientExercises); // Schedule the refresh exercises cron job to run at midnight every day

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log('User connected:', socket.id)

  socket.on("join", (userId : string) => {
    socket.join(userId);
    console.log(`User ${userId} joined their room`);
  });

  socket.on('sendMessage', ({ fromUserId, toUserId, message }) => {
    const newMessage = { fromUserId, toUserId, message };
    io.to(fromUserId).emit('newMessage', newMessage);
    io.to(toUserId).emit('newMessage', newMessage);
    console.log(`Message sent from ${fromUserId} to ${toUserId}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  swaggerDocs(app, PORT as number);
});
