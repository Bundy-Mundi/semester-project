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

messageSchema.static('createMessage', async function (data) {
  try {
    return await new this(data).save();
  } catch (error) {
    console.log(error)
  }
});
messageSchema.static('findMessage', async function (id) {
  try {
    return await this.findById(id).populate('sender');
  } catch (error) {
    console.log(error)
  }
});

export default mongoose.model("Message", messageSchema);
  