const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  postNo: {
    type: Number,
    required: true,
  },
  commentId: {
    type: Number,
  },
  commentAuthor: {
    type: String,
  },
  contents: {
    type: String,
  },
});

module.exports = mongoose.model("comment", commentSchema);
