const mongoose = require("mongoose");
const { Schema } = mongoose;
const blogsSchema = new Schema({
  postId: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
  },
  contents: {
    type: String,
  },
  date: {
    type: String,
  },
  pw: {
    type: Number,
  },
});
module.exports = mongoose.model("blogs", blogsSchema);
