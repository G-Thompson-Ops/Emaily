const express = require('express');
const passport = require('passport');
const GoogleStratergy = require('passport-google-oauth20').Strategy;
//const keys = require('./config/keys'); No longer required as we are using env-vars

const app = express();

passport.use(
    new GoogleStratergy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID, //can also use keys.googleClientID here is using keys.json method
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback',
            proxy: true
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
app.enable("trust proxy");