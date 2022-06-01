const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});
//this method search for a user by email and password.
userSchema.statics.findByCredentials = async (email, password) => {
    console.log(email,password)
  const user = await Admin.findOne({ email })
  if (user === null) {
    return user;
  }
  if(password === user.password) {
    return user;
  }
};

const Admin = mongoose.model("Admin", userSchema, "admins");
module.exports = Admin;