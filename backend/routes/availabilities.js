//user object related apis (put and delete)
const express = require('express');
const Availabilities = require('../models/availabilities.js');
const router = express.Router(); 

//Find the availabilities of all the users for a given event
router.get('/api/availabilities/:eventId', (req, res, next) => {
    Availabilities.find({ event: req.params.eventId }, function(err, result) {
        if (err) {
            next(err)
        } else {
            res.json(result)
        }
    })
    
})

//Save the availabilities for a given user and a given event
//Is this user already have availabilities for this event saved in the DB, 
//we delete the old values first based on the _id of the availabilities document 
//(passed in in the req object as field _id) 
router.post('/api/availabilities', (req, res, next) => {
    const newEvent = new Availabilities({
        event: req.body.eventId,
        user: req.body.userId,
        availabilities: req.body.availabilities
    })

    Availabilities.findOneAndDelete({ _id: req.body._id });
    newEvent.save(function(err, event) {
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