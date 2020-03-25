const mongoose = require("mongoose");
const registers = require("./userSchema");
let Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    commentBy: { type: mongoose.Schema.Types.ObjectId, ref: registers },
    postID: { type: String },
    comment: { type: String },
    time: { type: Date, default: Date.now }
  },
  { versionKey: false }
);
module.exports = mongoose.model("comments", userSchema);
