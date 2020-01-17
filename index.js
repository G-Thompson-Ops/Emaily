const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys"); //Only required when storing keys in keys.js
require("./models/user");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days, 24 hours, 60 minutes, 60 seconds, 1000 milliseconds - this property is in milliseconds
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authroutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
app.enable("trust proxy"); //Heroku SSL workaround
