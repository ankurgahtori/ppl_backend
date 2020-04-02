const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    email: String,
    firstName: String,
    lastName: String,
    isVerified: { type: Boolean, default: false },
    image: String
  },
  { versionKey: false }
);
module.exports = mongoose.model("users", userSchema);
