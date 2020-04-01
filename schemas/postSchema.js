const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const registers = require("./userSchema");
const categorySchema = require("./categorySchema");
const postSchema = new Schema(
  {
    image: String,
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: registers },
    date: { type: Date, default: Date.now },
    title: String,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: categorySchema
    },
    comments: [
      {
        comment: "String",
        commentedBy: { type: mongoose.Schema.Types.ObjectId, ref: registers }
      }
    ],
    like: { type: Array, default: [] }
  },
  { versionKey: false }
);
module.exports = mongoose.model("posts", postSchema);
