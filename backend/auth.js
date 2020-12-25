/*
Passport JS helper file 
Author: Charles Wang
*/

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
require('dotenv').config()

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user)
    })
    passport.deserializeUser((user, done) => {
        done(null, user)
    })

    passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID + '.apps.googleusercontent.com',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
            callbackURL: 'http://localhost:8000/auth/google/callback', 
        }, 
        (token, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                token: token
            })
        })
    )
}
