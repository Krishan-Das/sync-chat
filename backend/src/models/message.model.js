import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
  conversationId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "conversation",
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  message: {
    type: String,
    required: [true, 'message is required'],
    trim: true
  },
  isRead: {
    type: Boolean,
    default: false,
  },
},
  {
    timestamps: true
  })

const messageModel = mongoose.model("message", messageSchema);
export default messageModel;