const { Schema, default: mongoose } = require("mongoose");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    trim: true,
    max: 15,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  name: {
    type: String,
    trim: true,
    required: true,
    max: 50,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("User", UserSchema);