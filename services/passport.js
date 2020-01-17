const passport = require('passport');
const GoogleStratergy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys'); //Only required when storing keys in keys.js

passport.use(
    new GoogleStratergy(
        {
            clientID: keys.googleClientID,  //process.env.GOOGLE_CLIENT_ID,
            clientSecret: keys.googleClientSecret, //process.env.GOOGLE_CLIENT_SECRET,s
            callbackURL: '/auth/google/callback',
        },
        (accessToken, refreshToken, profile, done) => {
            console.log('Access Token: ', accessToken);
            console.log('Refresh Token: ', refreshToken);
            console.log('Profile: ', profile);
        }
    )
);