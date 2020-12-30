//user object related apis (put and delete)
const express = require('express');
const Users = require('../models/user.js');
const router = express.Router(); 

router.get('/user', (req, res, next) => {
    op=req.method;
    
    if (op=='GET'){
    	reqult=Users.find({ userID: req.body.userID }).exec();
    	res.json(result);
    } else if (op=='DELETE'){
    	Users.findOneAndDelete({ userID: req.body.userID });
    } else if (op=='PUT') {
    	//insert or replace (if userid already exists) a User object
        const newUser = new Users({
            displayName: req.body.displayName,
            userID: req.body.userID,
            password: req.body.password,
            googleToken: req.body.goodleToken
        })

    	Users.findOneAndDelete({ userID: req.body.userID });
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
    }
})

module.exports = router; // export the router to use in app.js