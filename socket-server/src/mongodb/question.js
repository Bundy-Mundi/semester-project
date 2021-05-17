import mongoose from 'mongoose';
const { Schema } = mongoose;

const questionSchema = new Schema({
    address: { type:String, required:true }
});

export default mongoose.model("Question", questionSchema);