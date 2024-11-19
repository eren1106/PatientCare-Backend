import { io } from "..";
export function setupRealtimeMessaging() {

  // Socket.IO connection handling
  io.on("connection", (socket) => {
    //console.log('User connected:', socket.id)
  
    socket.on("join", (userId: string) => {
      socket.join(userId);
      //console.log(`User ${userId} joined their room`);
    });
  
    socket.on('sendMessage', ({ fromUserId, toUserId, message, createdDatetime }) => {
      const newMessage = { fromUserId, toUserId, message, createdDatetime };
      io.to(fromUserId).emit('newMessage', newMessage);
      io.to(toUserId).emit('newMessage', newMessage);
      //console.log(`Message sent from ${fromUserId} to ${toUserId}`);
    });
  
    socket.on('deleteMessage', ({ messageId, fromUserId, toUserId }) => {
      io.to(fromUserId).emit('messageDeleted', messageId);
      io.to(toUserId).emit('messageDeleted', messageId);
      //console.log(`Message ${messageId} deleted`);
    });
  
    socket.on("disconnect", () => {
      //console.log("User disconnected");
    });
  });
  
}