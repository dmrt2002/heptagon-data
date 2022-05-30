const { default: axios } = require("axios");
const User = require("../modals/User");

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