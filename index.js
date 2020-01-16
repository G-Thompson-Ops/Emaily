const express = require('express');
const passport = require('passport');
const GoogleStratergy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys' || './config/keys_example');

const app = express();

passport.use(
    new GoogleStratergy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID || keys.googleClientID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },
        accessToken => {
            console.log(accessToken);
        }
    )
);

app.get(
    '/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

const PORT = process.env.PORT || 5000;
app.listen(PORT);