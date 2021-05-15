import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  address: { type: String, required: true },
  message_logs:[{type:mongoose.Types.ObjectId, ref:'Message'}]
});

userSchema.static('createUser', async function ({username, address}) {
  let errorObj = {
    ok: true,
    message: null
  }
  try {
    username = username.trim().replace(' ', ''); // remove whitespace for username
    const addressExists = await this.findOne({ address });
    const userExists = await this.findOne({ username });
    if(addressExists)
      throw new Error("The public IP address is already taken over by someone else 😥");
    if(userExists)
      throw new Error("Username already exists");
    const newUser = await new this({ username, address }).save();
    return { error: errorObj, user:newUser };
  } catch (error) {
    errorObj.ok = false;
    errorObj.message = error.message;
    return { error: errorObj, user:null };
  }
});
userSchema.static('login', async function ({username, address}) {
  let errorObj = {
    ok: true,
    message: null
  }
  try {
    const user = await this.findOne({ username });
    if(!user)
      throw new Error("Username does not exists");
    if(address !== user.address)
      throw new Error("You use the same IP address that you used when you first logged in.")
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
    const {id: firstID, address: firstIP} = await this.findById(id);
    const {id: secondID, address: secondIP} = await this.findOne({ username });
    if(firstID !== secondID)
      throw new Error("Username and ID does not match");
    if(firstIP !== secondIP)
      throw new Error("IP Address does not match");
  } catch (error) {
    errorObj.ok = false;
    errorObj.message = error.message;
  }
  return errorObj;
});

export default mongoose.model("User", userSchema);