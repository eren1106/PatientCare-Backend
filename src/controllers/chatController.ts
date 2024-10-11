// chatController.ts
import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { apiResponse } from "../utils/api-response.util";


export const findUsersForNewConversation = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    // Find all users that the current user has already chatted with
    const existingChats = await prisma.message.findMany({
      where: {
        OR: [
          { fromUserId: userId },
          { toUserId: userId }
        ]
      },
      select: {
        fromUserId: true,
        toUserId: true
      }
    });

    // Create a set of user IDs to exclude (including the current user)
    const excludeUserIds = new Set([userId, ...existingChats.flatMap(chat => [chat.fromUserId, chat.toUserId])]);

    // Find all users not in the exclude set
    const availableUsers = await prisma.user.findMany({
      where: {
        id: {
          notIn: Array.from(excludeUserIds)
        },
        isDelete: false
      },
      select: {
        id: true,
        fullname: true,
        profileImageUrl: true,
        role: true
      }
    });

    return apiResponse({
      res,
      result: availableUsers
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch available users for new conversation' });
  }
};

// ... existing imports and functions ...

export const createCallHistory = async (req: Request, res: Response) => {
  const { fromUserId, toUserId, status, duration } = req.body;

  try {
    const newCall = await prisma.call.create({
      data: {
        fromUserId,
        toUserId,
        status,
        duration: duration || 0,
      }
    });

    const formattedCall = {
      id: newCall.id,
      type: 'Outgoing',
      status: newCall.status,
      createdDatetime: newCall.createdDatetime,
      duration: newCall.duration
    };

    return apiResponse({
      res,
      result: formattedCall,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create call history record' });
  }
};''
export const getCallHistory = async (req: Request, res: Response) => {
  const { fromUserId, toUserId } = req.params;

  try {
    const calls = await prisma.call.findMany({
      where: {
        OR: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId }
        ]
      },
      orderBy: {
        createdDatetime: 'desc'
      }
    });

    const formattedCalls = calls.map(call => ({
      id: call.id,
      type: call.fromUserId === fromUserId ? 'Outgoing' : 'Incoming',
      status: call.status,
      createdDatetime: call.createdDatetime,
      duration: call.duration
    }));

    return apiResponse({
      res,
      result: formattedCalls
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch call history' });
  }
};


export const getAllChatsForUser = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const chats = await prisma.message.findMany({
      where: {
        OR: [
          { fromUserId: userId },
          { toUserId: userId }
        ]
      },
      orderBy: {
        createdDatetime: 'desc'
      },
      include: {
        userFrom: {
          select: {
            id: true,
            fullname: true,
            profileImageUrl: true
          }
        },
        userTo: {
          select: {
            id: true,
            fullname: true,
            profileImageUrl: true
          }
        }
      },
    });

    const chatMap = new Map();

    chats.forEach(chat => {
      const otherUser = chat.fromUserId === userId ? chat.userTo : chat.userFrom;
      const otherUserId = otherUser.id;

      if (!chatMap.has(otherUserId) || chat.createdDatetime > chatMap.get(otherUserId).lastMessageTime) {
        chatMap.set(otherUserId, {
          id: otherUser.id,
          name: otherUser.fullname,
          profileImageUrl: otherUser.profileImageUrl,
          lastMessage: chat.message,
          lastMessageTime: chat.createdDatetime
        });
      }
    });

    const formattedChats = Array.from(chatMap.values());

    return apiResponse({
      res,
      result: formattedChats
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
};


export const getChatMessages = async (req: Request, res: Response) => {
  const { fromUserId, toUserId } = req.params;

  try {
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId }
        ]
      },
      orderBy: {
        createdDatetime: 'asc'
      },
      include: {
        userFrom: {
          select: {
            id: true,
            fullname: true
          }
        },
        userTo: {
          select: {
            id: true,
            fullname: true
          }
        }
      }
    });

    const formattedMessages = messages.map(message => ({
      id: message.id,
      message: message.message,
      createdDatetime: message.createdDatetime,
      fromUserId: message.fromUserId,
      fromUserName: message.userFrom.fullname,
      toUserId: message.toUserId,
      toUserName: message.userTo.fullname
    }));

    return apiResponse({
      res,
      result: formattedMessages
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch chat messages' });
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  const { fromUserId, toUserId, message } = req.body;

  try {
    const newMessage = await prisma.message.create({
      data: {
        fromUserId,
        toUserId,
        message
      },
      include: {
        userFrom: {
          select: {
            id: true,
            fullname: true
          }
        },
        userTo: {
          select: {
            id: true,
            fullname: true
          }
        }
      }
    });

    const formattedMessage = {
      id: newMessage.id,
      message: newMessage.message,
      createdDatetime: newMessage.createdDatetime,
      fromUserId: newMessage.fromUserId,
      fromUserName: newMessage.userFrom.fullname,
    };

    return apiResponse({
      res,
      result: formattedMessage
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send message' });
  }
};

// Add this new function to the existing fil

export const deleteMessage = async (req: Request, res: Response) => {
  const { messageId } = req.params;

  try {
    const deletedMessage = await prisma.message.delete({
      where: {
        id: messageId
      }
    });

    if (!deletedMessage) {
      return res.status(404).json({ error: 'Message not found' });
    }

    return apiResponse({
      res,
      result: { message: 'Message deleted successfully' },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete message' });
  }
};
