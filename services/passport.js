const passport = require("passport");
const GoogleStratergy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys"); //Only required when storing keys in keys.js
const mongoose = require("mongoose");
const User = mongoose.model("users");

passport.use(
  new GoogleStratergy(
    {
      clientID: keys.googleClientID, //process.env.GOOGLE_CLIENT_ID,
      clientSecret: keys.googleClientSecret, //process.env.GOOGLE_CLIENT_SECRET,s
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      new User({
        googleId: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        emails: profile.emails //Returns an array
        //emailstest: profile._json.email - Alternate way of retreiving main email from JSON parse.
      }).save();
    }
  )
);
