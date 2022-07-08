const { default: axios } = require("axios");
const User = require("../modals/User");
const Admin = require("../modals/Admin");
const Event = require("../modals/Events");
const Participant = require("../modals/Participants")

exports.registerNewUser = async (req, res) => {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var company = req.body.company;
  var country = req.body.selectedCountry;

  User.create(
    {
      firstName: firstName,
      lastName: lastName,
      email: email,
      company: company,
      country: country,
      role: "",
      answerSheet: [],
    },
    async function (err, user) {
      if (err) {
        console.log("Error creating User: ", err);
        res.status(400).json(err);
      } else {
        console.log("User Created: ", user);
        res.status(201).json(user);
      }
    }
  );
};

exports.updateRole = async (req, res) => {
  let userId = req.body.userId;
  let role = req.body.role;
  let user = await User.findOne({ _id: userId });
  console.log(user);
  let updated = await User.findOneAndUpdate(
    {
      _id: userId,
    },
    {
      role: role,
    }
  );
};

exports.adminLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const admin = await Admin.findByCredentials(email, password);
    if (admin === null) {
      return res.status(401).json("Invalid Credentials");
    }
    res.status(200).json({ admin });
  } catch (err) {
    res.status(400).json("Incorrect Password");
  }
};

exports.retriveAllEvents = async (req, res) => {
  await Event.find({}, function (err, events) {
    if (err) {
      res.status(404).json("Error");
    }
    res.status(200).json(events);
  });
};

exports.retriveAllParticipants = async (req, res) => {
  await Participant.find({}, function (err, participants) {
    if (err) {
      res.status(404).json("Error");
    }
    res.status(200).json(participants);
  });
};

exports.deleteUser = async (req, res) => {
  let userId = req.body.userId;
  await User.find({ _id: userId }).deleteOne();
  res.status(201).json("Succesfully deleted");
};

exports.addAnswer = async (req, res) => {
  const optId = req.body.optId;
  let userId = req.body.userId;
  const qid = req.body.questionId;
  console.log(qid, userId, optId);
  let updated = await User.findOneAndUpdate(
    {
      _id: userId,
    },
    {
      $push: {
        answerSheet: {
          optId: optId,
          questionId: qid,
        },
      },
    }
  );
  res.status(200).json("fuck you");
};

exports.addEvent = (req, res) => {
  let event = req.body;
  event.EventType = event.EventType.name;
  console.log(event);
  Event.create({
    Name: event.EventName,
    Code: event.EventCode,
    Type: event.EventType,
    Date: event.EventDate,
    Description: event.EventDescription,
  });
  res.status(200).json("successfully added");
};

exports.addParticipant = async(req, res) => {
  let participant = req.body;
  participant.Gender = participant.Gender.name;
  console.log(participant);
  await Participant.create({
    FirstName: participant.FirstName,
    LastName: participant.LastName,
    Email: participant.Email,
    Gender: participant.Gender,
    Organization: participant.Organization,
    Department: participant.Department,
    Attempts: participant.Attempts,
    EventCode: participant.EventCode
  });
  res.status(200).json("successfully added");
};

exports.getEventDetails = async(req,res) => {
  let id = req.body.id
  console.log(id)
  let resp = await Event.find({_id: id})
  res.status(200).json(resp[0])
}

exports.bulkUpload = async(req,res) => {
  const obj = req.body
  Participant.insertMany(obj).then(function(){
    console.log("Data inserted")  
}).catch(function(error){
    console.log(error)    
})
}