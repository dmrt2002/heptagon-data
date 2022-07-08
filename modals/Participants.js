const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  FirstName: {
    type: String,
  },
  LastName: {
    type: String,
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

const Participants = mongoose.model("Participants", userSchema, "participants");
module.exports = Participants;