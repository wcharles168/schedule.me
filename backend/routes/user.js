//user object related apis (put and delete)
const express = require('express');
const Users = require('../models/user.js');
const router = express.Router(); 

router.get('/api/user', (req, res, next) => {
    console.log("request received")
    result=Users.find({ userID: req.body.username }).exec();
    res.json(result);
    
})

router.post('/api/user', (req, res, next) => {
    console.log(req.body)
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