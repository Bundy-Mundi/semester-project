import mongoose from 'mongoose';
const { Schema } = mongoose;

const messageSchema = new Schema({
    type: String,
    message: String,
    sender: { type: mongoose.Types.ObjectId },
    date: { type: Date, default: Date.now }
  });
export default mongoose.model("Message", messageSchema);
  