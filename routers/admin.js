const express = require("express");
const router = express.Router();
const userController = require("../controllers/usercontroller");
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post("/adminlogin", jsonParser, userController.adminLogin)
router.post("/addEvent", jsonParser, userController.addEvent)
router.post("/getEventDetails", jsonParser, userController.getEventDetails)
router.post("/addParticipant", jsonParser, userController.addParticipant)
router.post("/retrieveAllEvents", jsonParser, userController.retriveAllEvents)
router.post("/retrieveAllParticipants", jsonParser, userController.retriveAllParticipants)
router.post("/bulkUpload", jsonParser, userController.bulkUpload)
router.post("/eventBulkUpdate", jsonParser, userController.eventBulkUpdate)
router.post("/updateEvent", jsonParser, userController.updateEvent)
router.post("/getCompanies", jsonParser, userController.getCompanies)
router.post("/removePartcipant", jsonParser, userController.removePartcipant)
router.post("/getEventPartcipants", jsonParser, userController.getEventPartcipants)
router.post("/updateEventDate", jsonParser, userController.updateEventDate)

// router.post("/removeAnswer", jsonParser, userController.removeAnswer)

module.exports = router;