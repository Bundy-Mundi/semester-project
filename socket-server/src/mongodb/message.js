import mongoose from 'mongoose';
const { Schema } = mongoose;

const messageSchema = new Schema({
    type: String,
    error: String,
    message: String,
    sender: { 
      type: mongoose.Types.ObjectId,
      ref: 'User'
     },
    date: { type: Date, default: Date.now }
  });

messageSchema.static('createMessage', async function (msg) {

});
export default mongoose.model("Message", messageSchema);
  