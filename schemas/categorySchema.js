const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categorySchema = new Schema(
  {
    categoryName: String,
    image: String
  },
  { versionKey: false }
);
module.exports = mongoose.model("category", categorySchema);
