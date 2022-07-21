const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  FirstName: {
    type: String,
  },
  LastName: {
    type: String,
  },
  PassCode: {
    type: String
  },
  Email: {
    type: String,
  },
  Organization: {
    type: String
  },
  Department: {
    type: String
  },
  Gender: {
    type: String
  },
  Attempts: {
    type: String
  },
  EventCode: {
    type: String
  }
});

//this method search for a user by email and password.
userSchema.statics.findByCredentials = async (Email, password) => {
const user = await Participants.findOne({ Email })
if(user == null) {
  return "Email not registered"
}
if(password === user.PassCode) {
  return user;
} else {
  return null;
}
};

const Participants = mongoose.model("Participants", userSchema, "participants");
module.exports = Participants;