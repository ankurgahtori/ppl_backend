const mongoose = require("mongoose");
let Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    username: { type: String },
    profilePic: { type: String },
    userID: { type: String },
    postID: { type: String },
    comment: { type: String }
  },
  { versionKey: false }
);
module.exports = mongoose.model("comments", userSchema);
