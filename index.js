const express = require('express');
const passport = require('passport');
const GoogleStratergy = require('passport-google-oauth20').Strategy;
//const keys = require('./config/keys'); No longer required as we are using env-vars

const app = express();

passport.use(
    new GoogleStratergy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID, //can also use keys.googleClientID here is using keys.js method
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback',
        },
        (accessToken, refrestToken, profile, done) => {
            console.log('Access Token: ', accessToken);
            console.log('Refresh Token: ', refrestToken);
            console.log('Profile: ', profile);
        }
    )
);

app.get(
    '/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

app.get(
    '/auth/google/callback',
    passport.authenticate('google')
);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
app.enable("trust proxy");