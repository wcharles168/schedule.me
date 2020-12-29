const express = require('express');
const Events = require('../models/event.js');
const Users = require('../models/user.js');
const Availabilities = require('../models/availabilities.js');
const router = express.Router(); // allows us to register middleware on a modular route handler

// chain of insert queries for all 3 schemas
router.get('/testInsert', (req, res, next) => {
    const newUser = new Users({
        name: "Charles",
        events: [],
        password: "test",
        googleToken: "test"
    })
    const newEvent = new Events({
        eventId: "abcd",
        name: "test",
        owner: newUser._id,
        startDate: "12/25/2020",
        endDate: "12/27/2020",
        startTime: 32400, // 9 am
        endTime: 75600, // 8 pm
        timeZone: "en-US"
    })
    const newAvailability = new Availabilities({
        event: newEvent._id,
        user: newUser._id,
        availabilities: [{
            startTime: "12/25/2020 09:00:00",
            endTime: "12/25/2020 10:00:00"
        }, {
            startTime: "12/26/2020 09:00:0",
            endTime: "12/26/2020 10:00:00"
        }]
    })
    newUser.save(function(err, user) {
        if (err) return console.error(err);
        console.log("User inserted successfully!");
    })
    newEvent.save(function(err, event) {
        if (err) return console.error(err);
        console.log("Event inserted successfully!");
    })
    newAvailability.save(function(err, availability) {
        if (err) return console.error(err);
        console.log("Availability inserted successfully!");
    })
    res.json({
        message: "success"
    });
})

// sample mongodb insert query 
router.get('/createTestEvent', (req, res, next) => {
    console.log(testUser)
    const newEvent = new Events({
        eventId: "abcd",
        name: "test",
        owner: testUser._id,
        startDate: "2020-12-25",
        endDate: "2020-12-27",
        startTime: "09:00:00",
        endTime: "21:00:00",
        timeZone: "en-US"
    })
    newEvent.save(function(err, event) {
        if (err) return console.error(err);
        console.log("Event inserted successfully!");
    })
    res.json({
        message: "success"
    }); // takes in and sends data that can can be represented in json format
});

module.exports = router; // export the router to use in app.js