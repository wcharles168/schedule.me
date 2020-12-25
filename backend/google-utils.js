/*
Google API helper file (deprecated)
Author: Charles Wang
*/

const {google} = require('googleapis')
const {queryString} = require('querystring')
require('dotenv').config()

const googleConfig = {
    clientId: process.env.GOOGLE_CLIENT_ID + '.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET + 'hs_3XhRjShGd5O-c-FhYmTfg', // might not need this bc we are using javascript application
    redirect: 'http://localhost:3000/auth/google/callback', 
};

function createConnection() {
    return new google.auth.OAuth2(
        googleConfig.clientId,
        googleConfig.clientSecret,
        googleConfig.redirect
    );
}

const defaultScope = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/calendar.freebusy'
];
  
/**
 * Get a url which will open the google sign-in page and request access to the scope provided (such as calendar events).
 */
function getConnectionUrl(auth) {
    return auth.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent', // access type and approval prompt will force a new refresh token to be made each time signs in
        scope: defaultScope
    });
}
  
/**
 * Create the google url to be sent to the client.
 */
function urlGoogle() {
    const auth = createConnection(); 
    const url = getConnectionUrl(auth);
    return url;
}

function getGoogleCalendarApi(auth) {
    return google.calendar({version: 'v3', auth})
}

function getEventInfoFromUrl(url) {
    const parsedUrl = queryString.parse(url);
    const code = parsedUrl.code;
    const auth = createConnection();
    const data = auth.getToken(code);
    const tokens = data.tokens;
    auth.setCredentials(tokens);
    const calendar = getGoogleCalendarApi(auth);
    // const plus = getGooglePlusApi(auth);
    // const me = await plus.people.get({ userId: 'me' });
    // const userGoogleId = me.data.id;
    // const userGoogleEmail = me.data.emails && me.data.emails.length && me.data.emails[0].value;
    // return {
    //     id: userGoogleId,
    //     email: userGoogleEmail,
    //     tokens: tokens,
    // };
}

module.exports = {urlGoogle, getEventInfoFromUrl}


// PASSPORT SETUP

const passport = require('passport');
