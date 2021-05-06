import mongoose, { isValidObjectId } from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  message_logs:[Message]
});
const messageSchema = new Schema({
  type: String,
  message: String,
  sender: mongoose.Types.ObjectId,
  date: { type: Date, default: Date.now }
});
const dataSchema = new Schema({
  messages: [Message]
});

const user = mongoose.model('User', userSchema);
const message = mongoose.model("Message", messageSchema);
const data = mongoose.model("Data", dataSchema);

export default {user, message, data};