const { default: axios } = require("axios");
const User = require("../modals/User");
const Admin = require("../modals/Admin");

exports.registerNewUser = async (req, res) => {

    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var company = req.body.company;
    var country = req.body.selectedCountry
    
    User
        .create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            company: company,
            country: country,
            role: ""
        }, async function (err, user) {
            if (err) {
                console.log("Error creating User: ", err);
                res
                    .status(400)
                    .json(err)
            } else {
                console.log("User Created: ", user);
                res
                    .status(201)
                    .json(user)
            }
        })
  };

  exports.updateRole = async(req,res) => {
     let userId = req.body.userId
     let role = req.body.role
     let user = await User.findOne({_id: userId})
     console.log(user)
     let updated = await User.findOneAndUpdate({
        _id: userId
      },{
        role: role
      });
  }

  exports.adminLogin = async(req,res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const admin = await Admin.findByCredentials(email, password)
      if (admin === null) {
        return res
          .status(401)
          .json("Invalid Credentials");
      }
      res.status(200).json({ admin });
    } catch (err) {
      res.status(400).json("Incorrect Password");
    }
  }

  exports.retriveAllUsers = async(req,res) => {
    await User.find({}, function(err , users) {
       if(err) {
         res.status(404).json("Error")
       }
       res.status(200).json(users)
     })
 }

 exports.deleteUser = async(req,res) => {
    let userId = req.body.userId
     await User.find({ _id:userId }).deleteOne()
     res.status(201).json("Succesfully deleted")
  } 