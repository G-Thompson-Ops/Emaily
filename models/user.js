const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  firstName: String,
  lastName: String,
  emails: { type: Array } //MUST place this array into {} - Just specifying Array does NOT work
});

mongoose.model("users", userSchema);
