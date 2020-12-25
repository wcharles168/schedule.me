/*
Main entry file
Author: Charles Wang
*/

const express = require('express') 
const scheduleRouter = require('./routes/schedule.js')
// const landingRouter = require('./routes/landing.js')

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
            status: 'session cookie set'
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

// outsource routing to separate files in route folder

app.use(scheduleRouter) // register application level middleware
// app.use(landingRouter)
app.listen(8000, () => {
    console.log("Server is running on port 8000")
});