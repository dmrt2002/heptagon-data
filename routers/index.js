const express = require("express");
const router = express.Router();
const userController = require("../controllers/usercontroller");
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post("/register", jsonParser, userController.registerNewUser);
router.post("/login", jsonParser, userController.Login)
router.post("/resetPassword", jsonParser, userController.resetPassword)
router.post("/deleteUser", jsonParser, userController.deleteUser)
router.post("/updateScore", jsonParser, userController.updateScore)
router.post("/updateCatScores", jsonParser, userController.updateCatScores)
router.post("/getScore", jsonParser, userController.getScore)
router.post("/getCatScores", jsonParser, userController.getCatScores)

// router.post("/removeAnswer", jsonParser, userController.removeAnswer)

module.exports = router;