const mongoose = require("mongoose");
let Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    image: { type: String },
    userID: { type: String },
    time: { type: Date },
    title: { type: String },
    category: { type: String },
    date: { type: String },
    time: { type: String },
    username: { type: String },
    like: { type: Array, default: [] },
    dislike: { type: Array, default: [] }

    // like: [{ userID: { type: String }, status: { type: Number, default: 0 } }],
    // dislike: [
    //   { userID: { type: String }, status: { type: Number, default: 0 } }
    // ]
  },
  { versionKey: false }
);
module.exports = mongoose.model("posts", userSchema);
