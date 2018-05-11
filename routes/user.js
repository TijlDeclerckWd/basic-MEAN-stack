var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');



router.post('/signup', function(req, res){


    createNewUser(req.body, null, function(result){
        if (!result.success){
            res.status(500).json({
                message: "unable to create User",
                obj: result.err
            })
        } else {
            res.status(200).json({
                message: "successfully created new user",
                obj: result.obj
            })
        }
    });
});

// later I will add the appropriate security for the social media logins, for now I'll stick with the google ID
router.post('/signin', function(req, res){
    var passwordNeeded = true;
    var loggedInUser;

    User.findOne({email: req.body.email}, function(err, user){
        loggedInUser = user;
        console.log(loggedInUser);
        if (req.body.provider) {
            loggedInUser = user;
            if (user && user.googleID === req.body.provider.ID) {
                passwordNeeded = false
            } else {
                var userData = {
                  firstName: req.body.firstName,
                  lastName: req.body.lastName,
                  email: req.body.email,
                  googleID: req.body.provider.ID
                };
                createNewUser(userData, true, function(result){
                    loggedInUser = result;
                });
            }
        }
        if (!loggedInUser) {
            return res.status(401).json({
                title: 'Login failed: invalid login credentials',
                error: {message: 'Invalid login credentials'}
            });
        }
        if (passwordNeeded && !bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'Login failed: invalid login credentials ',
                error: {message: 'Invalid login credentials'}
            })
        }
        var token = jwt.sign({user: loggedInUser}, 'secret', {expiresIn: 7200});
        user.lastLogin = new Date();
        user.save(function (err, user) {
            res.status(200).json({
                message: 'Successfully logged in',
                token: token,
                fullName: user.firstName + ' ' + user.lastName
            });
        });
    });
});

function createNewUser(userData, socialRegistry, onComplete){
    var user;

    if (socialRegistry){
        user = new User({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            googleID: userData.googleID
        });
    } else {
        user = new User({
            firstName: userData.firstName,
            lastName: userData.lastName,
            username: userData.username,
            password: bcrypt.hashSync(userData.password, 10),
            email: userData.email,
            registerDate: new Date()
        });
    }

    user.save(function(err, user) {
        if (err) {
            onComplete({
                success: false,
                err: err
            })
        }
        if (socialRegistry){
            onComplete(user)
        } else {
            onComplete({
                success: true,
                obj:user
            })
        }
    });
}





module.exports = router;