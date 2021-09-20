const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
  },
});

module.exports = mongoose.model("User", UserSchema);
