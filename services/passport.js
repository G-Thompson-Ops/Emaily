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
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      const user = await new User({
        googleId: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile._json.email
      }).save();
      done(null, user);
    }
  )
);
