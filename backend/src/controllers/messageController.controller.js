import messageModel from "../models/message.model.js";
import conversationModel from "../models/conversation.model.js";
import { io } from "../sockets/socket.js";
import { getReceiverSocketId } from "../sockets/socket.js";


// --- send message ---
export async function send(req, res) {
  const userId = req.userId;
  const receiverId = req.params.receiverId;
  console.log(receiverId);

  const msg = req.body.message;
  if (!msg?.trim()) {
    return res.status(400).json({
      message: "Message is required",
      success: false
    })
  }

  try {

    let conversation = await conversationModel.findOne({
      participants: { $all: [userId, receiverId] }
    })

    if (!conversation) {
      conversation = await conversationModel.create({
        participants: [userId, receiverId]
      })
    }

    const message = await messageModel.create({
      conversationId: conversation._id,
      message: msg,
      receiver: receiverId,
      sender: userId
    })

    if (!message) {
      return res.status().json({
        message: "Message send failed!"
      })
    }

    conversation.lastMessage = message._id;
    await conversation.save()

    // Socket 
    const receiverSocketId = getReceiverSocketId(receiverId);
    if(receiverSocketId){
      io.to(receiverSocketId).emit('newMessage', message);
    }

    return res.status(201).json({
      message: "Message sent successfully",
      success: true,
      msg: message
    })

  } catch (error) {
    console.error("error:", error);
    return res.status(500).json({
      message: "Internal server problem"
    })
  }

}

// --- read massage ---
export async function read(req, res) {
  const otherUserId = req.params.otherUserId;
  const userId = req.userId;

  if (otherUserId === userId) {
    return res.status(400).json({
      success: false,
      message: "You cannot fetch conversation with yourself."
    });
  }

  try {

    const conversation = await conversationModel.findOne({
      participants: {
        $all: [otherUserId, userId]
      }
    })
    if (!conversation) {
      return res.status(200).json({
        message: "No messages yet.",
        success: true,
        messages: []
      })
    }

    const messages = await messageModel.find({ conversationId: conversation._id }).sort({ createdAt: 1 });
    return res.status(200).json({
      message: "Messages fetched successfully",
      success: true,
      messages
    })

  } catch (error) {
    console.log("Server error:", error);
    return res.status(500).json({
      message: "Internal server problem",
      success: false
    })
  }
}