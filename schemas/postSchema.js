const mongoose = require("mongoose");
let Schema = mongoose.Schema;
const registers = require("./userSchema");
const categories = require("./categorySchema");
const userSchema = new Schema(
  {
    image: { type: String },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: registers },
    time: { type: Date, default: Date.now },
    title: { type: String },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: categories
    },
    date: { type: String },
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
