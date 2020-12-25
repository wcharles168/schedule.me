const express = require('express');

const router = express.Router(); // allows us to register middleware on a modular route handler

router.get('/events', (req, res, next) => {
    console.log('GET request for schedule');
    res.json({
        message: "response"
    }); // takes in and sends data that can can be represented in json format
});

module.exports = router; // export the router to use in app.js