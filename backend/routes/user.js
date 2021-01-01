//user object related apis (put and delete)
const express = require('express');
const Users = require('../models/user.js');
const router = express.Router(); 


router.get('/api/user/:username', (req, res, next) => {
    Users.find({ userID: req.params.username }, function(err, result) {
        if (err) {
            next(err)
        } else {
            res.json(result)
        }
    })
    
})

router.post('/api/user', (req, res, next) => {
    const newUser = new Users({
        displayName: req.body.username,
        userID: req.body.username,
        password: req.body.password,
        googleToken: "req.body.googleToken"
    })

    Users.findOneAndDelete({ userID: req.body.username });
    newUser.save(function(err, user) {
        if (err) {
            res.json({
                message: "faiure"
            });
        } else {
            res.json({
                message: "success"
            });
        }
    })
})

module.exports = router; // export the router to use in app.js