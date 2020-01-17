const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys"); //Only required when storing keys in keys.js
require("./models/user");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

require("./routes/authroutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
app.enable("trust proxy"); //Heroku SSL workaround
