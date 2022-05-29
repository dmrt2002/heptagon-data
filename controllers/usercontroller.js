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
            country: country
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
