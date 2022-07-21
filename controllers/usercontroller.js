const { default: axios } = require("axios");
const User = require("../modals/User");
const Admin = require("../modals/Admin");
const Event = require("../modals/Events");
const Participant = require("../modals/Participants")
var nodemailer = require('nodemailer');
const Participants = require("../modals/Participants");
let eventObj

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
  let code = Math.floor(1000 + Math.random() * 9000);
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'dataheptagon@gmail.com',
      pass: 'ectkgqitwrvmuzvt'
    }
  });
  var mailOptions = {
    from: 'dataheptagon@gmail.com',
    to: participant.Email,
    subject: ` Welcome  - Know Your Data Quotient`,
    html:
    ` <h2>Dear ${participant.FirstName}</h2>
      <p>Please click on the Button/URL below to access the DQ Assessment</p>
      <h3>http://localhost:8080/#/login</h3>
      <p>Your passcode  will be the ${code}</p>
      <p>Your Event will be ${eventObj.name}</p>
      <p>For any support you can write to  digital@heptagon.in </p>`
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  await Participant.create({
    FirstName: participant.FirstName,
    LastName: participant.LastName,
    Email: participant.Email,
    Gender: participant.Gender,
    Organization: participant.Organization,
    Department: participant.Department,
    Attempts: participant.Attempts,
    EventCode: participant.EventCode,
    PassCode: code
  });
  res.status(200).json("successfully added");
};

exports.getEventDetails = async(req,res) => {
  let id = req.body.id
  let resp = await Event.find({_id: id})
  res.status(200).json(resp[0])
}

exports.eventBulkUpdate = async(req,res) => {
  eventObj = req.body
  res.status(200).json("sent successfully")
}

exports.bulkUpload = async(req,res) => {
  const obj = req.body
  console.log(obj)
  Participant.insertMany(obj).then(function(){
    console.log("Data inserted")  
}).catch(function(error){
    console.log(error)    
})
  for(let i = 0; i < obj.length; i++) {
    let code = Math.floor(1000 + Math.random() * 9000);
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'dataheptagon@gmail.com',
        pass: 'ectkgqitwrvmuzvt'
      }
    });
    var mailOptions = {
      from: 'dataheptagon@gmail.com',
      to: obj[i].Email,
      subject: ` Welcome  - Know Your Data Quotient`,
      html:
      ` <h2>Dear ${obj[i].FirstName}</h2>
        <p>Please click on the Button/URL below to access the DQ Assessment</p>
        <h3>http://hept-data.herokuapp.com/#/login</h3>
        <p>Your passcode  will be the ${code}</p>
        <p>Your Event will be ${eventObj.name}</p>
        <p>For any support you can write to  digital@heptagon.in </p>`
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    let updated = await Participants.findOneAndUpdate({
      Email: obj[i].Email
    },{
      PassCode: code,                                                                        
    });

  }
}

exports.updateEvent = async(req,res) => {
  console.log(req.body)
  let replaceObj = req.body
  let original = await Event.findOne({ _id: replaceObj._id})
  console.log(replaceObj.name)
  replaceObj.type = replaceObj.type.name;
  let updated = await Event.findOneAndUpdate({
    _id: replaceObj._id
  },{
    Name: replaceObj.name,
    Code: replaceObj.code,
    Type: replaceObj.type,
    Date: replaceObj.date,
    Description: replaceObj.description
  });
  res.status(200).json("successfully updated")
}

exports.getCompanies = async(req,res) => {
  let participants = await Participant.find();
  let companies = participants.map((obj) => obj.Organization )
  res.status(200).json(companies)
}

exports.removePartcipant = async(req,res) => {
  let id = req.body.id
  let partcipants = await Participant.deleteOne({_id:id})
  res.status(200).json("successfully deleted")
}

exports.getEventPartcipants = async(req,res) => {
  let id = req.body.id
  let event = await Event.find({_id: id})
  console.log(event[0].Code)
  let participants = await Participant.find();
  res.status(200).json((participants.filter(obj => obj.EventCode === event[0].Code)))
}

exports.Login = async(req,res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await Participants.findByCredentials(email, password);
    console.log(user)
    if(user === "Email not registered") {
      return res.status(400).json(user)
    }
    else if (user === null) {
      return res.status(401).json("Invalid Credentials");
    }
    else {
      res.status(200).json({ user });
    }
  } catch (err) {
    res.status(400).json("Incorrect Password");
  }
}