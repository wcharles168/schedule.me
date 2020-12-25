/*
Routes for landing page (deprecated; moved to app.js)
Author: Charles Wang
*/


const express = require('express')
const googleUtils = require('../google-utils')
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send("home page")
})

router.get('/getLoginUrl', (req, res, next) => {
    googleLoginUrl = googleUtils.urlGoogle()
    res.json({
        url: googleLoginUrl
    })
})

router.get('/login', (req, res, next) => {
    console.log("reached")
    googleUtils.getEventInfoFromUrl(req.url)
    res.redirect('/success')
})

router.get('/success', (req, res, next) => {
    res.send("success")
})

module.exports = router