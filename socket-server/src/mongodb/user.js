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
    username = this.cleanString(username); // remove whitespace for username
    if(username && address){
      const addressExists = await this.findOne({ address });
      const userExists = await this.findOne({ username });
      if(addressExists)
        throw new Error(`The public IP address ${address} is already taken over by someone else 😥 If you are the one who took it over, try 'login'`);
      if(userExists)
        throw new Error("Username already exists");
      const newUser = await new this({ username, address }).save();
      return { error: errorObj, user:newUser };
    } else {
      throw new Error("Check your input.")
    }
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
    username = this.cleanString(username);
    if(username && address){
      const user = await this.findOne({ username });
      if(!user)
        throw new Error("Username does not exists");
      if(address !== user.address)
        throw new Error("You use the same IP address that you used when you first logged in.")
      return { error: errorObj, user };
    } else {
      throw new Error("Check your input.");
    }
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
      if(!mongoose.Types.ObjectId.isValid(id)){
        throw new Error("Invalid ID provided");
      }

      username = this.cleanString(username);
      if(username && id){
        const byID = await this.findById(id);
        const byUsername= await this.findOne({ username });
        if(byID && byUsername){
          const {id: firstID, address: firstIP} = byID;
          const {id: secondID, address: secondIP} = byUsername;
          if(firstID !== secondID)
            throw new Error("Username and ID does not match");
          if(firstIP !== secondIP)
            throw new Error("IP Address does not match");
        } else {
          throw new Error("Incorrect user ID or username")
        }
      } else {
        throw new Error("Check your input.")
      }
  } catch (error) {
    errorObj.ok = false;
    errorObj.message = error.message;
  }
  return errorObj;
});
userSchema.static('cleanString', function(string){
  return string.trim().replace(' ', '');
});

export default mongoose.model("User", userSchema);