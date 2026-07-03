import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  },
  profilePicture:{
    type:String,
    default: ""
  },
  profilePictureFileId:{
    type: String,
    default: ""
  },
  bio:{
    type:String,
    default: ""
  },
  lastSeen:{
    type: Date,
  }
}, 
{
  timestamps: true
})

const userModel = mongoose.model("user", userSchema);
export default userModel;