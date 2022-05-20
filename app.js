const express = require("express");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
require('dotenv').config();
app.use(express.urlencoded({ extended: true}));

// db configuaration ends here

//registering cors
app.use(cors());


  app.use(express.static(__dirname + "/dist/"))
  app.get("*" , (req,res) => {
      res.sendFile(__dirname + "/dist/index.html");
  });



app.listen(PORT, () => {
  console.log(`App is running on`, PORT);
});