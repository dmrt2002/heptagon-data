const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  firstName: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
  },
  email: {
    type: String,
  },
  company: {
    type: String,
  },
  country: {
    type: String,
  },
  answerSheet: {
    type: Array
  },
  role: {
    type: String
  }
});

const User = mongoose.model("User", userSchema, "data users");
module.exports = User;