const passport = require("passport");
const GoogleStratergy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys"); //Only required when storing keys in keys.js
const mongoose = require("mongoose");
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStratergy(
    {
      clientID: keys.googleClientID, //process.env.GOOGLE_CLIENT_ID,
      clientSecret: keys.googleClientSecret, //process.env.GOOGLE_CLIENT_SECRET,s
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          //statement is true thus the user exists
          done(null, existingUser);
        } else {
          //user doesn't exist - make a new one
          new User({
            googleId: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile._json.email
          })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
