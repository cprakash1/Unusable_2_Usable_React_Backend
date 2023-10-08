const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  username: {
    type: String,
    required: true,
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
    unique: true,
  },
  salt: {
    type: String,
    required: false,
    default: "Not given",
  },
});

module.exports = mongoose.model("User", userSchema);
