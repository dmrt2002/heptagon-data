const express = require("express");
const router = express.Router();
const userController = require("../controllers/usercontroller");
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post("/register", jsonParser, userController.registerNewUser);
router.post("/role", jsonParser, userController.updateRole);
router.post("/adminlogin", jsonParser, userController.adminLogin)
router.post("/deleteUser", jsonParser, userController.deleteUser)
router.post("/addAnswer", jsonParser, userController.addAnswer)


// router.post("/removeAnswer", jsonParser, userController.removeAnswer)

module.exports = router;