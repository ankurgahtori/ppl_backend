const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    email: String,
    firstName: String,
    lastName: String,
    verify: { type: Boolean, default: false },
    image: {
      type: String,
      default: "158567166882020200123_115451.jpg-1582261371576"
    }
  },
  { versionKey: false }
);
module.exports = mongoose.model("register", userSchema);
