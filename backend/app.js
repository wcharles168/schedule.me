/*
Main entry file
Author: Charles Wang
*/
require('dotenv').config()

const express = require('express') 
const bodyParser = require('body-parser');
const scheduleRouter = require('./routes/schedule.js')
const userRouter = require('./routes/user.js')

const passport = require('passport')
const auth = require('./auth')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const cors = require('cors')

const defaultScope = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/calendar.freebusy'
];

const app = express(); // create servers under the hood 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

auth(passport)
app.use(passport.initialize())
app.use(cookieSession({
    name: 'session',
    keys: ['123'] // need to get more secure keys
}))
app.use(cookieParser())
app.use(cors())


app.get('/', (req, res) => {
    if (req.session.token) {
        res.cookie('token', req.session.token);
        res.json({
            status: 'session cookie set as '+ req.session.token
        });
    } else {
        res.cookie('token', '')
        res.json({
            status: 'session cookie not set'
        });
    }
})

app.get('/logout', (req, res) => {
    req.logout();
    req.session = null;
    res.redirect('/');
});

app.get('/auth/google', passport.authenticate('google', {
    scope: defaultScope
}))

app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/'
    }),
    (req, res) => {
        req.session.token = req.user.token;
        res.redirect('/');
    }
);

// MONGODB
const url = process.env.DB_SERVER // might want to use atlas later

const mongoose = require('mongoose')
mongoose
.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    app.use(scheduleRouter)
    app.use(userRouter)
    app.listen(8000, () => {
        console.log("Server is running on port 8000")
    });
})
.catch(err => {
    console.log(err)
})