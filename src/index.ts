import express from 'express';
import { Server } from 'socket.io';
import { createServer } from "http";
import bodyParser from 'body-parser';
import routes from './routes';
import errorHandler from './middleware/errorHandler';
import swaggerDocs from './utils/swagger';
import cors from 'cors';
import cron from 'node-cron';
import { createNewDailyPatientExercises } from './crons/refreshExercisesCron';

const app = express();
const httpServer = createServer(app);

const corsOptions = {
   origin: "http://localhost:5173", 
   methods: ["GET", "POST"],
   credentials: true
};


const io = new Server(httpServer, {
  cors: corsOptions,
  path: '/api/socket.io' 
});

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(errorHandler);
app.use('/api', routes);

// CRON JOBS
cron.schedule('0 0 * * *', createNewDailyPatientExercises); // Schedule the refresh exercises cron job to run at midnight every day

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('A user connected');

  // Join a room (in this case, the user's ID)
  socket.on('join', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their room`);
  });

  // Handle new messages
  socket.on('sendMessage', async (data) => {
    console.log('Received message:', data);
    const { fromUserId, toUserId, message } = data;
    
    const newMessage = {
      fromUserId,
      toUserId,
      message,
    };
    // Emit to both sender and recipient
 io.to(fromUserId).emit('newMessage', newMessage);
 io.to(toUserId).emit('newMessage', newMessage);
 
    console.log('Emitted message to:', fromUserId, 'and', toUserId);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  swaggerDocs(app, PORT as number);
});
