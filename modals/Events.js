const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  Name: {
    type: String,
  },
  Code: {
    type: String,
  },
  Type: {
    type: String,
  },
  Date: {
    type: Date
  },
  Description: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now,
},
});

const Events = mongoose.model("Events", userSchema, "events");
module.exports = Events;