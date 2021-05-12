import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  message_logs:[{type:mongoose.Types.ObjectId}]
});

userSchema.static('createUser', async function ({username}) {
  let errorObj = {
    ok: true,
    message: null
  }
  try {
    const exists = await this.findOne({ username });
    if(exists)
      throw new Error("Username already exists");
    const newUser = await new this({ username }).save();
    return { error: errorObj, user:newUser };
  } catch (error) {
    errorObj.ok = false;
    errorObj.message = error.message;
    return { error: errorObj, user:null };
  }
});
userSchema.static('login', async function ({username}) {
  let errorObj = {
    ok: true,
    message: null
  }
  try {
    const user = await this.findOne({ username });
    if(!user)
      throw new Error("Username does not exists");
    return { error: errorObj, user };
  } catch (error) {
    errorObj.ok = false;
    errorObj.message = error.message;
    return { error: errorObj, user:null };
  }
});
userSchema.static('userMatch', async function ({id, username}) {
  let errorObj = {
    ok: true,
    message: null
  }
  try {
    if(!mongoose.Types.ObjectId.isValid(id))
      throw new Error("Invalid ID provided");
    const {id: firstID} = await this.findById(id);
    const {id: secondID} = await this.findOne({ username });
    if(firstID !== secondID)
      throw new Error("Username and ID does not match");
  } catch (error) {
    errorObj.ok = false;
    errorObj.message = error.message;
  }
  return errorObj;
});

export default mongoose.model("User", userSchema);