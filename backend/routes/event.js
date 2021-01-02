//user object related apis (put and delete)
const express = require('express');
const Events = require('../models/event.js');
const router = express.Router(); 


router.get('/api/event/:eventId', (req, res, next) => {
    Events.find({ eventId: req.params.eventId }, function(err, result) {
        if (err) {
            next(err)
        } else {
            res.json(result)
        }
    })
    
})

router.post('/api/event', (req, res, next) => {
    const newEvent = new Events({
        eventId: req.body.eventId,
        name: req.body.name,
        owner: req.body.userId, //userId here needs to be the _id of the User object. ??? how does mongoose reference to fields in the embedded object?
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        startTime: req.body.startTime
        endTime: req.body.endTime,
        timeZone: req.body.timeZone
    })

    Events.findOneAndDelete({ eventId: req.body.eventId });
    newEvent.save(function(err, event) {
        if (err) {
            res.json(err);
        } else {
            res.json(event);
        }
    })
})

module.exports = router; // export the router to use in app.js