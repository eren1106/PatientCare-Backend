// chatController.ts
import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { apiResponse } from "../utils/api-response.util";

interface ChatMessage {
  id: string;
  message: string;
  created_datetime: Date;
  name: string;
}

interface ChatUser {
  id: string;
  name: string;
  profileImageUrl: string;
  messages: ChatMessage[];
}



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
        }
      }
    });

    const formattedMessages = messages.map(message => ({
      id: message.id,
      message: message.message,
      createdDatetime: message.createdDatetime,
      fromUserId: message.fromUserId,
      fromUserName: message.userFrom.fullname
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
        }
      }
    });

    const formattedMessage = {
      id: newMessage.id,
      message: newMessage.message,
      createdDatetime: newMessage.createdDatetime,
      fromUserId: newMessage.fromUserId,
      fromUserName: newMessage.userFrom.fullname
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
