// lib/actions/message.actions.ts
"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import connectToDB from "../db/connect";
import { Message, Conversation } from "@/lib/db/models/message";
import { User } from "@/lib/db/models/user";
import mongoose from "mongoose";

export async function getUserConversations() {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    await connectToDB();

    // Find the MongoDB user ID from Clerk ID
    const user = await User.findOne({ clerkId: userId });
    if (!user) throw new Error("User not found");

    // Find all conversations where the user is a participant
    const conversations = await Conversation.find({
      participants: user._id,
    })
      .populate({
        path: "lastMessage",
        select: "content createdAt read",
      })
      .populate({
        path: "participants",
        select: "name username profileImage online",
        match: { _id: { $ne: user._id } }, // Only populate the other participant
      })
      .sort({ updatedAt: -1 });

    // Count unread messages for each conversation
    const conversationsWithUnreadCount = await Promise.all(
      conversations.map(async (conversation) => {
        const unreadCount = await Message.countDocuments({
          sender: { $ne: user._id },
          recipient: user._id,
          read: false,
          _id: { $ne: conversation.lastMessage?._id }, // Exclude last message as we already have it
        });

        return {
          ...conversation.toObject(),
          unreadCount,
        };
      })
    );

    return { conversations: conversationsWithUnreadCount };
  } catch (error) {
    console.error("Error fetching conversations:", error);
    throw error;
  }
}

export async function getConversationMessages(conversationId: string) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    await connectToDB();

    // Find the MongoDB user ID from Clerk ID
    const user = await User.findOne({ clerkId: userId });
    if (!user) throw new Error("User not found");

    // Find the conversation and check if user is a participant
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) throw new Error("Conversation not found");

    // Make sure user is part of this conversation
    const isParticipant = conversation.participants.some(
      (participant: mongoose.Types.ObjectId) => participant.equals(user._id)
    );
    if (!isParticipant) throw new Error("Unauthorized access to conversation");

    // Get other participant
    const otherParticipantId = conversation.participants.find(
      (participant: mongoose.Types.ObjectId) => !participant.equals(user._id)
    );

    // Find all messages in this conversation
    const messages = await Message.find({
      $or: [
        { sender: user._id, recipient: otherParticipantId },
        { sender: otherParticipantId, recipient: user._id },
      ],
    })
      .populate("sender", "name username profileImage")
      .sort({ createdAt: 1 });

    // Mark unread messages as read
    await Message.updateMany(
      {
        recipient: user._id,
        read: false,
      },
      { read: true }
    );

    // Get other participant details
    const otherParticipant = await User.findById(otherParticipantId).select(
      "name username profileImage online"
    );

    return { messages, otherParticipant };
  } catch (error) {
    console.error("Error fetching conversation messages:", error);
    throw error;
  }
}

export async function sendMessage(
  conversationId: string | null,
  recipientId: string,
  content: string
) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    if (!content.trim()) throw new Error("Message cannot be empty");

    await connectToDB();

    // Find the MongoDB user ID from Clerk ID
    const sender = await User.findOne({ clerkId: userId });
    if (!sender) throw new Error("User not found");

    const recipient = await User.findById(recipientId);
    if (!recipient) throw new Error("Recipient not found");

    // Create the new message
    const newMessage = await Message.create({
      sender: sender._id,
      recipient: recipient._id,
      content,
    });

    let conversation;

    if (conversationId) {
      // Update existing conversation
      conversation = await Conversation.findByIdAndUpdate(
        conversationId,
        {
          lastMessage: newMessage._id,
          updatedAt: new Date(),
        },
        { new: true }
      );
    } else {
      // Find if conversation already exists
      conversation = await Conversation.findOne({
        participants: { $all: [sender._id, recipient._id] },
      });

      if (!conversation) {
        // Create new conversation
        conversation = await Conversation.create({
          participants: [sender._id, recipient._id],
          lastMessage: newMessage._id,
        });
      } else {
        // Update existing conversation
        conversation.lastMessage = newMessage._id;
        conversation.updatedAt = new Date();
        await conversation.save();
      }
    }

    revalidatePath("/messages");
    revalidatePath(`/messages/${conversation._id}`);

    return { success: true, conversationId: conversation._id };
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
}
