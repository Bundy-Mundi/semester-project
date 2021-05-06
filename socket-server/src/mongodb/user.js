import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  message_logs:[{type:mongoose.Types.ObjectId}]
});

export default mongoose.model("User", userSchema);